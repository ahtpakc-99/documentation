---
title: "Persistent partition"
sidebar:
  order: 2
---

This guide shows how to create a persistent partition on a USB drive with Parrot OS.
To do this, we will use the [mkusb](https://github.com/sudodus/tarballs) tool.

## Install mkusb

Before downloading the tool, ensure you have the necessary dependencies installed:

```bash
sudo apt update
sudo apt install gdisk dialog zenity -y
```

After downloading the Parrot OS *.iso* file from our website, download *mkusb* from the [repository](https://github.com/sudodus/tarballs):

```bash
git clone https://github.com/sudodus/tarballs.git
```

Navigate to the downloaded folder and unpack **dus-plus.tar.xz** using *tar*:

```bash
cd tarballs && tar -xf dus-plus.tar.xz
```

:::note
Why only **dus-plus.tar.xz** instead of **dus.tar.xz**? In short, it contains the *usb-pack-efi* package needed to boot the partition.
:::

Go inside the newly extracted *dus-tplus* folder, and install the tool by typing:

```bash
cd dus-tplus/ && sudo ./dus-installer i
```

In the same terminal session, type `dus` (or open *guidus* from the Parrot menu) and it will start. You will be greeted by a warning about overwriting the target device. Click **OK**.

:::note
`dus` will ask to install the *guidus* GUI as well. The functionality will remain the same.
:::

![1](./images/persistent-usb/1.png)

This tool can also be used to make a USB bootable, restore, format, and perform other operations.

![2](./images/persistent-usb/2.png)

## Create the persistent partition

From the main menu, select **i - Install (make a boot device)**. Then, select the **p - 'Persistent live'** option.

![3](./images/persistent-usb/3.png)

Select **p - 'dus-Persistent'** from the menu to choose the method to create the persistent partition.

![4](./images/persistent-usb/4.png)

Now select the *.iso* file you want to install:

![5](./images/persistent-usb/5.png)

An information window will appear detailing the possible methods. Click **OK** to proceed.

![6](./images/persistent-usb/6.png)

Select the USB drive where you want to install Parrot OS (we recommend using at least a 4GB USB drive) and click **OK**.

![7](./images/persistent-usb/7.png)

A warning prompt will appear asking you to verify the drive size. Click **Yes** to confirm you want to overwrite this target device.

![8](./images/persistent-usb/8.png)

At the final checkpoint, select the **Go** radio button and confirm the operation. The persistent partition will be ready in a few minutes.

![9](./images/persistent-usb/9.png)

Once the process is complete, a success window will appear. Press **Enter** or click **OK** to finish.

![10](./images/persistent-usb/10.png)