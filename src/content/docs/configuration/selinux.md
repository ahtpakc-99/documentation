---
title: SELinux
description: Install, enable, and manage SELinux on Parrot OS, including compatibility with offensive security tools and Btrfs-specific caveats.
---

SELinux (Security-Enhanced Linux) is a Linux security module that enforces mandatory access control on processes, files, ports, and users at the kernel level. Even when Unix permissions allow an action, SELinux still denies it unless the active policy explicitly permits it.

Parrot OS uses AppArmor by default. The two cannot serve as the primary security module at the same time, so enabling SELinux means switching away from AppArmor. For desktop use and offensive security work, AppArmor remains the recommended choice. SELinux fits server deployments and setups that need stricter mandatory access control.

## Checking Whether SELinux Is Active

`sestatus` and `getenforce` come preinstalled, so their presence does not mean SELinux is active. On a stock system:

```bash
sestatus
getenforce
dpkg -l | grep selinux-policy
cat /proc/cmdline
```

```text
SELinux status:                 disabled
Disabled
```

If `selinux-policy-default` is missing and `/proc/cmdline` contains no `security=selinux`, SELinux is off, even when `/etc/selinux/config` already reads `SELINUX=permissive`. That file only takes effect once the kernel boots with SELinux as the active module. The Parrot kernel also ignores the legacy `selinux=1` and `enforcing=0` boot parameters; `security=selinux` is the only switch, and the starting mode comes from `/etc/selinux/config`.

## Installing

```bash
sudo apt update
sudo apt install selinux-basics selinux-policy-default auditd policycoreutils-python-utils
```

For policy debugging and custom modules:

```bash
sudo apt install setools selinux-policy-dev
```

## Enabling SELinux

:::caution[Plan for two reboots]
Switching security modules and relabelling the filesystem both require a reboot. Keep a snapshot or backup, start in `permissive` mode, and do not jump straight to `enforcing`.
:::

1. Stop and disable AppArmor:

   ```bash
   sudo systemctl stop apparmor
   sudo systemctl disable apparmor
   ```

2. Activate SELinux and reboot. This appends `security=selinux` to `GRUB_CMDLINE_LINUX` in `/etc/default/grub`, runs `update-grub`, and schedules a filesystem relabel at next boot:

   ```bash
   sudo selinux-activate
   sudo reboot
   ```

3. Verify after the reboot:

   ```bash
   sestatus
   cat /proc/cmdline | tr ' ' '\n' | grep security=
   ```

   On Parrot OS step 2 alone is often not enough. `/etc/default/grub.d/grub.cfg` sets `GRUB_CMDLINE_LINUX` after `/etc/default/grub` is read, overwriting the edit, and the system comes back up still `disabled`. If that happens, add a drop-in file instead and regenerate the boot configuration:

   ```bash
   sudo mkdir -p /etc/default/grub.d
   echo 'GRUB_CMDLINE_LINUX_DEFAULT="$GRUB_CMDLINE_LINUX_DEFAULT security=selinux"' | sudo tee /etc/default/grub.d/selinux.cfg
   sudo grub-mkconfig | grep 'security=selinux' | head -n 3
   sudo update-grub
   sudo reboot
   ```

4. Check `/etc/selinux/config`. For Parrot OS it should read:

   ```text
   SELINUX=permissive
   SELINUXTYPE=default
   ```

   Edits here need a reboot to apply. The type is `default`, not `targeted` (the latter is the RHEL name).

## Modes

| Mode         | Effect                                     |
| ------------ | ------------------------------------------ |
| `enforcing`  | Policy is enforced, violations are blocked |
| `permissive` | Violations are only logged                 |
| `disabled`   | SELinux is off                             |

Stay in `permissive` until the logs are clean. Parrot ships many tools whose behavior the default Debian policy does not cover, and going straight to `enforcing` will break them. `setenforce` needs SELinux to be enabled; on a `disabled` system it exits with an error:

```bash
sudo setenforce 0   # permissive
sudo setenforce 1   # enforcing
```

For a permanent change, edit `/etc/selinux/config` and reboot.

## Relabelling the Filesystem

A fresh SELinux install must label every file once:

```bash
sudo touch /.autorelabel
sudo reboot
```

