---
sidebar_position: 2
---

# Dualboot with Windows

It is possible to install ParrotOS alongside Windows, thanks to GRUB and correct partitioning. 

:::info Note
  Disable Secure Boot and CSM in your machine's UEFI settings.
:::

After following the steps in the [Parrot Installation](./) guide up to the partitioning section, the situation will look similar to this:

![1](./images/dualboot/db1.png)

There are two ways to proceed: 

 - [Method 1: Automated Partitioning](<./dualboot-with-windows.html#method-1-automated-partitioning>)
 - [Method 2: Manual Partitioning](<./dualboot-with-windows.html#method-2-manual-partitioning>)


## Method 1: Automated Partitioning

This is the easiest method. You simply verify that **Install alongside** is selected, choose the correct drive (e.g., **/dev/sda3**) from the dropdown menu, and drag the bottom slider to assign the desired amount of space for ParrotOS. Then click on *Next* to proceed.

![2](./images/dualboot/db2.png)


## Method 2: Manual Partitioning

This method gives you the freedom to choose the exact amount of space and the number of partitions for ParrotOS.

**NOTE:** The **Security** edition needs *at least* 40GB of space, while the **Home** edition needs *at least* 20GB. In this guide, we are not creating a Swap partition as it is optional on modern systems with SSDs.

Select **Manual Partitioning** and click on *Next*.

![3](./images/dualboot/db3.png)

You will see something similar to this:

![4](./images/dualboot/db4.png)

In detail:

* **/dev/sda1** is the boot partition (EFI).
* **/dev/sda2** is the MSR (Microsoft Reserved partition).
* **/dev/sda3** is where Windows is installed.
* **/dev/sda4** is a recovery partition.

This is a standard Windows partition layout.
Select the main Windows partition (e.g., **/dev/sda3**) and click on *Edit*.

![5](./images/dualboot/db5.png)

This window will open:

![6](./images/dualboot/db6.png)

Here you can shrink/resize partitions (by dragging the bar or entering the size in MiB), and set flags and mount points.

Drag the bar or set the value to free up the desired space (in this example, we resized Windows to 40GB, leaving 20GB of unallocated space for ParrotOS), then click on *OK*.

![7](./images/dualboot/db7.png)

Now you will see the updated layout. Select the new **Unallocated** space and click on *Create*:

![8](./images/dualboot/db8.png)

Configure the new partition settings. Choose your file system (ParrotOS defaults to BTRFS) and set the mount point to / (**root**). Then click on *OK*:

![9](./images/dualboot/db9.png)

Finally, set up the boot partition.

Select the EFI partition (e.g., **/dev/sda1**) and click on *Edit*:

![10](./images/dualboot/db10.png)

Set the mount point to **/boot/efi** (do not format this partition!) and click on *OK*:

![11](./images/dualboot/db11.png)

This is the final layout. Proceed with the installation by clicking on *Next*:

![12](./images/dualboot/db12.png)