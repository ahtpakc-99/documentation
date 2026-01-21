---
sidebar_position: 3
---

# Download

ParrotOS is available for download [here](https://parrotsec.org/download/).

The OS also runs on older machines, but it is recommended to consult the system requirements.

## Which version should I choose?

Parrot comes in a lot of shapes and sizes in order to fit all possible hardware and users' needs.

Depending on what hardware configuration and scope you have, consider these options:

### Parrot 7 Security Edition

As the name suggests, this is the full edition.
After the installation you have a complete out of the box pentesting workstation loaded with a large variety of tools ready to use.
Highly recommended for PC Desktops and Laptops with at least 4GB of RAM, for a smooth experience whilst multitasking.

### Parrot 7 Home Edition

This version of Parrot is a lightweight installation which provides the essential tools needed to start working.
It relies on the same repositories as the Full Edition, letting you choose most of the programs you want to install later on.
Recommended for those who are familiar with Pentesting Distros but require a minimal installation.

### Parrot 7 IoT

These are images created specifically for embedded devices, the first board on which Parrot can be installed is the Raspberry Pi versions 3, 4/400 and 5. Other boards will follow in the future.

### Parrot 7 on Docker

Forget all you know about pentesting circumstances. Carrying a laptop everywhere you go to accomplish your job is not mandatory anymore.
You can now have a remote VPS loaded with Parrot OS ready to perform all sort of tasks from an embedded terminal, with discretion. 
This edition does not provide a GUI out of the box, but it's available in the repositories if needed.

[Check it out now](<../containers/parrot-on-docker>)

### Security vs Home Edition: Which one should I choose?

*Parrot Home Edition and Parrot Security Edition are identical, and the only difference between them is the set of software that comes pre-installed*.

Parrot OS Home Edition comes with no security tools, while Parrot OS Security Edition comes with all the hacking and pentest tools pre-installed.

You can use the Home Edition and install only the hacking tools you actually need, or you can install all of them at once with `sudo apt install parrot-tools-full`.