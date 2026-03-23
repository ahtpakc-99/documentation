---
sidebar_position: 1
---

# Docker Images

Docker is a powerful technology that allows users to run containers universally on any host platform.

Docker uses template images, and allows the user to start several instances of the same template, destroy them, or build new custom templates on top of them.

Parrot uses Docker to allow its users to take advantage of its vast arsenal of tools on any platform supported by Docker.

[Parrot Core](#parrotseccore) | [Parrot Security](#parrotsecsecurity)

[Nmap](#parrotsecnmap) | [Metasploit](#parrotsecmetasploit) | [Social Engineering Toolkit](#parrotsecset) | [Beef-XSS](#parrotsecbeef) | [Bettercap](#parrotsecbettercap) | [SQLMap](#parrotsecsqlmap)

[Skip to usage examples](general-usage-docker.md)

## Available Templates

Whether you want to have a container full of tools, several smaller containers with a tiny selection of tools, or even a clean Parrot environment to build your custom stack on, this is the right place to learn how to take advantage of the Parrot Docker workspace.

### parrotsec/core

Core system with just the Parrot basics. You can use it as a starting point to create your custom containers.

This image is multiarch, and works for `amd64`, `arm64`, and `armhf` architectures.

**Launch the container:**

```bash
docker run --rm -ti --network host -v $PWD/work:/work parrotsec/core
```

### parrotsec/security

This container includes a huge collection of tools that can be used via the command line from inside a Docker container.

Some tools with graphical interfaces were excluded for obvious reasons.

This container ships with the following metapackages:
* `parrot-cloud`

**Launch the container:**

```bash
docker run --rm -ti --network host -v $PWD/work:/work parrotsec/security
```

## Individual Parrot Tools

This is a curated selection of smaller Docker containers that contain only specific tools, either alone or in cherry-picked collections.

Containers with shared tools are stacked on top of each other (when possible) to minimize storage waste and maximize layer reuse.

### parrotsec/nmap

**Based on:** `parrotsec/core`  
**Provides the following packages:**
* `nmap`
* `ncat`
* `ndiff`
* `dnsutils`
* `netcat`
* `telnet`

**Usage:**

```bash
docker run --rm -ti parrotsec/nmap <nmap options>
```

**Examples:**

```bash
docker run --rm -ti parrotsec/nmap -F 192.168.1.1
```
```bash
docker run --rm -ti parrotsec/nmap -Pn 89.36.210.176
```

### parrotsec/metasploit

**Based on:** `parrotsec/nmap:latest`  
**Provides the following packages:**
* `nmap`
* `metasploit-framework`
* `postgresql`

**Usage:**

```bash
docker run --rm -ti --network host -v $PWD/msf:/root/ parrotsec/metasploit
```

### parrotsec/set

**Based on:** `parrotsec/metasploit:latest`  
**Provides the following packages:**
* `set`

**Usage:**

```bash
docker run --rm -ti --network host -v $PWD/set:/root/.set parrotsec/set
```

### parrotsec/beef

**Based on:** `parrotsec/core`  
**Provides the following packages:**
* `beef-xss`

**Usage:**

```bash
docker run --rm --network host -ti -v $PWD/beef:/var/lib/beef-xss parrotsec/beef
```

### parrotsec/bettercap

**Based on:** `parrotsec/nmap`  
**Provides the following packages:**
* `bettercap`

**Usage:**

```bash
docker run --rm -ti --network host parrotsec/bettercap
```

### parrotsec/sqlmap

**Based on:** `parrotsec/nmap`  
**Provides the following packages:**
* `sqlmap`

**Usage:**

```bash
docker run --rm -ti parrotsec/sqlmap <sqlmap options>
```

**Example:**

```bash
docker run --rm -ti parrotsec/sqlmap -u parrotsec.org --wizard
```