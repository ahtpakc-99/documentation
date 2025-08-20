# (Apple) container

During the latest WWDC (2025), Containerization was announced and released,
a software that “[executes each Linux container inside of its own lightweight virtual machine](https://github.com/apple/containerization?tab=readme-ov-file#design)”
on Apple Silicon processors, starting from MacOS 15 **Sequoia** and MacOS 26 **Tahoe**. 

Through Containerization, we have another way to [manage OCI‑compatible images](https://github.com/apple/containerization/tree/main/Sources/ContainerizationOCI); 
as a result, we can also use **Parrot’s Docker images**.

Why? Because our Docker images are _OCI‑compliant_, so we can use them without any issues.

## Install `container`

`container` is a CLI tool that allows us to use the Containerization APIs to create and manage these images. 
It’s recommended to update MacOS to the latest stable version to ensure you can use `container`. 

Although it can be installed directly from the [GitHub Releases page](https://github.com/apple/container/releases),
it’s also possible to use Homebrew for the installation:

```
$ brew install --cask container
```
```
$ container
OVERVIEW: A container platform for macOS

USAGE: container [--debug] <subcommand>

OPTIONS:
  --debug                 Enable debug output [environment: CONTAINER_DEBUG]
  --version               Show the version.
  -h, --help              Show help information.

CONTAINER SUBCOMMANDS:
  create                  Create a new container
  delete, rm              Delete one or more containers
  exec                    Run a new command in a running container
  inspect                 Display information about one or more containers
  kill                    Kill one or more running containers
  list, ls                List containers
  logs                    Fetch container stdio or boot logs
  run                     Run a container
  start                   Start a container
  stop                    Stop one or more running containers

IMAGE SUBCOMMANDS:
  build                   Build an image from a Dockerfile
  images, image, i        Manage images
  registry, r             Manage registry configurations

SYSTEM SUBCOMMANDS:
  builder                 Manage an image builder instance
  system, s               Manage system components
```

Then you can start the system service with the command below:

```
$ container system start
```

Running this command starts the container server. 

If a default kernel isn’t already installed,
it will be installed automatically (the default kernel shown is provided by [Kata Containers](https://github.com/kata-containers/kata-containers), 
a lightweight virtual machine solution for running containers).

## Use ParrotOS containers on Apple Silicon

The commands are very similar to Docker/Podman: 
`container list --all` will display all containers, `build` allows you to create custom images, and so on.

As we mentioned earlier, we can also use ParrotOS Docker images on `container`, 
and since the commands are the same, we can start a ParrotOS container simply by typing:

```
$ container run --rm -it parrotsec/core
```

or

```
$ container run --rm -it parrotsec/security
```

## Technical Overview

For more information, see the [container technical overview](https://github.com/apple/container/blob/main/docs/technical-overview.md).