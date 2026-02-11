---
sidebar_position: 1
---

# Development Environment Setup

This guide details how to set up a complete development environment for building Parrot OS packages. 
Following these steps will install the essential tools and create a clean chroot environment, ensuring reliable and reproducible builds.

## Initial Setup

First, you need to update your system's package list and install the essential tools for package building. 
This initial setup is a one-time process that prepares your machine for all future packaging work.

### 1. **Update Package Lists:** 
Refresh your local package index to ensure you are installing the latest versions of the required tools. This command synchronizes the list of available packages from the Parrot OS repositories.

```
sudo apt update
```


### 2. **Install Development Tools:** **devscripts**, **git-buildpackage**, and **sbuild**

These three packages form the foundation of the Debian packaging toolchain.

* **devscripts**: A collection of scripts that automates common packaging tasks and simplifies development. Utilities like dch (for changelogs) and debuild (for building) are included.  
* **git-buildpackage**: An indispensable tool for maintaining Debian packages within a Git repository. It bridges the gap between source code version control and Debian packaging, allowing you to build directly from commits or tags.  
* **sbuild**: The core tool for building packages in a pristine, isolated chroot (a "clean room" environment). This guarantees that the build process is not influenced by any libraries or configurations on your host machine, which is critical for ensuring packages will work correctly for all users.

```
sudo apt install devscripts git-buildpackage sbuild
```

### 3. **Create the Build Chroot:** 

Set up a clean build environment for your target architecture using sbuild. A chroot is essentially a self-contained copy of a minimal Parrot OS system. This command creates a chroot named **echo-\<architecture\>-sbuild** for the "echo" Parrot OS release.  
Replace **\<architecture\>** with your target architecture, such as *amd64* or *arm64*. 

``` 
sudo sbuild-createchroot --arch=<architecture> echo /var/lib/sbuild/echo-<architecture>-sbuild https://deb.parrot.sh/parrot
```

### 4. **Add User to Sbuild Group:**

Add your user account to the sbuild system group. This grants you the necessary permissions to execute build jobs with sbuild without needing to use sudo for every operation, which is a safer and more convenient practice. You will need to log out and log back in for this change to take effect. 

``` 
sudo sbuild-adduser $USER
```

## Essential Tools

Here are some of the key tools you will be using during development. Familiarizing yourself with them will significantly improve your workflow.

### dch

The **dch** (debian changelog) command is a utility from devscripts used to edit and manage the **debian/changelog** file. This file is a mandatory part of a Debian package and records all changes. dch helps automate the creation of new entries with the correct version, distribution, timestamp, and formatting, reducing the chance of human error. For example, running dch \-i will create a new "unreleased" entry for you to fill in.

### git-sbuildpkg

**git-sbuildpkg** is a powerful tool that integrates Git with sbuild, streamlining the build process. It allows you to build a package directly from a Git repository, ensuring that the build corresponds exactly to a specific commit or tag. This is fundamental for reproducible builds and for tracking which version of your packaging corresponds to which version of the upstream source code. You can find Parrot's specific configuration and helper tools for it here: [gitlab.com/parrotsec/build/git-sbuildpkg](https://gitlab.com/parrotsec/build/git-sbuildpkg).

### debian/watch & uscan

A **debian/watch** file is a small configuration file you create inside your package's debian/ directory. It contains rules that tell the uscan tool where and how to look for new upstream versions of the software you are packaging. When you run uscan, it reads this file, checks the upstream source (e.g., a GitHub releases page), and can automatically download the new tarball if one is found. This is a powerful and highly recommended way to keep your packages up-to-date with the latest upstream releases.

For more details and examples, refer to the [Debian Wiki on watch files](https://wiki.debian.org/debian/watch).

### sbuild

As mentioned, **sbuild** is used to build Debian packages in a clean, isolated chroot. This practice is the professional standard for package building because it ensures that the build dependencies are correctly declared in the package's control file and that the build isn't accidentally relying on a library you happen to have installed on your own machine. It is the best way to avoid the classic "it works on my machine" problem.

## Managing Chroots

### Creating a Chroot

As shown in the setup section, you can create a chroot with the following command. You can have multiple chroots for different releases or architectures on the same machine.

```
sudo sbuild-createchroot --arch=<architecture\> echo /var/lib/sbuild/echo-<architecture>-sbuild https://deb.parrot.sh/parrot
```

### Troubleshooting: "chroot already exists" Error

If you attempt to create a chroot that is already defined, you will see an error like this:

```
chroot with name echo-<architecture>-sbuild already exists at /usr/bin/sbuild-createchroot line 283, <PH> line 1.
```

To resolve this, you must manually remove all traces of the old, conflicting chroot. Follow these steps carefully, replacing \<architecture\> with the specific architecture of the chroot you need to remove.

#### 1. **Check the chroot directory:** 

Use `schroot -i -c <chroot_name>` to find the exact location of the chroot's filesystem directory.  

```
schroot -i -c echo-<architecture>-sbuild
```

#### 2. **Remove the directory:** 

Delete the directory found in the previous step. This is often located in */var/lib/sbuild/*.

:::warning Warning
    The `rm -rf` command permanently deletes files without confirmation. Double-check that the path is correct.  
:::

```
sudo rm -rf /var/lib/sbuild/echo-<architecture>-sbuild
```

#### 3. **Remove the schroot config:** 

Delete the chroot's main configuration file from */etc/schroot/chroot.d/*

```  
sudo rm /etc/schroot/chroot.d/echo-<architecture>-sbuild.conf
```

#### 4. **Remove the sbuild config:** 

Finally, remove the chroot's configuration from sbuild's specific configuration directory.

```  
sudo rm /etc/sbuild/chroot/echo-<architecture>-sbuild.conf
```  

After these steps, the old chroot configuration is completely gone, and you can re-run the `sbuild-createchroot` command successfully.
