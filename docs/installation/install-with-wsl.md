# WSL Edition

Installing ParrotOS on WSL (Windows Subsystem for Linux)

Compatible with the latest versions of **Windows 10** and **Windows 11**.

Currently, only the Core Edition is available. 
A complete Security Edition will probably be released in the future.

Anyway, any tool from the Security Edition can be installed using `apt`.

## Installing WSL

If you already have WSL installed on your machine, *you can skip this section*.

Open up a Powershell/Terminal as administrator (Right click -> Run As Administrator), and type `wsl --install`. 

If you see help text, that means you have WSL already installed, otherwise wait for the install to finish.

## Running ParrotOS WSL

### Manual Install

Download the `.wsl` file containing the needed files from [the ParrotOS website](https://www.parrotsec.org/download/).

![Download ParrotOS on Windows](./images/wsl/download_wsl.png)

Double click `parrot-core_7.wsl` and an installation window will pop up.

Now, enter your username and password for your user account.

![2](./images/wsl/configuration.gif)

Your WSL "Hard Drive" will be created as a `.vdhx` in the folder you create the launcher from.

All updates can be performed via a standard `apt` upgrade/update. However, if you wish to rerun the installer, you must run `wsl --unregister parrot`, and rerun the `.wsl`

Congrats, you now have a working ParrotOS WSL instance!

### Microsoft Store

Coming soon...

## Troubleshooting

Packages requiring SystemD(i.e. Powershell Empire) are not working on default installs.

This can be fixed however, by editing /etc/wsl.conf and adding
```yaml
[boot]
systemd=true
```

And restarting your wsl instance.

## Unknown Issues

Please open an issue in [The WSL Gitlab Project](https://gitlab.com/parrotsec/build/wsl) for any bugs you encounter.
