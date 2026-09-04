---
title: "VirtualBox"
description: Create a virtual machine and install ParrotOS on VirtualBox.
sidebar:
  order: 1
---

This guide provides a comprehensive walkthrough for setting up a new Virtual Machine (VM) and installing ParrotOS using VirtualBox.

## Prerequisites

If you are using Windows or macOS, download the latest VirtualBox installer from the [official website](https://www.virtualbox.org/wiki/Downloads).

On GNU/Linux environments, you can install it via the terminal:

```bash
sudo apt update
```
    sudo apt install virtualbox virtualbox-ext-pack

Ensure you have downloaded the ParrotOS ISO of your choice from the [official download page](../../introduction/download-parrot/).

## Creating a New Virtual Machine

Once VirtualBox is installed, launch the application and click on **New** to create a new virtual machine.

### Name and Operating System
Enter **Parrot OS** as the name. Load your downloaded ParrotOS ISO by clicking the dropdown arrow and selecting the file. The **Type** (Linux) and **Version** (Debian 64-bit) should be detected automatically.

![1](./images/vbox/1.png)

### Allocate Memory and CPU
While the OS can run on minimal resources, at least **2 GB of RAM (2048 MB)** and **2 CPU cores** are strongly recommended for a smooth experience in both the Security and Home Editions.

Choose the best settings based on your host machine's available hardware. Check the **Enable EFI** box and click *Next*.

![2](./images/vbox/2.png)

### Create a Virtual Hard Drive
Select **Create a Virtual Hard Disk Now**. Set the disk size to at least **20 GB for the Home Edition** and **40 GB for the Security Edition**.

By default, this creates a **Dynamically Allocated Disk**. If you prefer the VM to reserve the full storage space immediately for slight performance gains, check **Pre-Allocated Full Size**.

![3](./images/vbox/3.png)

Review your settings on the summary screen and click *Finish*.

![4](./images/vbox/4.png)

## Modifying VirtualBox Settings

Before starting the installation, optimizing the VM settings ensures better performance and integration with your host machine. Select your new VM and click on **Settings**.

### Shared Clipboard and Drag 'n' Drop
Navigate to **General > Advanced**. Change both **Shared Clipboard** and **Drag 'n' Drop** to **Bidirectional**. This allows you to copy and paste files or text seamlessly between your host and the Parrot VM.

![6](./images/vbox/6.png)

### Processor and PAE/NX
Navigate to **System > Processor**. Ensure at least 2 cores are allocated (do not allocate more physical cores than your host machine has available). 

Check the box to **Enable PAE/NX**.
  
![7](./images/vbox/7.png)

### Motherboard Options
Navigate to **System > Motherboard**. Uncheck the **Floppy** drive option and ensure **Enable I/O APIC** is checked. 

If your host machine has abundant RAM (e.g., 16 GB or more), you can increase the Base Memory allocation here for better VM responsiveness.

![6](./images/vbox/13.png)   

### Video Memory and 3D Acceleration
Navigate to **Display > Screen**. Slide the **Video Memory** up to **128 MB** for a responsive desktop environment. 

Check the box for **Enable 3D Acceleration**.

![10](./images/vbox/8.png)

### Storage and ISO Loading
Navigate to **Storage**. Click on the **Empty** CD icon under the IDE Controller. On the right panel, click the small CD icon and choose your downloaded ParrotOS ISO.

:::note[Note]
  If you only want to test ParrotOS without installing it, check the **Live CD/DVD** box to run the live environment directly.
:::

![8](./images/vbox/12.png)

### Network and USB Settings
* **Network:** The default **NAT** setting is usually sufficient for internet access. 
* **USB:** To enable USB 2.0/3.0 support, ensure you have the **VirtualBox Extension Pack** installed on your host machine. This also enables Remote Desktop Protocol (VRDP) and webcam passthrough.

![10](./images/vbox/10.png)

Your VM is now fully configured and ready.

![12](./images/vbox/11.png)

## Booting ParrotOS ISO

1. Select your configured Virtual Machine and click **Start**.
2. From the boot menu, select **Try/Install** and press Enter.

![16](../installation/images/calamares/10.png)

3. Once the live desktop loads, double-click the **Install Parrot** icon to launch the Calamares installer.

![17](../installation/images/calamares/11.png)

Follow the on-screen instructions to select your Language, Timezone, and Keyboard Layout.

![18](../installation/images/calamares/12.png)

![19](../installation/images/calamares/13.png)

![20](../installation/images/calamares/14.png)

### Disk Partitioning
Select **Erase disk** for a guided, automated partitioning process. This will format the virtual hard drive (not your physical host drive).

![21](../installation/images/calamares/15.png)

You will have the option to set up Swap space or encrypt the virtual system with a passphrase if desired.

![22](../installation/images/calamares/16.png)

![23](../installation/images/calamares/17.png)

### User Account Setup
Create your primary user account and establish a strong password.

![24](../installation/images/calamares/18.png)

### Completing the Installation Process
Review the installation summary and click **Install**. Confirm by clicking **Install now**.

![25](../installation/images/calamares/19.png)

![26](../installation/images/calamares/20.png)

Wait for the process to complete. Once finished, check the **Restart now** box and click **Done**.

![27](../installation/images/calamares/21.png)

![28](../installation/images/calamares/22.png)

### First Login and Post-Installation

After the system reboots, enter your newly created password to access your ParrotOS desktop.

![29](../installation/images/calamares/23.png)

![30](../installation/images/calamares/24.png)

Welcome to ParrotOS!
