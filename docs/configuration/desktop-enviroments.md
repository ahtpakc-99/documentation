---
sidebar_position: 7
---

# Desktop Enviroments

ParrotOS comes out with the **default MATE Desktop Environment (DE)** for all editions (Home, Security and HTB). However, additional desktop environments can be installed on an OS. Each DE has its own characteristics, but we recommend that you try them all before deciding what to install.

Since the DE is a graphical interface through which the user interacts with the operating system, there are many ways to modify its various components.

Each of the following DE (all available in our repository) offers the possibility to customize it to your liking:

* **MATE**
* **XFCE**
* **GNOME**
* **KDE**

:::info

  If you prefer a window manager instead of a DE, we have added a metapackage to our repository for installing [**i3**](https://i3wm.org/).

:::

The differences between the DEs mainly concern the graphical interface, all software is available from the Parrot repositories regardless of the DE used.

![Available DE](./images/DE/de2.png)

## Install a Desktop Enviroment

To install a DE, simply type in the terminal:

```
sudo apt update && sudo apt install parrot-desktop-<desktop environment>
```

then restart your computer. 

In the login session, you can change the DE by clicking on the white dot ⚪️ (this is the *default session*) and changing the DE. You can now use the newly installed DE with all the tools and configurations you had before.

![Switch DE](./images/DE/de0.jpg)

:::note

  You can install more than one DE, but considering the amount of packages, it is recommended that you keep only one or at most two DEs in order to avoid conflicts.

:::

![Multiple DE](./images/DE/de1.png)
