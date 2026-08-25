---
title: "Building packages"
sidebar:
  order: 2
---
This guide covers the process of building a Debian package from a "debianized" source, which is typically managed in a git repository. It focuses on using `sbuild`, a common requirement for supporting multiple architectures like *arm64* and to be sure to compile in a clean environment. Afterwards it would use `git-sbuildpkg` the tool that is used by parrot infrastracture to massively build all tha packages.

Before making changes to a package, it is highly recommended to build it in its original state. This establishes a baseline and ensures that if any problems arise after your modifications, you can be confident that the issue lies with your changes and not the original source or your environment.

This document assumes you have already configured a `schroot` environment for sbuild as detailed in the previous sections of the documentation.

## 1. Download the Original Source Tarball

Before building the Debian package, you need to generate the original upstream source tarball (e.g., `packagename_version.orig.tar.gz`). The `git-buildpackage` suite provides a convenient tool for this.

From the root of your git repository, run the following command:

```
gbp export-orig --verbose --no-pristine-tar
```

### Command Breakdown:

- `gbp export-orig`: This command extracts the upstream source code from your git history (typically from a tag or an upstream branch) and creates a .orig.tar.gz file.
- `--verbose`: Provides detailed output of the process.
- `--no-pristine-tar`: This flag tells gbp to generate the tarball directly from the source tree instead of relying on the `pristine-tar` branch, which stores binary deltas.

After running this command, you will see the `.orig.tar.gz` file in the parent directory.

## 2. Build the Package with sbuild

Once the source tarball is ready, you can proceed with the build using `sbuild`. The following command demonstrates a cross-compilation build for the arm64 architecture targeting the "echo" distribution of Parrot OS.

```
sbuild --arch=arm64 --dist=echo --apt-update --source --force-orig-source --no-run-lintian --no-clean-source -v --chroot=echo-arm64-sbuild -D .
```

### Understanding the Build Flags

#### Cross-Compilation:
- `--arch=arm64`: This flag specifies the target architecture for the package. `sbuild` will set up the build environment accordingly. Inside the chroot, this value is accessible through the `$DEB_HOST_ARCH` environment variable, which build scripts can use to make architecture-specific decisions.
- `--chroot=echo-arm64-sbuild`: Specifies the exact name of the schroot environment to use for the build. This chroot must be configured for the target architecture (arm64) and distribution (lory).

#### Build Environment and Behavior:

- `--dist=echo`: Defines the target distribution codename. sbuild will use the APT sources configured for this distribution inside the chroot to satisfy build dependencies.
- `--apt-update`: Ensures that apt-get update is run inside the chroot before the build starts, guaranteeing the package lists are fresh.
- `--force-orig-source`: Forces sbuild to use the .orig.tar.gz file located in the parent directory, which we created in the previous step.
- `--source`: In addition to binary packages, build the source package (.dsc, .orig.tar.gz, .debian.tar.xz).

#### Development & Debugging:

- `--no-run-lintian`: Skips running `lintian`, a tool that checks packages for policy violations and common errors. This is often disabled during development to speed up iterative builds.
- `--no-clean-source`: Prevents sbuild from cleaning the source tree after the build is complete. This is useful for debugging a failed build, as it leaves the build artifacts in place for inspection.
- `-v`: Enables verbose output.
- `-D .`: (Or `--build-dir=.`) Tells sbuild to perform the build in the current directory.

Upon successful completion, the resulting `.deb` and other package files will be located in the parent directory.

## 3. Alternative: Building with git-sbuildpkg

After you've confirmed the package builds correctly with a manual `sbuild` command, you can use Parrot's helper tool, `git-sbuildpkg`, for a more streamlined workflow. This tool, available at [https://gitlab.com/parrotsec/build/git-sbuildpkg](https://gitlab.com/parrotsec/build/git-sbuildpkg), is a wrapper that automates several steps.

### Advantages of `git-sbuildpkg`:

- Automatic Source Export: It runs the equivalent of `gbp export-orig` for you, so you don't need to perform Step 1 manually.
- Automatic environment creation: It can automatically detect the correct distribution. And create a `schroot` for the architecture you want to build for (if it doesn’t already exist).

### Example Usage:
The command's syntax is `main.sh <path> <branch> <architecture>`.

- The &lt;path&gt; argument is mandatory and points to the root of the git repository you want to build (it can also be a remote url).
- &lt;branch&gt; is the name of the branch of the “debianized” source.

To perform the same *arm64* build, the commands are:

```
cd <path_to_git-sbuildpkg>
./main.sh <path_to_git> debian/latest arm64
```

If no architecture is specified in the command line, *amd64* would be chosen as default.