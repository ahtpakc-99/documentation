---
title: SELinux
description: Install, enable, and manage SELinux on Parrot OS, including compatibility with offensive security tools and Btrfs-specific caveats.
---

SELinux, or **Security-Enhanced Linux**, is a Linux security module that provides mandatory access control (MAC) over processes, files, ports, and users at the kernel level. Even if a process has valid Unix permissions, SELinux can still deny an action if the active security policy does not explicitly allow it.

Parrot OS ships with **AppArmor** enabled by default. AppArmor and SELinux are both Linux Security Modules and cannot run simultaneously as the primary active LSM. Enabling SELinux requires disabling AppArmor first. For most Parrot OS use cases — particularly desktop environments and offensive security workflows — AppArmor is the recommended choice. SELinux is more appropriate when Parrot OS is deployed as a server or when stricter mandatory access control is required.

## Check if SELinux is Installed

On a fresh Parrot OS installation, SELinux tools are not present by default. To check whether they are available:

```bash
sestatus
```

If the command is not found, SELinux is not installed. To check the current mode:

```bash
getenforce
```

Possible outputs: `Enforcing`, `Permissive`, or `Disabled`.

## Install SELinux

```bash
sudo apt update
sudo apt install selinux-basics selinux-policy-default auditd policycoreutils selinux-utils setools policycoreutils-python-utils
```

**selinux-basics** = basic SELinux setup tools, including `selinux-activate` \
**selinux-policy-default** = default SELinux policy for Debian-based systems \
**auditd** = audit daemon for logging SELinux denial events (not installed by default on Parrot OS) \
**policycoreutils** = core SELinux utilities \
**selinux-utils** = basic command-line tools \
**setools** = policy analysis tools \
**policycoreutils-python-utils** = `semanage`, `audit2allow`, `audit2why`

## Enable SELinux

Before enabling SELinux, stop and disable AppArmor:

```bash
sudo systemctl stop apparmor
sudo systemctl disable apparmor
```

Then activate SELinux:

```bash
sudo selinux-activate
```

This configures the necessary boot parameters and sets the initial mode to `permissive`. Reboot:

```bash
sudo reboot
```

After rebooting, verify the status:

```bash
sestatus
```

> On some Parrot OS installations, `selinux-activate` does not reliably write the GRUB boot parameter. If `sestatus` still reports `disabled` after rebooting, configure GRUB manually as shown below.

### Manual GRUB Configuration

If manual configuration is needed, create a GRUB drop-in file:

```bash
sudo mkdir -p /etc/default/grub.d
```

```bash
echo 'GRUB_CMDLINE_LINUX_DEFAULT="$GRUB_CMDLINE_LINUX_DEFAULT security=selinux"' | sudo tee /etc/default/grub.d/selinux.cfg
```

```bash
sudo update-grub
```

```bash
sudo reboot
```

The `security=selinux` parameter sets SELinux as the active LSM, replacing AppArmor. Note that some Parrot OS kernels are built without `CONFIG_SECURITY_SELINUX_BOOTPARAM`, meaning the `selinux=1` and `enforcing=0` boot parameters found in older guides have no effect on this kernel. The initial mode is controlled entirely by `/etc/selinux/config` instead.

The main SELinux configuration file is `/etc/selinux/config`. The correct values for Parrot OS are:

```text
SELINUX=permissive
SELINUXTYPE=default
```

Changes to this file require a reboot to take effect.

## SELinux Modes

| Mode         | Description                                       |
| ------------ | ------------------------------------------------- |
| `enforcing`  | Policy is active and violations are blocked       |
| `permissive` | Policy is not enforced, but violations are logged |
| `disabled`   | SELinux is turned off                             |

On Parrot OS, starting in `permissive` mode is especially important. The distribution includes a large number of tools with execution patterns that the default Debian SELinux policy does not cover. Switching directly to `enforcing` without reviewing logs first is likely to break multiple tools.

To switch modes temporarily:

```bash
sudo setenforce 0   # permissive
sudo setenforce 1   # enforcing
```

To make a mode persistent, edit `/etc/selinux/config` and reboot.

## Filesystem Relabel

After enabling SELinux on an existing Parrot OS installation, a full filesystem relabel is required to apply correct labels to all files:

```bash
sudo touch /.autorelabel
sudo reboot
```

On boot, `selinux-autorelabel.service` relabels every filesystem that is mounted at that time. On Parrot OS the relabel takes longer than on a minimal Debian server due to the volume of tools and packages installed.

### Btrfs Subvolumes and Relabeling

Parrot OS uses **Btrfs with separate subvolumes** for the root and home directories by default:

```bash
sudo btrfs subvolume list /
```

```text
ID 256 gen ... top level 5 path @
ID 257 gen ... top level 5 path @home
```

`/` and `/home` are two different subvolumes (`@` and `@home`) of the same Btrfs filesystem, mounted separately via `/etc/fstab`. When both are mounted at boot time, `/.autorelabel` correctly relabels both, since the relabel process walks every mounted filesystem, not just the top-level root.

