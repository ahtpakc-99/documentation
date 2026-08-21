---
title: "Dual Boot Time Mismatch"
---

A common issue in Linux + Windows dual-boot systems is that the clock appears correct in one OS and wrong in the other. The usual symptom is an offset of several hours after rebooting between systems. This is not a hardware clock failure—it is typically caused by different assumptions about how the Real-Time Clock (RTC) is stored.

Use this guide if:

- Time is correct in Parrot OS but wrong in Windows
- Time is correct in Windows but wrong in Parrot OS
- Clock shifts after every reboot into the other OS
- Timezone is correct, but displayed time is offset
- NTP works temporarily, then breaks after switching OS

## Why It Happens

Your motherboard clock (RTC) stores a base time. Operating systems may interpret that clock differently:

- **Linux** commonly expects RTC in **UTC**
- **Windows** commonly expects RTC in **local time**

If one OS writes RTC using one model and the other reads using another, the displayed time becomes offset.

This is a standard mismatch, not a timezone bug.

---

## 1. Check Current Time Sync State in Parrot

Inspect system clock, RTC, timezone, and sync status:

```
timedatectl
```

Important fields:

- `Local time`
- `Universal time`
- `RTC time`
- `Time zone`
- `System clock synchronized`
- `RTC in local TZ`

This command usually reveals the exact configuration mismatch, e.g.:

```
Local time: Mon 2026-04-27 11:18:28 UTC
Universal time: Mon 2026-04-27 11:18:28 UTC
RTC time: Mon 2026-04-27 13:18:28
Time zone: Etc/UTC (UTC, +0000)
System clock synchronized: no
NTP service: active
RTC in local TZ: no
```

## 2. Recommended Fix: Keep RTC in UTC

Using UTC for RTC is cleaner and aligns with Linux defaults. Configure Windows to understand UTC instead of local time.

### On Windows

Run **Command Prompt as Administrator**:

```
reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /t REG_DWORD /d 1 /f
```

Then fully reboot Windows.

### On Parrot

Ensure it is using UTC behavior:

```
timedatectl set-local-rtc 0
```

Re-check:

```
timedatectl
```

Expected:

- `RTC in local TZ: no`

## 3. Alternative Fix: Force Linux to Use Local Time

Use this only if Windows-side changes are not possible.

```
sudo timedatectl set-local-rtc 1 --adjust-system-clock
```

Then verify:

```
timedatectl
```

Expected:

- `RTC in local TZ: yes`

This works, but UTC is generally preferable.

## 4. Ensure NTP Is Enabled

Even after RTC alignment, network time sync should remain active.

```
timedatectl set-ntp true  
timedatectl
```

If synchronization is disabled, the clock may drift over time.

## 5. Correct Timezone Explicitly

If the offset is caused by wrong timezone rather than RTC interpretation:

List zones:

```
timedatectl list-timezones
```

Set timezone (example Sri Lanka):

```
sudo timedatectl set-timezone Asia/Colombo
```

Then verify again:

```
timedatectl
```

## 6. Fast Startup in Windows

Windows Fast Startup can preserve stale clock state across shutdowns.

Recommended:

- Disable **Fast Startup** in Windows power settings.
- Perform a full shutdown/reboot after changing clock settings.

This prevents partial hibernation behavior from reintroducing mismatches.

## 7. If Time Keeps Resetting in Both OSes

If both systems lose time entirely (not just offset), check hardware causes:

- Weak CMOS battery
- Firmware reset
- Motherboard RTC issues

That is separate from dual-boot UTC/local conflicts.

## 8. Validate the Fix

After configuration:

1. Boot Parrot → verify time
2. Reboot to Windows → verify time
3. Reboot back to Parrot → verify again

If correct in all transitions, the RTC model is aligned.

## Common Mistakes

- Changing timezone instead of RTC mode
- Disabling NTP and assuming the problem is fixed
- Using local RTC without understanding DST effects
- Testing without a full reboot
- Ignoring Windows Fast Startup