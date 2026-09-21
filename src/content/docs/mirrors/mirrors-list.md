---
title: "Mirrors"
description: The Parrot mirror network, the default APT configuration and the list of official mirrors.
sidebar:
  order: 1
---

The Parrot Project not only delivers a ready-to-use system in the ISO format, but it also provides a vast amount of additional software that can be installed apart from the official parrot repository.

The Parrot repository is used to provide officially supported software, system updates and security fixes.

## The mirrors network

The software in the parrot archive is delivered in form of deb packages, and these packages are served through a vast network of mirror servers that provide the same set of packages distributed all around the world for faster software delivery.

The Parrot system is configured to use the central parrot archive directors. The Parrot directors are special servers that collect all the requests of the end users and redirect them to the geographically nearest download server available for the user who made the request.

If you want and can, you can make your own mirror for Parrot following [this procedure](../make-mirror/).

## Security measures

The Parrot Mirror Network is secured by centralized digital signatures and the mirrors can't inject fake updates.

If an evil mirror tries to inject a fake package, the Parrot system will automatically refuse to download and install it, and will raise an alert message.

This security measure implemented in APT (the Parrot/Debian package manager) is very efficient and reliable because digital signatures are applied offline by the Parrot archive maintainer, and not by the mirror servers, ensuring direct and secure developer-to-user chain of trust.

## Configuration and custom setup

The APT package manager uses `/etc/apt/sources.list` and any _.list_ file found in the `/etc/apt/sources.list.d/` directory.

:::note[Note]
/etc/apt/sources.list is EMPTY and the default APT configuration is located at **/etc/apt/sources.list.d/parrot.list**
:::

### Content of /etc/apt/sources.list.d/parrot.list

```text
deb https://deb.parrot.sh/parrot echo main contrib non-free non-free-firmware
deb https://deb.parrot.sh/direct/parrot echo-security main contrib non-free non-free-firmware
deb https://deb.parrot.sh/parrot echo-backports main contrib non-free non-free-firmware
#deb-src https://deb.parrot.sh/parrot echo main contrib non-free non-free-firmware
#deb-src https://deb.parrot.sh/parrot echo-security main contrib non-free non-free-firmware
#deb-src https://deb.parrot.sh/parrot echo-backports main contrib non-free non-free-firmware
```

:::caution
`echo-security` deliberately points at `deb.parrot.sh/direct`, not at a mirror. A mirror can lag behind the archive, which would leave you without a security update for a window outside our control. Configure mirrors for `echo`, `echo-backports` and `echo-updates` only.
:::

### Updates/Testing purpose

The 'echo-updates' repository provides updates before they are made available
to 'echo'. This repo is mostly meant to be used by developers and beta testers
to extensively test updates before they are migrated to the main repository.

We suggest to not enable it, as it may introduce untested bugs and make the
system unstable. Updates are delivered as fast as possible (within a week),
so you are not missing anything important with this disabled (unless you are a dev):

```text
deb https://deb.parrot.sh/parrot echo-updates main contrib non-free non-free-firmware
```

## Other mirrors for manual configuration

### Worldwide (CDN)