The caveat is **subvolumes created after the initial relabel, or filesystems mounted after boot**. These do not automatically inherit correct SELinux labels, since `selinux-autorelabel.service` only runs once, at boot, against what is mounted at that time.

This can be reproduced directly. Creating a new Btrfs subvolume after SELinux is already active leaves it unlabeled:

```bash
sudo btrfs subvolume create /mnt_test_subvol
ls -Zd /mnt_test_subvol
```

```text
? /mnt_test_subvol
```

The `?` indicates the object has no context SELinux can interpret — it is effectively `unlabeled_t`. Any file created inside it before fixing this inherits the same problem. In `enforcing` mode, `unlabeled_t` objects are denied by default under the reference policy, since no rule grants access to that type.

To fix a subvolume (or any path) with missing or incorrect labels, run `restorecon` against it:

```bash
sudo restorecon -v /mnt_test_subvol
```

```text
Relabeled /mnt_test_subvol from system_u:object_r:unlabeled_t:s0 to system_u:object_r:default_t:s0
```

Once the subvolume root itself has a valid context, files created inside it afterward inherit a correct label automatically:

```bash
sudo touch /mnt_test_subvol/example.txt
ls -Z /mnt_test_subvol/example.txt
```

```text
unconfined_u:object_r:default_t:s0 /mnt_test_subvol/example.txt
```

The practical takeaway: after enabling SELinux, always run `restorecon -Rv` against any Btrfs subvolume, additional disk, or network share mounted **after** the initial relabel, before relying on it. The same applies when restoring a Btrfs snapshot or VM snapshot taken before SELinux was enabled or before a relabel occurred, since SELinux contexts are stored as filesystem extended attributes (`security.selinux`) and are preserved (or reverted, if the snapshot predates the relabel) along with the rest of the data.

```bash
sudo restorecon -Rv /path/to/new/mount/or/subvolume
```

## Compatibility with Parrot OS Security Tools

The `selinux-policy-default` package was designed for standard Debian server environments and does not include rules for offensive security tools. Enabling SELinux in enforcing mode on Parrot OS may break tools that rely on raw sockets, elevated capabilities, or non-standard file paths.

### Diagnose a Denied Action

Check if `auditd` is running:

```bash
sudo systemctl status auditd
```

Search for recent denials:

```bash
sudo ausearch -m AVC,USER_AVC -ts recent
```

Explain why an action was denied:

```bash
sudo ausearch -m AVC,USER_AVC -ts recent | audit2why
```

Temporarily switch to permissive mode to isolate whether SELinux is the cause:

```bash
sudo setenforce 0
```

Test the tool again. If the issue disappears, SELinux policy or file labeling is involved. Return to enforcing mode:

```bash
sudo setenforce 1
```

### Fix File Labeling Issues

Incorrect file labels are the most common cause of issues after enabling SELinux on Parrot OS. To restore default labels:

```bash
sudo restorecon -Rv /path/to/directory
```

Common paths to check:

```bash
sudo restorecon -Rv /usr/share/metasploit-framework
sudo restorecon -Rv /opt
sudo restorecon -Rv /home
```

### Generate a Policy Module for a Specific Tool

If a tool is denied and the action is legitimate, generate a targeted policy module:

```bash
sudo ausearch -m AVC -ts recent | audit2allow -M <tool_name>_local
sudo semodule -i <tool_name>_local.pp
```

Review generated rules carefully before installing them. Avoid creating modules that allow broad access.

### Known Issues with Common Tools

**Nmap** — Raw socket operations used for SYN scans (`-sS`) and OS detection (`-O`) may be denied even when running as root. Check for `rawip_socket` or `packet_socket` denials.

**Metasploit Framework** — Handlers and modules may trigger denials related to file access under `/usr/share/metasploit-framework` and network socket operations. Restore file contexts before generating policy modules.

**Wireshark and tcpdump** — Packet capture requires `CAP_NET_RAW` and `CAP_NET_ADMIN`. Denials depend on the domain of the calling process.

**Aircrack-ng** — Monitor mode activation and raw frame injection may be denied depending on the active policy.

**GDB and debuggers** — The `ptrace` capability used by GDB, pwndbg, and peda is commonly restricted. To allow ptrace for user processes:

```bash
sudo setsebool -P deny_ptrace off
```

## Why Labels Alone Are Not Enough: Confining an Application

A common misconception is that simply labeling a sensitive directory is enough to protect it. This is not the case. On Parrot OS, checking the label of `~/.ssh` shows it already has a dedicated type under the default policy:

```bash
ls -Zd ~/.ssh
```

```text
system_u:object_r:ssh_home_t:s0 /home/parrot/.ssh
```

However, checking what domain a typical desktop application runs in tells the rest of the story:

```bash
ps -eZ | grep -i firefox
```

