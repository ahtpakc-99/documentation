### Install ParrotOS with Manual Partitioning

Now let's focus on the Manual partitioning of ParrotOS using Calamares installer, which may be necessary for various purposes and needs.

Like the [Dualboot with Windows](https://parrotsec.org/docs/installation/dualboot-with-windows), this method allows you to assign the desired size of the partitions and determine how many of them to create or edit.

Let's see two use cases: Partitioning a disk with existing partitions and Partitioning an empty disk.

## Case 1: Partitioning a disk with existing partitions


After following the steps for setting the [Parrot Installation](./) before partitioning, select **Manual Partitioning** then click on Next.

![1](./images/dualboot/db1.png)

You'll see something similar to this:

[aggiungere foto qui]: #

The partitions in detail: [metterò quelle corrette dopo]: #

* /dev/sda1 is the boot partition.
* /dev/sda2 is MSR (Microsoft Reserved partition).
* /dev/sda3 is where preinstalled OS exists (Windows 10 for this use case).
* /dev/sda4 is a hidden partition which contains Windows Files for Recovery.

To make ParrotOS work in a UEFI computer, at least three working partitions are needed: 
* `/boot/EFI` - _the folder containing the efi firware necessary to boot the system._
* `/` - _the folder containing the entire system_
* `/home`- _the User data folder_


:::info Note
  Disable Secure Boot and CSM from UEFI settings in your machine before doing any of the above descripted operations.
:::

In a standard BIOS partition, at least two working partitions are needed: 
* `/`
* `/home`
