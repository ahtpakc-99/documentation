---
sidebar_position: 4
---

# Community Contributions

Parrot was born and continues to be a fully open-source project, 
this means that anyone can see the code of each of its components and, if interested, modify it.

Which is why, if you like the world of open source and in particular the Parrot project, you are strongly invited to 
contribute. Here you will find a guide on how to proceed and on which projects you can currently contribute.

No matter how technically good you are in a certain area, you will see that you can contribute in various ways depending 
on the Parrot sub-project. Any motivated and useful contribution is always more than welcome. In any case, someone from 
the team will be alongside you in order to discuss it together.

At present, all Debian packages and all tools developed by the Parrot team reside on [GitLab](https://gitlab.com/parrotsec) 
and [GitHub](https://github.com/parrotsec) (as a backup mirror).

## Work on a Parrot sub-project

Since we mainly work on GitLab, it will be important that you have a registered GitLab account, you will need it to start
contributing. Then, once you have chosen the sub-project, contact the Parrot team at the email team@parrotsec.org, specifying
the chosen sub-project and the part in which you want to contribute.

This list will be updated, but it is now possible to contribute to the following sub-projects:

* Website
* Documentation
* AnonSurf
* Debian Packages
* ARM images
* Community

### Website

The Parrot website, freely visible at https://parrotsec.org, was built using the NextJS framework and the React library. 
You are free to view and analyze the code by cloning the [repository](https://gitlab.com/parrotsec/project/website).

If you have any ideas on how to improve it or anything else, feel free to open a merge request. The maintainer of 
this sub-project will review your request as soon as possible and coordinate to approve it.

Maintainer: danterolle@parrotsec.org

### Documentation

The official ParrotOS documentation, accessible at https://parrotsec.org/docs. It is based on the Docusaurus v2 framework
and the graphics follow the ParrotOS style. If you think you can add some essential or interesting documents, feel free 
to clone this [repository](https://gitlab.com/parrotsec/project/documentation) and open a merge request.

Maintainer: danterolle@parrotsec.org

### AnonSurf

### Debian Packages

### Community

## Development workflow

Our development workflow is based on these following points and always tries to involve the entire development team (and
interested contributors), so that everyone is constantly updated:

1. Devs will write their code, make a first local test in order to resolve as much bugs as possible.
2. Upload the first version (or an updated version through merge request in case of an application being updated) on GitLab. The Team Leader (or someone in charge) will analyze the code and approves the modifications.
3. An open beta/internal beta campaign will be launched in order to investigate the code and find bugs/vulnerabilities.
4. If bugs and vulnerabilities have been discovered, repeat the two previous steps until there are not critical and evident bug anymore.
5. When the code is ready to be packaged, the Team Leader or someone in charge will accept the final modifications.