`selinux-activate` already schedules one relabel; repeat the above whenever labels may be stale, for example after restoring a snapshot taken before SELinux was enabled. At boot, `selinux-autorelabel.service` relabels each mounted filesystem. On a full Parrot install this takes a while.

### Btrfs Subvolumes

Parrot uses Btrfs with separate `@` (root) and `@home` subvolumes:

```bash
sudo btrfs subvolume list /
```

```text
ID 256 gen ... top level 5 path @
ID 257 gen ... top level 5 path @home
```

Both are mounted at boot, so `/.autorelabel` covers both. Subvolumes created later, or filesystems mounted after boot, are not covered, because the relabel service runs once against what is mounted at that time.

An inode with no SELinux context shows `?`:

```bash
ls -Zd /some/path
```

```text
? /some/path
```

`restorecon` reads the same object as `unlabeled_t`, which is denied by default in `enforcing` mode. Fix it:

```bash
sudo restorecon -v /path/to/subvolume
```

Files created inside afterwards inherit a correct label. Run it against any subvolume, disk, or share added after the initial relabel, and after restoring pre-SELinux snapshots (contexts live in the `security.selinux` extended attribute, so snapshots carry them along). Preview with `-n` first:

```bash
sudo restorecon -nRv /path/to/new/mount
sudo restorecon -Rv /path/to/new/mount
```

The `-n` flag previews changes before writing them.

## When Something Stops Working

1. Look for recent denials and their cause (`auditd` starts automatically after install; without it, use the `dmesg` fallback):

   ```bash
   sudo ausearch -m AVC,USER_AVC -ts recent
   sudo ausearch -m AVC,USER_AVC -ts recent | audit2why
   sudo dmesg | grep -i -E 'avc|selinux' | tail -n 30
   ```

2. Test in `permissive` mode. If the problem disappears, SELinux is involved. Return to `enforcing` only if that was the original mode:

   ```bash
   initial_mode=$(getenforce)
   sudo setenforce 0
   # reproduce the issue
   if [ "$initial_mode" = "Enforcing" ]; then
     sudo setenforce 1
   fi
   ```

3. Rule out wrong labels before writing policy:

   ```bash
   ls -Z /path/to/file
   sudo restorecon -Rv /path/to/directory
   ```

   Paths worth checking on Parrot: `/usr/share/metasploit-framework`, `/opt`, `/home`.

4. If the denial is legitimate, build a targeted module. Read the generated source before installing it, and narrow the `ausearch` window if it contains unrelated permissions:

   ```bash
   sudo ausearch -m AVC -ts recent | audit2allow -M <tool_name>_local
   cat <tool_name>_local.te
   sudo semodule -i <tool_name>_local.pp
   ```

Tools that typically need extra rules under the default policy: Nmap SYN scans and OS detection, Metasploit handlers, Wireshark/tcpdump capture, Aircrack-ng monitor mode, and GDB-style debuggers using `ptrace`. Confirm each case with `ausearch` before writing policy for it.

Ignore RHEL guides that suggest `setsebool -P deny_ptrace off` for debuggers. That boolean does not exist in the Debian policy; the command fails with `Boolean deny_ptrace is not defined`. Use the `audit2allow` workflow above instead.

## Example: Confining Firefox

`~/.ssh` already carries its own type under the default policy:

```bash
ls -Zd ~/.ssh
```

```text
system_u:object_r:ssh_home_t:s0 /home/user/.ssh
```

That label alone protects nothing while every desktop application runs unconfined:

```bash
ps -eZ | grep -i firefox
```

```text
unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023  firefox-esr
```

(On a `disabled` system `ps -eZ` prints bare `unconfined`.) The binary maps to `mozilla_exec_t`, but the policy defines no transition from `unconfined_t` to `mozilla_t`, so on a Parrot desktop Firefox stays in `unconfined_t`, which is allowed to reach almost every type, including `ssh_home_t`. A label only confines an application whose process runs in a domain without an allow rule for it.

The module below puts Firefox in its own domain and proves the denial in the audit log. It is minimal on purpose: enough to demonstrate the transition, not enough to run Firefox fully confined under `enforcing`. Treat it as a lab exercise in `permissive` mode.

