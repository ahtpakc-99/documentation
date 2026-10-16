---
title: 'Configure SELinux'
description: Install and configure SELinux on ParrotOS, manage file labels and policy rules, and troubleshoot application access.
---

SELinux (Security-Enhanced Linux) is a Linux security module that enforces mandatory access control on processes, files, ports, and users at the kernel level. Even when Unix permissions allow an action, SELinux still denies it unless the active policy explicitly permits it.

Parrot OS uses AppArmor by default. The two cannot serve as the primary security module at the same time, so enabling SELinux means switching away from AppArmor. For desktop use and offensive security work, AppArmor remains the recommended choice.

## Check Whether SELinux Is Enabled

Start by checking whether SELinux is active:

```bash
sestatus
getenforce
```

With AppArmor active, the output should look like this:

```text
SELinux status:                 disabled
Disabled
```

The following commands show the installed policy and boot configuration:

```bash
dpkg-query -W selinux-policy-default
cat /proc/cmdline
cat /sys/kernel/security/lsm
```

## Install SELinux

```bash
sudo apt update
sudo apt install selinux-basics selinux-policy-default auditd policycoreutils-python-utils
```

Install these additional tools to inspect policy rules and follow the Firefox example:

```bash
sudo apt install setools selinux-policy-dev make
```

## Enable SELinux

:::caution
Take a snapshot or backup and make sure you can access the console. Start in permissive mode to log violations without blocking applications. The first SELinux boot labels the filesystems and reboots automatically. Let it finish.
:::

The following steps are for GRUB. Leave AppArmor running until you reboot.

#### 1. Configure Permissive Mode

```bash
sudo nano /etc/selinux/config
```

Set the policy and mode as follows **before rebooting**:

```text
SELINUX=permissive
SELINUXTYPE=default
```

#### 2. Configure GRUB

Check `/etc/default/grub` and `/etc/default/grub.d/*.cfg` for conflicting options such as `security=apparmor`, `selinux=0` or `enforcing=1`. If you have an explicit `lsm=` list, it takes precedence over `security=`. Replace AppArmor with SELinux in that list without removing the other modules.

Activate SELinux and inspect the generated boot entries:

```bash
sudo selinux-activate
sudo grep -E '^[[:space:]]*linux' /boot/grub/grub.cfg
```

Parrot's `grub.cfg` drop-in can overwrite the change made by `selinux-activate`. If `security=selinux` is missing from the normal boot entry, add the configuration below. If `selinux.cfg` already exists, edit it without overwriting unrelated settings.

```bash
sudo mkdir -p /etc/default/grub.d
echo 'GRUB_CMDLINE_LINUX_DEFAULT="$GRUB_CMDLINE_LINUX_DEFAULT security=selinux"' | sudo tee /etc/default/grub.d/selinux.cfg
sudo update-grub
sudo grep -E '^[[:space:]]*linux' /boot/grub/grub.cfg
```

Check the output again before continuing. The normal boot entry should select SELinux without conflicting options. Recovery entries are unchanged.

#### 3. Reboot and Verify

`selinux-activate` also schedules filesystem labelling for the next boot. Reboot now and wait for labelling and the automatic second reboot to finish:

```bash
sudo reboot
```

Once you can log in again, check the running configuration:

```bash
sestatus
getenforce
cat /proc/cmdline
cat /sys/kernel/security/lsm
sudo check-selinux-installation
```

You should see the `default` policy in `Permissive` mode and `selinux` in the module list. If SELinux is disabled, correct the boot configuration rather than running `setenforce`.

## Change SELinux Mode

| Mode         | Effect                                   |
| ------------ | ---------------------------------------- |
| `enforcing`  | Policy violations are blocked            |
| `permissive` | Policy violations are allowed and logged |
| `disabled`   | SELinux does not enforce a policy        |

You can switch to permissive mode without rebooting:

```bash
sudo setenforce 0
```

Check that your applications work and investigate any denials before switching to enforcing mode:

```bash
sudo setenforce 1
```

Also set `SELINUX=` in `/etc/selinux/config` to keep the mode after rebooting. Empty logs alone do not show that the policy is ready, since applications may be unconfined or auditing inactive.

:::caution
If enforcing mode prevents login, use a rescue environment to set `SELINUX=permissive` in the installed system's configuration. Support for `enforcing=` and `selinux=` boot parameters depends on the kernel build.
:::

## Relabel Filesystems

The initial relabel is automatic. You may need to repeat it after restoring data saved before SELinux was enabled. Set permissive mode first, then run:

```bash
sudo touch /.autorelabel
sudo reboot
```

The service labels mounted filesystems that support SELinux labels and are writable, then reboots. It skips any paths listed in `/etc/selinux/fixfiles_exclude_dirs`.

### Btrfs Subvolumes

Root and home commonly use the `@` and `@home` subvolumes. Check how they are mounted and whether their labels match the policy:

```bash
sudo btrfs subvolume list /
findmnt -T / -o TARGET,FSTYPE,OPTIONS
findmnt -T /home -o TARGET,FSTYPE,OPTIONS
matchpathcon -V / /home
```

Look for `rw` and `seclabel` in the mount options. New or nested subvolumes may need separate attention. The first command below previews label changes at the mount point, while the second applies them:

```bash
sudo restorecon -nRv /path/to/new/mount
sudo restorecon -Rv /path/to/new/mount
```

:::caution
Snapshots retain their labels, but those labels may be outdated or wrong for a different mount path. Avoid relabelling entire snapshot trees. `restorecon` cannot repair read-only snapshots or filesystems without per-file label support.
:::

## Troubleshoot Application Access

