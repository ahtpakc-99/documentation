---
title: "AppArmor Parser Errors and Service Failures"
description: Diagnose and resolve AppArmor profile loading errors, missing tunables, and container daemon startup failures on ParrotOS.
sidebar:
  order: 4
---

AppArmor is enabled by default on Parrot OS to enforce mandatory access controls and isolate processes. However, during system upgrades, virtual machine image deployments, or conffile cleanups, critical tunable definitions in `/etc/apparmor.d/tunables/` may become missing or corrupt.

When this occurs, `apparmor.service` fails during startup, causing container runtimes (such as Docker, Podman, and containerd) and sandboxed applications to fail immediately.

## 1. Symptoms and Error Indicators

Common indicators of broken AppArmor configurations include:

### Systemd Service Failure
Checking the service status reports that profiles failed to load:

```bash
systemctl status apparmor
```

Output:
```text
? apparmor.service - Load AppArmor profiles
     Loaded: loaded (/lib/systemd/system/apparmor.service; enabled; preset: enabled)
     Active: failed (Result: exit-code)
    Process: 642 ExecStart=/lib/apparmor/apparmor.systemd reload (code=exited, status=1/FAILURE)
   Main PID: 642 (code=exited, status=1/FAILURE)
```

### Parser Errors in System Journal
Inspecting `journalctl -u apparmor` reveals missing tunables:

```text
AppArmor parser error for /etc/apparmor.d in profile /etc/apparmor.d/tunables/global at line 17: Could not open 'tunables/proc'
AppArmor parser error for /etc/apparmor.d in profile /etc/apparmor.d/tunables/global at line 24: Could not open 'tunables/run'
Error: At least one profile failed to load
```

### Container Engine Failures
Attempting to run a container fails with daemon or profile loading errors:

```bash
docker run --rm hello-world
```

Output:
```text
docker: Error response from daemon: AppArmor profile not loaded: apparmor_parser failed with error.
```

---

## 2. Why Standard Reinstallation Fails

Running `sudo apt install --reinstall apparmor` often does not resolve the issue. By default, Debian's package manager (`dpkg`) **ignores missing configuration files in `/etc`** upon package reinstallation. This behavior exists to respect intentional administrator deletions, but it prevents default tunable templates from being automatically restored.

---

## 3. Step-by-Step Resolution

### Step 1: Force Restoration of Missing Conffiles
Instruct `dpkg` to restore all missing default configuration files and tunables using the `--force-confmiss` option:

```bash
sudo apt-get update
sudo apt-get -o Dpkg::Options::="--force-confmiss" install --reinstall apparmor apparmor-utils
```

### Step 2: Verify Restored Tunables
Confirm that the core tunable definitions are present in `/etc/apparmor.d/tunables/`:

```bash
ls -l /etc/apparmor.d/tunables/proc /etc/apparmor.d/tunables/run
```

Expected output confirms both files exist:
```text
-rw-r--r-- 1 root root ... /etc/apparmor.d/tunables/proc
-rw-r--r-- 1 root root ... /etc/apparmor.d/tunables/run
```

### Step 3: Restart and Validate AppArmor
Restart the systemd service to re-parse all profiles:

```bash
sudo systemctl restart apparmor
```

Verify that the service is active and profiles are successfully loaded:

```bash
sudo aa-status
```

The output should confirm that profiles are loaded in `enforce` or `complain` mode without parser errors.

### Step 4: Restart Container Runtimes
Once AppArmor is operational, restart Docker or your respective container manager:

```bash
sudo systemctl restart docker
docker run --rm hello-world
```

The container should initialize and execute successfully.