1. Write the policy source:

   ```bash
   mkdir -p ~/selinux-firefox && cd ~/selinux-firefox
   nano firefox_confined.te
   ```

   ```text
   policy_module(firefox_confined, 1.0)

   require {
       type unconfined_t;
       role unconfined_r;
       class process { transition };
       class file { getattr open read execute entrypoint };
   }

   type firefox_confined_t;
   type firefox_confined_exec_t;
   domain_type(firefox_confined_t)
   domain_entry_file(firefox_confined_t, firefox_confined_exec_t)

   role unconfined_r types firefox_confined_t;

   type_transition unconfined_t firefox_confined_exec_t : process firefox_confined_t;
   allow unconfined_t firefox_confined_t : process transition;
   allow unconfined_t firefox_confined_exec_t : file { getattr open read execute };
   allow firefox_confined_t firefox_confined_exec_t : file entrypoint;
   ```

2. Install the build tools, compile, and load the module:

   ```bash
   sudo apt update
   sudo apt install selinux-policy-dev
   make -f /usr/share/selinux/devel/Makefile firefox_confined.pp
   sudo semodule -i firefox_confined.pp
   ```

3. Label the real binary (`/usr/bin/firefox-esr` is a symlink; confirm the target on your system):

   ```bash
   readlink -f /usr/bin/firefox-esr
   sudo semanage fcontext -a -t firefox_confined_exec_t "/usr/lib/firefox-esr/firefox-esr"
   sudo restorecon -v /usr/lib/firefox-esr/firefox-esr
   ```

4. Restart Firefox and confirm the new domain:

   ```bash
   pkill firefox-esr
   firefox-esr &
   ps -eZ | grep firefox-esr
   ```

   ```text
   unconfined_u:unconfined_r:firefox_confined_t:s0-s0:c0.c1023  firefox-esr
   ```

5. In Firefox, open `file:///home/user/.ssh/`, then check the log:

   ```bash
   sudo ausearch -m AVC -ts recent | grep ssh_home_t
   ```

   ```text
   type=AVC msg=audit(...): avc:  denied  { search } for  pid=... comm="FSBroker..." name=".ssh" dev="..." ino=... scontext=unconfined_u:unconfined_r:firefox_confined_t:s0-s0:c0.c1023 tcontext=system_u:object_r:ssh_home_t:s0 tclass=dir permissive=1
   ```

   No rule allows `firefox_confined_t` to reach `ssh_home_t`, so the access is denied by default. `permissive=1` means this was only logged; under `enforcing` it is blocked. Afterwards, close Firefox and remove the experiment unless you intend to finish the policy:

   ```bash
   sudo semanage fcontext -d "/usr/lib/firefox-esr/firefox-esr"
   sudo restorecon -v /usr/lib/firefox-esr/firefox-esr
   sudo semodule -r firefox_confined
   ```

## Disabling SELinux

1. Switch to `permissive` if necessary: `selinux-activate disable` refuses to run in `enforcing` mode. Undo both the `selinux-activate` edit and the drop-in (removing only one leaves `security=selinux` on the command line):

   ```bash
   if [ "$(getenforce)" = "Enforcing" ]; then
     sudo setenforce 0
   fi
   sudo selinux-activate disable
   sudo rm -f /etc/default/grub.d/selinux.cfg /.autorelabel
   sudo update-grub
   ```

2. Set `SELINUX=disabled` in `/etc/selinux/config`.

3. Re-enable AppArmor, reboot, and verify (`security=selinux` gone from `/proc/cmdline`, `sestatus` back to `disabled`, `sudo aa-status` listing profiles again):

   ```bash
   sudo systemctl enable apparmor
   sudo systemctl start apparmor
   sudo reboot
   ```

## References

- [Debian Administrator's Handbook - SELinux](https://debian-handbook.info/browse/stable/sect.selinux.html)
- [Debian Wiki - SELinux Setup](https://wiki.debian.org/SELinux/Setup)
- [Linux Kernel Documentation - SELinux](https://docs.kernel.org/admin-guide/LSM/SELinux.html)
- [Linux man-pages - selinux(8)](https://man7.org/linux/man-pages/man8/selinux.8.html)
