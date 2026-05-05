# Wi-Fi Adapter Not Detected

Wireless adapter detection failures on Parrot OS usually originate from one of four layers: hardware visibility, kernel driver support, firmware availability, or interface state. This guide focuses on structured diagnosis rather than one-click fixes.

---

## Scope

Use this guide if:

- No wireless networks appear
- Wi-Fi toggle is missing
- `wlan0` / `wlp*` interface does not exist
- USB Wi-Fi adapter is plugged in but ignored
- Internal laptop Wi-Fi works in another OS but not in Parrot
- Adapter appears in hardware list but cannot initialize

---

## 1. Identify Whether the System Sees the Hardware

Start by checking if the device is visible on the bus.

### PCI / Internal Adapters

```
lspci -nnk | grep -A3 -i network
```

### USB Adapters

```
lsusb
```

If nothing relevant appears:

- Check BIOS/UEFI wireless settings
- Disable airplane mode in firmware or keyboard hotkeys
- Re-seat USB adapter
- Test another USB port
- Verify the adapter works on another machine

If hardware does not enumerate, this is not yet a Linux driver issue.

---

## 2. Check for a Wireless Interface

List interfaces:

```
ip link
```

Typical wireless names:

- `wlan0`
- `wlp2s0`
- `wlx<mac>`

If only `lo` and Ethernet interfaces exist, continue to driver and firmware checks.

---

## 3. Inspect Driver Binding

Determine whether the kernel matched a driver.

```
lspci -nnk
```

or for USB:

```
lsusb
```

Then inspect loaded modules:

```
lsmod | grep -E 'iwlwifi|ath|rtw|rtl|mt76|brcm'
```

Common families:

| Vendor           | Typical Module               |
| ---------------- | ---------------------------- |
| Intel            | `iwlwifi`                    |
| Qualcomm Atheros | `ath9k`, `ath10k`, `ath11k`  |
| Realtek          | `rtw88`, `rtw89`, `rtl8xxxu` |
| MediaTek         | `mt76`                       |
| Broadcom         | `brcmsmac`, `brcmfmac`, `wl` |

If the adapter is visible but no suitable module loads, continue below.

---

## 4. Review Kernel Messages

Kernel logs often reveal the exact failure reason.

```
dmesg | grep -iE 'wifi|wlan|firmware|iwlwifi|rtl|ath|mt76|brcm'
```

Look for patterns such as:

- firmware file missing
- failed to load firmware
- device timeout
- unsupported chipset
- RF-kill blocked
- probe failed
- invalid EEPROM / calibration data

This step is usually more valuable than random package reinstall attempts.

---

## 5. Firmware Missing

Many adapters require proprietary firmware blobs that are loaded at runtime.

Refresh repositories and install standard firmware packages:

```
sudo apt update  
sudo apt install firmware-linux firmware-linux-nonfree
```

Then reboot or reload the module.

Example:

```
sudo modprobe -r iwlwifi  
sudo modprobe iwlwifi
```

If a specific firmware filename is missing in `dmesg`, search for the package that provides it.

---

## 6. RF-Kill / Soft Blocked Devices

Some systems expose the adapter but block radio transmission.

Check state:

```
rfkill list
```

If blocked:

```
sudo rfkill unblock all
```

Then verify NetworkManager detects the device.

---

## 7. NetworkManager Running but No Device Listed

Confirm service state:

```
systemctl status NetworkManager
```

Restart if needed:

```
sudo systemctl restart NetworkManager
```

Then inspect devices:

```
nmcli device status
```

If the interface exists but shows unavailable, firmware or regulatory issues may still be present.

---

## 8. Realtek USB Adapters

Some Realtek USB chipsets rely on out-of-tree drivers or newer kernel support.

Identify chipset first:

```
lsusb
```

Then search exact chipset model (example: `8812au`, `8821cu`, `8852bu`) before installing random GitHub drivers.

Avoid mixing multiple unofficial drivers simultaneously.

---

## 9. Broadcom Devices

Broadcom support is fragmented. Open drivers work for some chipsets, proprietary drivers for others.

Check device ID:

```
lspci -nn | grep -i broadcom
```

Then install recommended package if required:

```
sudo apt install broadcom-sta-dkms
```

Reboot after installation.

---

## 10. Secure Boot Consideration

If using proprietary or DKMS-built modules, Secure Boot may prevent loading unsigned modules.

Symptoms:

- Driver installed successfully
- Module exists
- Interface still absent
- `dmesg` mentions signature rejection

Options:

- Disable Secure Boot in firmware
- Enroll signing keys properly

---

## 11. Kernel Version Issues

Very new chipsets may need a newer kernel than the one currently installed.

Check kernel:

```
uname -r
```

If the adapter is recent-generation hardware, testing a newer kernel may resolve detection issues.

---

## 12. USB Power Management Problems

Adapters that appear/disappear repeatedly may be suspended by power management.

Temporarily test:

```
sudo usbreset
```

or disable autosuspend via kernel parameters / TLP configuration.

---

## 13. Validate Final State

Once fixed, confirm:

```
iw dev  
nmcli device wifi list  
ip addr show
```

You should see:

- wireless interface present
- scan results returned
- successful association to an AP

---

## Common Mistakes

- Installing random drivers before identifying chipset
- Assuming missing Wi-Fi icon = missing hardware
- Ignoring `rfkill`
- Forgetting firmware packages
- Mixing proprietary and in-kernel drivers
- Using outdated forum fixes for different chipsets