---
title: "Installing QEMU/KVM, Virt-Manager, and GNOME Boxes on Debian"
sidebar_position: 5
---

This guide will help you set up a virtualization environment on Debian-based systems, including Parrot OS, using **QEMU/KVM**, **Virt-Manager**, and **GNOME Boxes**.

## Update your system

First, make sure your system is up to date:

```bash
sudo parrot-upgrade
```

## Install QEMU and KVM

Install the necessary packages:
 
```bash
sudo apt install -y qemu qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
```
**To launch Virt-Manager, use the command:**  
`virt-manager`

**To launch Gnome Boxes, use:**  
`gnome-boxes`

## Verify CPU virtualization support

Check if your CPU supports hardware virtualization:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

If it is **≥1**, we are ready to use KVM.

## Add your user to the libvirt and kvm groups

This allows running virtual machines without sudo:

```bash
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
```
:::info NOTE
    If we import a .qcow2 image, it should not cause any issues. Just configure the resources and start.
:::

## Verify KVM installation

```bash
virsh list --all
```
If there are no errors, your KVM environment is ready. You can now create and manage virtual machines using Virt-Manager or GNOME Boxes.

### Using Gnome-Boxes

After installing the package, Boxes will be ready to use.

![1](./images/qemu/1.png)

When clicking Create New Virtual Machine, you will have two options. Select the first one. You can use either an `.iso` or a `.qcow2` file.

![2](./images/qemu/2.png)

With the ISO selected.

:::info NOTE
    Log out and log back in (or reboot) for the changes to take effect.
:::

![3](./images/qemu/3.png)

It is important to disable automatic OS detection. You should manually select the option that best matches the distribution your ISO is based on.

At this point, your virtual machine will be created and ready to use. Of course, each user can choose the resources they want to allocate.

![4](./images/qemu/4.png)

If you want to adjust additional settings from the beginning, you can open the **Preferences menu**.

![5](./images/qemu/5.png)

![6](./images/qemu/6.png)

If you want to access more advanced settings, you can do so from **Edit Configuration**.

![6.1](./images/qemu/6.1.png)

![6.2](./images/qemu/6.2.png)

![7](./images/qemu/7.png)

![8](./images/qemu/8.png)

Done. From here, you can follow the standard Parrot OS installation procedure.

### Using Virt-Manager

After installing the package, Virt-Manager will be ready to use.

:::info NOTE
    This Virt-Manager GUI can be slightly more complex to use than Boxes for beginner users.
:::

The steps are similar to the previous ones. Only a few-point change, which will be detailed below.

![10](./images/qemu/10.png)

![11](./images/qemu/11.png)

![12](./images/qemu/12.png)

At this step, to avoid confusion, it is recommended to use the **Browse Local** option.

![13](./images/qemu/13.png)

It is important to disable automatic OS detection. You should manually select the option that best matches the distribution your ISO is based on.

![14](./images/qemu/14.png)

![15](./images/qemu/15.png)

:::info NOTE
Allocate the resources you need (or consider appropriate) for your project.
:::

![16](./images/qemu/16.png)

Even if it shows Debian 13, this is still our Parrot OS ISO.

If you select **Customize configuration before install**, you can access more advanced settings if needed.

![17](./images/qemu/17.png)

![18](./images/qemu/18.png)

Done. From here, you can follow the standard Parrot OS installation procedure.

If you want to access more advanced settings, double-click on your virtual machine.

![19](./images/qemu/19.png)

Then click the light bulb icon next to the monitor icon.

![20](./images/qemu/20.png)

You can also manage snapshots.

![21](./images/qemu/21.png)

Once the changes are done, you can return to the VM start screen by clicking the monitor icon.

:::info NOTE
There are other alternatives if you prefer a more minimal approach to managing and using VMs with QEMU/KVM, such as `virsh` or commands like `qemu-img`.
:::