---
title: "Docker usages and examples"
sidebar_position: 2
---

## Launch a container

```bash
docker run --name pcore-1 -ti parrotsec/core
```

:::note[Note]
  The `pcore-1` name is arbitrary and can be customized.
:::

## Stop the container

```bash
docker stop pcore-1
```

## Resume a previously stopped container

```bash
docker start pcore-1
```

## Remove a container after use

```bash
docker rm pcore-1
```

## List all instantiated containers

```bash
docker ps -a
```

## Start multiple containers

**Terminal 1:**

```bash
docker run --name pentest1 -ti parrotsec/security
```

**Terminal 2:** ```bash
docker run --name pentest2 -ti parrotsec/security
```

**Terminal 3:** ```bash
docker run --name msf-listener -ti parrotsec/metasploit
```

### Remove all containers

```bash
docker rm $(docker ps -qa)
```

### Start a container and automatically remove it on exit

```bash
docker run --rm -ti parrotsec/core
```

## Use Volumes to share files with the host

It is a good practice not to keep persistent Docker containers, but rather to remove them after every use and ensure important files are saved on a Docker volume.

The following command creates a `work` folder inside the current directory and mounts it to `/work` inside the container.

```bash
docker run --rm -ti -v $PWD/work:/work parrotsec/core
```

### Use Volumes to share files across multiple containers

**Terminal 1:**

```bash
docker run --name pentest -ti -v $PWD/work:/work parrotsec/security
```

**Terminal 2:** ```bash
docker run --rm --network host -v $PWD/work:/work -ti parrotsec/security
```

**Terminal 3:** ```bash
docker run --rm -v $PWD/work:/work -ti parrotsec/metasploit
```

## Networking

### Open a port from the container to the host

Every Docker container has its own network space connected to a virtual LAN.

All the traffic from within the Docker container will be NATed by the host computer.

If you need to expose a port to other machines outside your local computer, use the following example:

```bash
docker run --rm -p 8080:80 -ti parrotsec/core
```

Note that the first port is the port that will be opened on your host, and the second one is the container port to bind to.

Here is a reference for using the `-p` flag:

```bash
-p <host port>:<container port> (e.g. -p 8080:80)
```

```bash
-p <host port>:<container port>/<protocol> (e.g. -p 8080:80/tcp)
```

In case of multiple addresses on the host network:

```bash
-p <address>:<host port>:<container port> (e.g. -p 192.168.1.30:8080:80)
```

### Use network host instead of Docker NAT

If you need to make the Docker container share the same networking space as the host machine, use the `--network host` flag as shown below:

```bash
docker run --rm --network host -ti parrotsec/core
```

:::note[Note]
  * Every port opened in the container will be opened on the host as well.
  * You can perform packet sniffing on the host network.
  * `iptables` rules applied inside the container will take effect on the host as well.
:::