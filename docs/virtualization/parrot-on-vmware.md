---
sidebar_position: 3
---

# VMware

This guide walks you through the process of creating a Virtual Machine and installing ParrotOS using VMware. The steps apply primarily to VMware Workstation (Pro and Player) on GNU/Linux and Windows, as well as VMware Fusion on macOS. 

Since the setup procedure is highly standardized across VMware products, these instructions will easily translate regardless of your specific edition.

## 1. Download & Install VMware Workstation

First, download the latest version of VMware Workstation from the [official website](https://www.vmware.com). 

If you are installing VMware on a GNU/Linux host system, navigate to the directory where you downloaded the `.bundle` installer, open a terminal, and grant it execution privileges:

    chmod +x VMware-Workstation-*.bundle

Then, run the installer with root privileges:

    sudo ./VMware-Workstation-*.bundle

Follow the on-screen prompts to complete the setup. Once finished, you will find VMware ready to use in your application menu.

![1](./images/vmware/6.png)

## 2. Create a New Virtual Machine

Open VMware, go to the **File** tab, and click on **Create a New Virtual Machine**.

![2](./images/vmware/7.png)

The Virtual Machine Wizard will open. Select **Use ISO image**, browse for the ParrotOS ISO file you downloaded, and click **Next**.

:::warning Note
  VMware's automatic OS detection might misidentify the system as an older Debian version (e.g., Debian 5 or Debian 10). This is completely normal and can be easily corrected in the following steps.
:::

![3](./images/vmware/8.png)

When prompted to select the Guest Operating System, choose **Linux**, and select the most recent **Debian 64-bit** version available in your dropdown menu (e.g., Debian 12.x or Debian 13.x 64-bit).

![4](./images/vmware/9.png)

Give your new Virtual Machine a recognizable name and click **Next**.

![5](./images/vmware/10.png)

Next, allocate the disk capacity. Based on the Parrot edition you downloaded:
* **Home Edition:** At least **20 GB** is required.
* **Security Edition:** At least **40 GB** is strongly recommended due to the extensive pre-installed toolset.

![6](./images/vmware/11.png)

The following screen displays a summary of your VM's specifications. For a smooth and responsive experience, at least **4 GB of RAM (4096 MB)** and **2 CPU Cores** are recommended. 

You can adjust these settings by clicking on **Customize Hardware...**.

![7](./images/vmware/12.png)

![8](./images/vmware/13.png)

## 3. Boot and Install ParrotOS

Your Virtual Machine is now configured and ready. Click **Finish** and power on the VM. 

The system will boot into the GRUB menu, where you can select the live mode to run ParrotOS.

![9](./images/vmware/14.png)

![10](./images/vmware/15.png)

From the live desktop, you can launch the Calamares installer by double-clicking the **Install Parrot** icon and follow the standard installation procedure.