```text
unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023  firefox-esr
```

Firefox — like most interactively launched applications under the `default` policy — runs in the `unconfined_t` domain. SELinux's model is allow-based: everything is denied unless a rule explicitly allows it, but `unconfined_t` already carries broad allow rules covering nearly every type on the system. Relabeling `~/.ssh` changes nothing on its own, because `unconfined_t` is still permitted to access `ssh_home_t`.

For a label to actually restrict an application, that application's process must run in a **confined domain** that does not have an allow rule for the type in question.

### Building a Minimal Confined Domain

The following creates a dedicated domain for Firefox and confirms, via the audit log, that it gets denied access to `ssh_home_t`.

Create the policy source:

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

Install the policy development tools (required for `/usr/share/selinux/devel/Makefile`):

```bash
sudo apt update
sudo apt install selinux-policy-dev
```

Compile and install the module:

```bash
make -f /usr/share/selinux/devel/Makefile firefox_confined.pp
sudo semodule -i firefox_confined.pp
```

Label Firefox's actual binary. Note that `/usr/bin/firefox-esr` is a symlink; the label must be applied to the real executable:

```bash
readlink -f /usr/bin/firefox-esr
```

```bash
sudo semanage fcontext -a -t firefox_confined_exec_t "/usr/lib/firefox-esr/firefox-esr"
sudo restorecon -v /usr/lib/firefox-esr/firefox-esr
```

Restart Firefox and confirm the transition happened:

```bash
pkill -9 firefox-esr
firefox-esr &
ps -eZ | grep firefox-esr
```

```text
unconfined_u:unconfined_r:firefox_confined_t:s0-s0:c0.c1023  firefox-esr
```

### Confirming the Denial

With Firefox running under `firefox_confined_t`, attempt to browse to `file:///home/parrot/.ssh/` from within Firefox, then check the audit log:

```bash
sudo ausearch -m AVC -ts recent | grep ssh_home_t
```

```text
avc:  denied  { search } for  comm="FSBroker..." name=".ssh"
  scontext=unconfined_u:unconfined_r:firefox_confined_t:s0-s0:c0.c1023
  tcontext=system_u:object_r:ssh_home_t:s0
  tclass=dir
  permissive=1
```

This confirms the mechanism: no `allow` rule exists for `firefox_confined_t` to access `ssh_home_t`, so the action is denied by default. In `permissive` mode this is only logged; switching to `enforcing` mode makes the denial actually block the access.

> **Scope note:** the module above is intentionally minimal, enough to prove the domain transition and the resulting denial. It is not sufficient for Firefox to fully launch and function under `enforcing` mode. Getting a complex GUI application to run correctly inside a custom confined domain requires accounting for inherited file descriptors, X11 socket access, locale and timezone files, ptrace usage by its internal crash reporter, and its own internal sandboxing via user namespaces, which SELinux blocks by default. Building out a complete, fully functional confined domain for an application like Firefox is advanced policy engineering and outside the scope of this page.

## Troubleshooting

### Check Status

```bash
sestatus
getenforce
```

### Check Logs

```bash
sudo ausearch -m AVC,USER_AVC -ts recent
sudo grep denied /var/log/audit/audit.log
```

### Identify and Fix Denials

```bash
# Explain the denial
sudo ausearch -m AVC,USER_AVC -ts recent | audit2why

# Check file labels
ls -Z /path/to/file

# Restore default labels
sudo restorecon -Rv /path/to/directory
```

### Isolate SELinux as the Cause

Switch to permissive, reproduce the issue, then return to enforcing:

```bash
sudo setenforce 0
# test
sudo setenforce 1
```

If the issue disappears in permissive mode, SELinux policy or file labeling is involved.

## Disable SELinux and Re-enable AppArmor

To disable SELinux and revert to the default Parrot OS security configuration:

Remove the SELinux GRUB drop-in:

```bash
sudo rm /etc/default/grub.d/selinux.cfg
sudo update-grub
```

Set SELinux to disabled in `/etc/selinux/config`:

```text
SELINUX=disabled
```

Re-enable AppArmor:

```bash
sudo systemctl enable apparmor
sudo systemctl start apparmor
```

Reboot and verify:

```bash
sudo reboot
sudo apparmor_status
```

## References

- [Debian Administrator's Handbook - SELinux](https://debian-handbook.info/browse/stable/sect.selinux.html)
- [Debian Wiki - SELinux](https://wiki.debian.org/SELinux)
- [Debian Wiki - SELinux Setup](https://wiki.debian.org/SELinux/Setup)
- [Linux Kernel Documentation - SELinux](https://docs.kernel.org/admin-guide/LSM/SELinux.html)
- [SELinux Project](https://selinuxproject.github.io/)
- [SELinux Userspace Repository](https://github.com/SELinuxProject/selinux)
- [Linux man-pages - selinux(8)](https://man7.org/linux/man-pages/man8/selinux.8.html)
