---
sidebar_position: 9
---

# SSD TRIM

SSD Trim allows the drive to check and delete data blocks no longer needed. This means that the drive is always ready to write new data when the old ones are being deleted and that block containing the data is no longer busy.

In order to set up SSD Trim, open the terminal and follow these steps:

1. Identify your drive first and check if your drive supports the Trim: 

```
$ sudo fdisk -l
$ sudo hdparm -I /dev/sdx
```

:::info Note
    If it’s supported, the output should contain this:
    Data Set Management TRIM supported
:::

2. Backup your fstab to a location of your choice 

```
$ sudo cp /etc/fstab /opt/fstab.bak
```

3. Edit fstab

```
$ sudo pluma /etc/fstab
```

The file should result like this:


:::info Note

The UUIDs listed below are only examples. 

:::


```
UUID=1cd2fc4f-7d99-4c7a-8ea7-6f9a2d5e5960 /   ext4 errors=remount-ro 0
```

Attach `discard,` before `errors=remount-ro` and the final result should be this:

```
UUID=1cd2fc4f-7d99-4c7a-8ea7-6f9a2d5e5960 /   ext4 discard,errors=remount
```
