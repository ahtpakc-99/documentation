---
title: "Community Contributions"
description: How to contribute to ParrotOS, from packaging and documentation to the website and ARM images.
sidebar:
  order: 4
---

Parrot was born and continues to be a fully open-source project. 
This means that anyone can see the code of each of its components and, if interested, modify it.

That is why, if you like the world of open source and in particular the Parrot project, you are strongly invited to 
contribute. Here you will find a guide on how to proceed and on which projects you can currently contribute.

No matter how technically skilled you are in a certain area, you will see that you can contribute in various ways depending 
on the Parrot sub-project. Any motivated and useful contribution is always more than welcome. In any case, someone from 
the [team](https://parrotsec.org/team/) will be alongside you in order to discuss it together.

At present, all Debian packages and all tools developed by the Parrot team reside on [GitLab](https://gitlab.com/parrotsec) 
and [GitHub](https://github.com/parrotsec) (as a backup mirror).

## Why should you be a contributor?

Being a contributor for an open-source project means that you have the chance to:

- <b>Meet new people</b>: You will be able to meet a lot of developers like you, who are in love with the world of open-source projects. This will not only help you to expand your network from a professional point of view, but also to develop real and true friendships;
- <b>Learn and teach new things</b>: The first rule of a contributor is "never get stuck on what you already know". It doesn't matter if you're a newbie or a senior developer, if you start contributing to an open-source project you can learn a lot of new things or, conversely, get the chance to teach new things to other people (this will boost your confidence a lot, trust us); 
- <b>Make your work worth it</b>: You will get the chance to test in advance some of our packages and, in the best-case scenario, your work will be built into Parrot Security OS. 

## Working on a Parrot sub-project

Since we mainly work on GitLab, it will be important that you have a registered GitLab account, you will need it to start
contributing. Then, once you have chosen the sub-project, contact the Parrot team at the email team@parrotsec.org, specifying
the chosen sub-project and the part in which you want to contribute.

This list will be updated, but it is now possible to contribute to the following sub-projects:

* Website
* Documentation
* Debian Packages
* ARM Images
* Community

### Website

The Parrot website, freely visible at https://parrotsec.org, was built using the NextJS framework and the React library. 
You are free to view and analyze the code by cloning the [repository](https://gitlab.com/parrotsec/project/website).

If you have any ideas on how to improve it or anything else, feel free to open a merge request. The maintainer (danterolle@parrotsec.org)
of this subproject will review your request as soon as possible and coordinate to approve it.

### Documentation

The official ParrotOS documentation, accessible at https://parrotsec.org/docs. It is based on [Astro Starlight](https://starlight.astro.build/)
and the graphics follow the ParrotOS style. New features will always be added to make it as complete as possible.
If you think you can add some essential or interesting documents, feel free to clone this [repository](https://gitlab.com/parrotsec/project/documentation) and open a merge request.

### Debian Packages

Most of our 3rd party programs and most of our pre-included programs come from Debian. We mostly wait for Debian updates.
You can contribute by creating new Debian packages or by proposing new tools, strictly already packaged according to 
[Debian standards](https://wiki.debian.org/PackagingWithGit).

To get started, you can follow [this manual](https://www.debian.org/doc/debian-policy).

Initially, the work must be started on a personal repo forking the package. Once the code is correctly set to be packaged, 
open a merge request and a Team Leader will analyze the modifications before approving.

## Development workflow

Our development workflow is based on the following points and always tries to involve the entire development team (and
interested contributors), so that everyone is constantly updated:

1. Devs will write their code and perform the first local test to resolve as many bugs as possible.
2. Upload the first version (or an updated version through a merge request in case of an application being updated) on GitLab. The Team Leader (or someone in charge) will analyze the code and approve the modifications.
3. An open beta/internal beta campaign will be launched to investigate the code and find bugs/vulnerabilities.
4. If bugs and vulnerabilities are discovered, repeat the two previous steps until there are no more critical and evident bugs.
5. When the code is ready to be packaged, the Team Leader or someone in charge will accept the final modifications.