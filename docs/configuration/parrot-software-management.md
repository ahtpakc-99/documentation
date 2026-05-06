---
sidebar_position: 1
---

# Parrot Software Management

In this chapter, we will introduce the **apt** package manager for Parrot. A program is a series of instructions written in programming languages such as C, Go, Nim or Rust (to name a few). These instructions are stored in text files called sources. To work in our systems, they must be converted to machine language. This step is called compilation. The compilation generates one or several files, understandable by the system, called binaries.

The user does not need to compile the sources of each program as the developers are responsible for compiling and generating the respective binaries. A program can carry not only the executable but a series of files. The developers combine such software into a file called a package. Two of the most well-known are **.rpm** packages and **.deb** packages. **.rpm** was developed by Red Hat and **.deb** by Debian. Parrot uses the **.deb** format.

To compile programs, often 3rd party libraries and other programs are necessary. If we tried to compile a program that had dependencies with other libraries and other programs, we would install these "dependencies" before its compilation. Likewise, if we want to install a binary we will need to have installed the necessary dependencies for its correct operation.

To manage these dependencies and the *package* installation, package managers have been created. There are numerous package managers, some graphical and others via the command line. In this chapter, we will see one of the most famous, created by the Debian developers, and the one used by Parrot: **apt**.

The main functions of a package manager must be:

- Software searching
- Software installation
- Software update
- System update
- Dependency management
- Software removal

The package manager must check in a given location (it can be a local directory or a network address) for the availability of such software. The locations are called repositories. The system maintains configuration files to check repository locations.

## List of Repositories

Although in Parrot it is not necessary (nor recommended) to add new repositories or modify existing ones, we will see where we can configure them. In the file system, under the path */etc/apt/sources.list.d*, we find the file **parrot.list**. The content of this file should be:

```bash
## stable repository
deb https://deb.parrot.sh/parrot echo main contrib non-free non-free-firmware
```

With this, we make sure we have the correct repository list. In this location the Parrot developers keep the packages updated.

## Package Manager

The Parrot package manager is **apt**. Amongst other things, this manager is responsible for installing packages, checking dependencies, and updating the system. Let's see what we can do with it. We will see the most common options below. For more in-depth instructions, view the man pages for each of the following commands: *apt*, *apt-cache*, *dpkg*, etc...

Search for a package or text string:

```bash
apt search <package/text_string>
```

Show package information:

```bash
apt show <package>
```

Show package dependencies:

```bash
apt depends <package>
```

Show the names of all the packages installed in the system:

```bash
apt list --installed
```
    
Install a package (requires root privileges):

```bash
sudo apt install <package>
```

Uninstall a package:

```bash
sudo apt remove <package>
```

Delete a package including its configuration files:

```bash
sudo apt purge <package>
```

Delete automatically those packages that are not being used (be careful with this command, due to complex dependency trees, it might occasionally remove packages you still need): 

```bash
sudo apt autoremove
```

Update the repositories information:

```bash
sudo apt update
```

Update a specific package to the last available version in the repository:

```bash
sudo apt upgrade <package>
```
    
Update the full distribution. It will update our system to the next available version:

:::warning
It is highly recommended to use `parrot-upgrade` to update the entire system. `parrot-upgrade` is a custom wrapper that automatically executes the appropriate `apt` commands with the correct parameters, ensuring your system dependencies are safely managed during rolling updates.
:::

```bash
sudo parrot-upgrade
```

Clean caches, downloaded packages, etc.:

```bash
sudo apt clean && sudo apt autoclean
```

These are just some examples. If more information is required, you should check the manual page (`man apt`).