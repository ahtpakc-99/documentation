---
title: "SSD TRIM"
description: Verify and configure TRIM on ParrotOS, using the default periodic fstrim timer or the continuous discard mount option.
sidebar:
  order: 9
---

TRIM lets an SSD know which blocks are no longer in use, so the controller can erase them in advance instead of during a later write. Without it, write performance degrades over time as the drive runs out of pre-erased blocks.

There are two ways to issue TRIM commands, and you only need one of them.

| Method | How it works | Status on ParrotOS |
|---|---|---|
| Periodic (`fstrim.timer`) | A weekly systemd timer trims all mounted filesystems at once | **Enabled by default** |
| Continuous (`discard`) | The kernel sends a TRIM command on every file deletion | Off by default |

Periodic TRIM is the recommended approach and is already active, so in most cases there is nothing to configure. Continuous TRIM adds latency to every delete operation and, on some older drives, degrades performance instead of improving it.

## Check That Your Drive Supports TRIM

List your drives and their discard capabilities:

```bash
lsblk --discard
```

If the `DISC-GRAN` and `DISC-MAX` columns show non-zero values, the device supports TRIM:

```text
NAME        DISC-ALN DISC-GRAN DISC-MAX DISC-ZERO
nvme0n1            0      512B       2T         0
├─nvme0n1p1        0      512B       2T         0
└─nvme0n1p2        0      512B       2T         0
```

A value of `0B` in both columns means the drive does not advertise TRIM support, and neither method below will have any effect.

:::note
`hdparm -I` also reports TRIM support, but only for SATA devices. `lsblk --discard` works for SATA and NVMe alike, so prefer it.
:::

## Periodic TRIM (Recommended)

Check that the timer is active:

```bash
systemctl status fstrim.timer
```

If it is not enabled, enable it:

```bash
sudo systemctl enable --now fstrim.timer
```

You can inspect when it last ran and when it will run next:

```bash
systemctl list-timers fstrim.timer
```

To trim every mounted filesystem immediately, without waiting for the timer:

```bash
sudo fstrim --all --verbose
```

## Continuous TRIM (Optional)

Only configure this if you have a specific reason to prefer it over the timer. Do not enable both: running `discard` alongside `fstrim.timer` provides no benefit.

:::caution[Back up your fstab first]
A malformed `/etc/fstab` can leave the system unable to boot. Make a copy before editing it.
:::

```bash
sudo cp /etc/fstab /etc/fstab.bak
```

Open the file:

```bash
sudo nano /etc/fstab
```

Locate the line for the filesystem you want to trim. A root ext4 entry looks like this:

```text
UUID=1cd2fc4f-7d99-4c7a-8ea7-6f9a2d5e5960  /  ext4  errors=remount-ro  0  1
```

:::note
The UUID above is only an example. Use the one already present in your own file, and leave the last two numeric fields untouched.
:::

Add `discard` to the comma-separated options field, keeping every other option intact:

```text
UUID=1cd2fc4f-7d99-4c7a-8ea7-6f9a2d5e5960  /  ext4  discard,errors=remount-ro  0  1
```

Verify that the file still parses correctly before rebooting:

```bash
sudo findmnt --verify --verbose
```

Apply the new options without a reboot:

```bash
sudo mount -o remount /
```

If `fstrim.timer` is enabled, disable it now that TRIM is handled at mount level:

```bash
sudo systemctl disable --now fstrim.timer
```