| Mirror ID<br />bandwidth (per node) |     Provider Name     | URL                                                            | APT config string                                                                             |
| :---------------------------------- | :-------------------: | :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| parrot<br />1 Gbps                  | Parrot Infrastructure | [deb.parrot.sh/parrot](https://deb.parrot.sh/parrot)           | <sub>deb https://deb.parrot.sh/parrot echo main contrib non-free non-free-firmware</sub>      |
| bunny<br />10/80 Gbps               |       Bunny.net       | [bunny.deb.parrot.sh](https://bunny.deb.parrot.sh)             | <sub>deb https://bunny.deb.parrot.sh echo main contrib non-free non-free-firmware</sub>       |
| alibaba<br />10 Gbps                |     Alibaba Cloud     | [mirrors.aliyun.com/parrot](https://mirrors.aliyun.com/parrot) | <sub>deb https://mirrors.aliyun.com/parrot echo main contrib non-free non-free-firmware</sub> |

### NCSA (North Central and South Americas)

| Location<br />Mirror ID<br />bandwidth  |                         Provider Name                         | URL                                                                                    | APT config string                                                                                         |
|:----------------------------------------|:-------------------------------------------------------------:|:---------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------|
| Massachusetts<br />MIT<br />1 Gbps      |                           SIPB MIT                            | [mirrors.mit.edu/parrot](http://mirrors.mit.edu/parrot/)                               | <sub>deb http://mirrors.mit.edu/parrot/ echo main contrib non-free non-free-firmware</sub>                |
| New York<br />Clarkson<br />1 Gbps      |                      Clarkson University                      | [mirror.clarkson.edu/parrot](https://mirror.clarkson.edu/parrot/)                      | <sub>deb https://mirror.clarkson.edu/parrot/ echo main contrib non-free non-free-firmware</sub>           |
| New Jersey<br />Princeton<br />1 Gbps   |                     Princeton University                      | [mirror.math.princeton.edu/pub/parrot/](https://mirror.math.princeton.edu/pub/parrot/) | <sub>deb https://mirror.math.princeton.edu/pub/parrot/ echo main contrib non-free non-free-firmware</sub> |
| Oregon<br />Osuosl<br />1 Gbps          |           Oregon State University - Open Source Lab           | [ftp.osuosl.org/pub/parrotos](https://ftp.osuosl.org/pub/parrotos)                     | <sub>deb https://ftp.osuosl.org/pub/parrotos echo main contrib non-free non-free-firmware</sub>           |
| California<br />Berkeley<br />1 Gbps    |               Berkeley Open Computing Facility                | [mirrors.ocf.berkeley.edu/parrot](http://mirrors.ocf.berkeley.edu/parrot)              | <sub>deb https://mirrors.ocf.berkeley.edu/parrot/ echo main contrib non-free non-free-firmware</sub>      |
| California<br />mirrors.cicku.me<br />/ |                        CloudFlare Inc.                        | [mirrors.cicku.me/parrot/](https://mirrors.cicku.me/parrot/)                           | <sub>deb https://mirrors.cicku.me/parrot/ echo main contrib non-free non-free-firmware</sub>              |
| Ecuador<br />CEDIA<br />100 Mbps        | RED CEDIA (National research and education center of Ecuador) | [mirror.cedia.org.ec/parrot](http://mirror.cedia.org.ec/parrot)                        | <sub>deb https://mirror.cedia.org.ec/parrot/ echo main contrib non-free non-free-firmware</sub>           |
| Ecuador<br />UEB<br />100 Mbps          |             UEB (Universidad Estatal de Bolivar)              | [mirror.ueb.edu.ec/parrot](http://mirror.ueb.edu.ec/parrot)                            | <sub>deb https://mirror.ueb.edu.ec/parrot/ echo main contrib non-free non-free-firmware</sub>             |
| Ecuador<br />Linux Ecuador<br />/       |                         Linux Ecuador                         | [mirror.linux.ec/parrot](https://mirror.linux.ec/parrot)                               | <sub>deb https://mirror.linux.ec/parrot/ echo main contrib non-free non-free-firmware</sub>               |
| Brazil<br />USP<br />1 Gbps             |                    University of Sao Paulo                    | [sft.if.usp.br/parrot](http://sft.if.usp.br/parrot)                                    | <sub>deb http://sft.if.usp.br/parrot/ echo main contrib non-free non-free-firmware</sub>                  |

### EMEA (Europe Middle East and Africa)

| Location<br />Mirror ID<br />bandwidth        |                          Provider Name                          | URL                                                                                                                             | APT config string                                                                                                               |
|:----------------------------------------------|:---------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| Italy<br />GARR<br />100 Gbps                 |     GARR Consortium (Italian Research & Education Network)      | [parrot.mirror.garr.it/parrot](https://parrot.mirror.garr.it/parrot)                                                            | <sub>deb https://parrot.mirror.garr.it/parrot echo main contrib non-free non-free-firmware</sub>                                |
| England<br />VineHost<br />1 Gbps             |                     VineHost (vinehost.net)                     | [mirror.vinehost.net/parrot](https://mirror.vinehost.net/parrot)                                                                | <sub>deb https://mirror.vinehost.net/parrot echo main contrib non-free non-free-firmware</sub>                                  |
| Germany<br />Diyar Ciftci<br />1 Gbps         |                     Diyar Ciftci (Hetzner)                      | [mirror.diyarciftci.xyz/parrot](https://mirror.diyarciftci.xyz/parrot)                                                          | <sub>deb https://mirror.diyarciftci.xyz/parrot/ echo main contrib non-free non-free-firmware</sub>                              |
| Germany<br />Halifax<br />20 Gbps             |              RWTH-Aachen (Halifax students group)               | [ftp.halifax.rwth-aachen.de/parrotsec](http://ftp.halifax.rwth-aachen.de/parrotsec)                                             | <sub>deb https://ftp.halifax.rwth-aachen.de/parrotsec/ echo main contrib non-free non-free-firmware</sub>                       |
| Germany<br />Esslingen<br />10 Gbps           |           Esslingen (University of Applied Sciences)            | [ftp-stud.hs-esslingen.de/pub/Mirrors/archive.parrotsec.org](http://ftp-stud.hs-esslingen.de/pub/Mirrors/archive.parrotsec.org) | <sub>deb https://ftp-stud.hs-esslingen.de/pub/Mirrors/archive.parrotsec.org/ echo main contrib non-free non-free-firmware</sub> |
| Germany<br />pyratelan<br />/                 |                            pyratelan                            | [mirror.pyratelan.org/parrot](https://mirror.pyratelan.org/parrot)                                                              | <sub>deb https://mirror.pyratelan.org/parrot echo main contrib non-free non-free-firmware</sub>                                 |
| Netherlands<br />Vuln Seeker<br />1 Gbps      |                      Vuln Seeker (Hetzner)                      | [https://mirror.vulnseeker.org/pub/parrot/](https://mirror.vulnseeker.org/pub/parrot/)                                          | <sub>deb https://mirror.vulnseeker.org/pub/parrot/ echo main contrib non-free non-free-firmware</sub>                           |
| Netherlands<br />NLUUG<br />10 Gbps           |                              Nluug                              | [ftp.nluug.nl/os/Linux/distr/parrot](http://ftp.nluug.nl/os/Linux/distr/parrot)                                                 | <sub>deb https://ftp.nluug.nl/os/Linux/distr/parrot/ echo main contrib non-free non-free-firmware</sub>                         |
| Netherlands<br />lyrahosting<br />/           |                           lyrahosting                           | [mirror.lyrahosting.com/parrot](https://mirror.lyrahosting.com/parrot)                                                          | <sub>deb https://mirror.lyrahosting.com/parrot echo main contrib non-free non-free-firmware</sub>                               |
| Netherlands<br />koetsier<br />/              |                            Koetsier                             | [mirror.koetsier.org/parrot/](https://mirror.koetsier.org/parrot/)                                                              | <sub>deb https://mirror.koetsier.org/parrot/ echo main contrib non-free non-free-firmware</sub>                                 |
| Sweden<br />ACC<br />200 Gbps                 |                 Academic Computer Club in Umeå                  | [mirror.accum.se/mirror/parrotsec.org/parrot](http://mirror.accum.se/mirror/parrotsec.org/parrot)                               | <sub>deb https://mirror.accum.se/mirror/parrotsec.org/parrot/ echo main contrib non-free non-free-firmware</sub>                |
| Sweden<br />bahnhof.net<br />10 Gbps          |                          Bahnhof Cloud                          | [https://mirror.bahnhof.net/pub/parrot/](https://mirror.bahnhof.net/pub/parrot/)                                                | <sub>deb https://mirror.bahnhof.net/pub/parrot/ echo main contrib non-free non-free-firmware</sub>                              |
| Sweden<br />itdetektiven.se<br />1 Gbps       |                          it-detektiven                          | [https://parrot.midvault.nu/](https://parrot.midvault.nu/)                                                                      | <sub>deb https://parrot.midvault.nu/ echo main contrib non-free non-free-firmware</sub>                                         |
| Finland<br />ClientVPS<br />1 Gbps            |                            ClientVPS                            | [https://mirror.clientvps.com/parrot/](https://mirror.clientvps.com/parrot/)                                                    | <sub>deb https://mirror.clientvps.com/parrot/ echo main contrib non-free non-free-firmware</sub>                                |
| Greece<br />UOC<br />1 Gbps                   |           UoC (University of Crete - Computer Center)           | [ftp.cc.uoc.gr/mirrors/linux/parrot](http://ftp.cc.uoc.gr/mirrors/linux/parrot)                                                 | <sub>deb https://ftp.cc.uoc.gr/mirrors/linux/parrot/ echo main contrib non-free non-free-firmware</sub>                         |
| Belgium<br />Belnet<br />10 Gbps              |             Belnet (The Belgian National Research)              | [ftp.belnet.be/archive.parrotsec.org](http://ftp.belnet.be/mirror/archive.parrotsec.org)                                        | <sub>deb http://ftp.belnet.be/mirror/archive.parrotsec.org/ echo main contrib non-free non-free-firmware</sub>                  |
| Spain<br />elhacker.net<br />1 Gbps           |   Desde 2001. Tecnología, seguridad, informática con Noticias   | [parrot.elhacker.net](https://parrot.elhacker.net/)                                                                             | <sub>only ISO files are mirrored</sub>                                                                                          |
| Spain<br />Osluz<br />1 Gbps                  | Osluz (Oficina de software libre de la Universidad de Zaragoza) | [matojo.unizar.es/parrot](http://matojo.unizar.es/parrot)                                                                       | <sub>deb http://matojo.unizar.es/parrot/ echo main contrib non-free non-free-firmware</sub>                                     |
| Bulgaria<br />Telepoint<br />40 Gbps          |                      Telepoint Colocation                       | [mirror.telepoint.bg/parrot](https://mirror.telepoint.bg/parrot)                                                                | <sub>deb https://mirror.telepoint.bg/parrot echo main contrib non-free non-free-firmware</sub>                                  |
| Denmark<br />Dotsrc<br />10 Gbps              |                   Dotsrc (Aalborg university)                   | [mirrors.dotsrc.org/parrot](http://mirrors.dotsrc.org/parrot)                                                                   | <sub>deb https://mirrors.dotsrc.org/parrot/ echo main contrib non-free non-free-firmware</sub>                                  |
| Estonia<br />cspacehosting<br />/             |                          cspacehosting                          | [mirror.cspacehostings.com/parrotsec](https://mirror.cspacehostings.com/parrotsec)                                              | <sub>deb https://mirror.cspacehostings.com/parrotsec echo main contrib non-free non-free-firmware</sub>                         |
| Turkey, Denizli<br />Verinomi<br />10 Gbps    |                            Verinomi                             | [mirror.verinomi.com/parrot/](https://mirror.verinomi.com/parrot/)                                                              | <sub>deb https://mirror.verinomi.com/parrot/ echo main contrib non-free non-free-firmware</sub>                                 |
| Russia<br />Yandex<br />1 Gbps                |                             Yandex                              | [mirror.yandex.ru/mirrors/parrot](http://mirror.yandex.ru/mirrors/parrot)                                                       | <sub>deb https://mirror.yandex.ru/mirrors/parrot/ echo main contrib non-free non-free-firmware</sub>                            |
| Russia<br />Truenetwork<br />10 Gbps          |                           Truenetwork                           | [mirror.truenetwork.ru/parrot](http://mirror.truenetwork.ru/parrot)                                                             | <sub>deb https://mirror.truenetwork.ru/parrot/ echo main contrib non-free non-free-firmware</sub>                               |
| Russia<br />repository.su<br />/              |                          repository.su                          | [repository.su/parrot](https://repository.su/parrot)                                                                            | <sub>deb https://repository.su/parrot echo main contrib non-free non-free-firmware</sub>                                        |
| Azerbaijan<br />YER Hosting<br />10 Gbps      |                       YER Hosting (Baku)                        | [mirror.yer.az/parrot/](https://mirror.yer.az/parrot/)                                                                          | <sub>deb https://mirror.yer.az/parrot/ echo main contrib non-free non-free-firmware</sub>                                       |
| Azerbaijan<br />ourhost.az<br />10 Gbps       |             OUR Host - Azerbaijan Hosting Provider              | [mirror.ourhost.az/parrot](https://mirror.ourhost.az/parrot/)                                                                   | <sub>deb https://mirror.ourhost.az/parrot echo main contrib non-free non-free-firmware</sub>                                    |
| Serbia<br />Serbia Open Exchange<br />50 Gbps |                      Serbia Open Exchange                       | [mirror1.sox.rs/parrot/](https://mirror1.sox.rs/parrot/)                                                                        | <sub>deb https://mirror1.sox.rs/parrot/ echo main contrib non-free non-free-firmware</sub>                                      |

### APAC (Asia and Pacific)

| Location<br />Mirror ID<br />bandwidth                                  |                       Provider Name                       | URL                                                                                  | APT config string                                                                                        |
|:------------------------------------------------------------------------|:---------------------------------------------------------:|:-------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------|
| Taiwan<br />NCHC<br />20 Gbps                                           |                 NCHC (Free Software Lab)                  | [free.nchc.org.tw/parrot](http://free.nchc.org.tw/parrot)                            | <sub>deb http://free.nchc.org.tw/parrot/ echo main contrib non-free non-free-firmware</sub>              |
| Japan<br />hashy0917/SDCC<br />10 Gbps                                  |                           SDCC                            | [https://mirror.hashy0917.net/parrot](https://mirror.hashy0917.net/parrot)           | <sub>deb https://mirror.hashy0917.net/parrot/ echo main contrib non-free non-free-firmware</sub>         |
| China<br />USTC<br />1Gbps CMCC<br />1Gbps Cernet<br />300Mbps ChinaNet | University of Science and Technology of China and USTCLUG | [mirrors.ustc.edu.cn/parrot](http://mirrors.ustc.edu.cn/parrot)                      | <sub>deb http://mirrors.ustc.edu.cn/parrot echo main contrib non-free non-free-firmware</sub>            |
| China<br />TUNA<br />2 Gbps                                             |  TUNA (Tsinghua university of Beijing, TUNA association)  | [mirrors.tuna.tsinghua.edu.cn/parrot](http://mirrors.tuna.tsinghua.edu.cn/parrot)    | <sub>deb https://mirrors.tuna.tsinghua.edu.cn/parrot/ echo main contrib non-free non-free-firmware</sub> |
| China<br />SJTUG<br />2 Gbps                                            |               SJTUG (SJTU \*NIX User Group)               | [mirrors.sjtug.sjtu.edu.cn/parrot](http://mirrors.sjtug.sjtu.edu.cn/parrot)          | <sub>deb https://mirrors.sjtug.sjtu.edu.cn/parrot/ echo main contrib non-free non-free-firmware</sub>    |
| Thailand<br />Lagoon<br />1 Gbps                                        |                KKU (Khon Kaen University)                 | [mirror.kku.ac.th/parrot](http://mirror.kku.ac.th/parrot)                            | <sub>deb https://mirror.kku.ac.th/parrot/ echo main contrib non-free non-free-firmware</sub>             |
| Indonesia<br />Datautama<br />1 Gbps                                    |            Datautama (PT. Data Utama Dinamika)            | [kartolo.sby.datautama.net.id/parrot](http://kartolo.sby.datautama.net.id/parrot)    | <sub>deb http://kartolo.sby.datautama.net.id/parrot/ echo main contrib non-free non-free-firmware</sub>  |
| India<br />NxtGen<br />1 Gbps                                           |          NxtGen DataCenter & Cloud Technologies           | [https://mirrors.nxtgen.com/parrot-mirror](https://mirrors.nxtgen.com/parrot-mirror) | <sub>deb https://mirrors.nxtgen.com/parrot-mirror echo main contrib non-free non-free-firmware</sub>     |
| Vietnam, Ha Noi (APAC region) <br/>1 Gbps                               |                          MeowSMP                          | [mirror.meowsmp.net/parrot](https://mirror.meowsmp.net/parrot/)                      | <sub>deb https://mirror.meowsmp.net/parrot/ echo main contrib non-free non-free-firmware</sub>           |