When an application fails, check whether auditing is running and look for recent denials:

```bash
sudo systemctl status auditd --no-pager
sudo auditctl -s
sudo ausearch -m AVC,USER_AVC -ts recent | audit2why
```

If auditing fails, check `sudo journalctl -b -u auditd`. Try `sudo setenforce 0` to see whether permissive mode resolves the problem. Return to enforcing afterwards only if that was the original mode.

Before changing the policy, check for incorrect labels and repair only the affected directory:

```bash
ls -Z /path/to/file
sudo restorecon -nRv /path/to/directory
sudo restorecon -Rv /path/to/directory
```

### Create a Local Policy Module

When existing rules and booleans are insufficient, collect events for a local module. Replace `12345` with the process PID and `mytool_local` with a unique name:

```bash
sudo ausearch -m AVC,USER_AVC -ts recent -p 12345 --raw > mytool.avc
audit2allow -m mytool_local < mytool.avc > mytool_local.te
cat mytool_local.te
```

Read the generated source and remove permissions the application does not need before compiling and installing it:

```bash
make -f /usr/share/selinux/devel/Makefile mytool_local.pp
sudo semodule -i mytool_local.pp
```

:::caution
A logged denial is not necessarily a permission to grant. Some operations should remain blocked. Remember that applications may also use helper processes with different PIDs.
:::

Try security tools in an authorized lab before deciding whether they need custom rules. Use `getsebool -a` to check available booleans rather than copying settings from RHEL guides.

## Optional: Run Firefox in a Separate Domain

This example uses a temporary Firefox profile and dummy SSH data to demonstrate a domain transition. It requires the optional policy tools installed above.

:::caution
Use a disposable system in permissive mode. The example is not a complete Firefox sandbox and changes the executable's label for every new instance. Close Firefox before starting and restore its original configuration afterwards.
:::

1. Check the mode and existing customizations:

   ```bash
   getenforce
   id -Z
   sudo semodule -l
   sudo semanage fcontext -l -C
   ```

   The mode must be `Permissive` and the shell context must contain `unconfined_r:unconfined_t`. Stop if a `firefox_confined` module or local Firefox label override already exists.

2. Create a temporary profile and dummy data:

   ```bash
   lab_dir=$(mktemp -d "$HOME/selinux-firefox.XXXXXX")
   cd "$lab_dir"
   mkdir profile .ssh
   printf 'SELinux demo: no real credentials\n' > .ssh/demo.txt
   chcon -R -t ssh_home_t "$lab_dir/.ssh"
   nano firefox_confined.te
   ```

   Save this policy as `firefox_confined.te`:

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

3. Compile and load the module:

   ```bash
   make -f /usr/share/selinux/devel/Makefile firefox_confined.pp
   sudo semodule -i firefox_confined.pp
   ```

4. Find the real executable and note its current label. Use the resolved path below if it differs:

   ```bash
   readlink -f /usr/bin/firefox-esr
   ls -Z /usr/lib/firefox-esr/firefox-esr
   matchpathcon /usr/lib/firefox-esr/firefox-esr
   ```

   Check that the current label matches what the policy expects before applying the temporary mapping:

   ```bash
   sudo semanage fcontext -a -t firefox_confined_exec_t "/usr/lib/firefox-esr/firefox-esr"
   sudo restorecon -v /usr/lib/firefox-esr/firefox-esr
   ```

5. Run Firefox without opening a window. Even loading the start page is enough: the minimal module denies routine operations, so any records for the new domain prove the transition.

   ```bash
   firefox-esr --headless --no-remote --profile "$lab_dir/profile" "file://$lab_dir/.ssh/demo.txt" &
   sleep 20
   sudo ausearch -m AVC -ts recent | grep 'scontext=.*:firefox_confined_t:'
   pkill firefox-esr
   ```

   Records with `firefox_confined_t` as subject and `permissive=1` show allowed-and-logged denials. If the page itself loads, you may also see the `ssh_home_t` target among them. The policy is not sufficient for normal Firefox use in enforcing mode.

6. Restore the original configuration in this order:

   ```bash
   sudo semanage fcontext -d "/usr/lib/firefox-esr/firefox-esr"
   sudo restorecon -v /usr/lib/firefox-esr/firefox-esr
   sudo semodule -r firefox_confined
   matchpathcon -V /usr/lib/firefox-esr/firefox-esr
   ```

   Check the temporary directory's path with `printf '%s\n' "$lab_dir"` before deleting it. Undo any successful module or label changes even if an earlier step failed.

## Disable SELinux

1. Undo activation and remove the drop-in **only if you created it for this guide**. Keep any unrelated settings:

   ```bash
   if [ "$(getenforce)" = "Enforcing" ]; then
     sudo setenforce 0
   fi
   sudo selinux-activate disable
   sudo rm -f /etc/default/grub.d/selinux.cfg /.autorelabel
   ```

   Check GRUB for leftover SELinux selectors or `apparmor=0`. If you changed an `lsm=` list, restore it to select AppArmor.

2. Open `/etc/selinux/config` and set:

   ```text
   SELINUX=disabled
   ```

3. Enable AppArmor for the next boot and regenerate GRUB:

   ```bash
   sudo systemctl enable apparmor
   sudo update-grub
   sudo grep -E '^[[:space:]]*linux' /boot/grub/grub.cfg
   sudo reboot
   ```

   Wait until after the reboot to start AppArmor. Until then, SELinux is still the active module.

4. Verify that SELinux is disabled and AppArmor profiles are loaded:

   ```bash
   sestatus
   cat /proc/cmdline
   cat /sys/kernel/security/lsm
   sudo aa-status
   ```
