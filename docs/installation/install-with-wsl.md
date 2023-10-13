# Install ParrotOS with WSL

Installing ParrotOS on Windows-Subsystem-Linux(henceforth WSL)

## Installing WSL

If you already have WSL installed on your machine, you can skip this section.

Open up a Powershell as administrator(Right click -> Run As Administrator), and type `wsl --install`, if you see help text, that means you have WSL already installed, otherwise wait for the install to finish.


## Running Parrot WSL

### Manual Install
Download the .zip containing the needed files from [https://www.parrotsec.org/download/](https://www.parrotsec.org/download/), and extract it to a folder.

Double click launcher.exe and the installation window will pop up.

First, enter `y` or `n` to choose to install all the security tools,, or just the base image(this can be done later).
Next, enter your username & password for your user account.

![1](./images/wsl/install.gif)

Congrats, you now have a working WSL instance!


### Windows Store
Coming soon....
