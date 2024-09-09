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
the [team](https://parrotsec.org/team/) will be alongside you in order to discuss it together.

At present, all Debian packages and all tools developed by the Parrot team reside on [GitLab](https://gitlab.com/parrotsec) 
and [GitHub](https://github.com/parrotsec) (as a backup mirror).

## Why should you be a contributor?

Be a contributor for an open-source project means that you have the chance to:

- <b>Meet new people</b>: you will be able to meet a lot of developers like you, who are in love with the world of the open-source projects. This will not only help you to expand your network from a professional point of view, but also to develop real and true friendship;
- <b>Learn and teach new things</b>: first rule of contributor is "never get stuck on what you already know", it doesn't matter if you're a newbie or a senior developer, if you start contribute to an open-source project you can learn a lot of new things or, in the other way, you'll get the chance to teach new things to other people (this will boost your confidence a lot, trust us); 
- <b>Make your work worth it</b>: you will get the chance to test in advance some of our packages and, in the best-case scenario, your work will be built into Parrot Security OS. 

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
of this sub-project will review your request as soon as possible and coordinate to approve it.

### Documentation

The official ParrotOS documentation, accessible at https://parrotsec.org/docs. It is based on the Docusaurus v2 framework
and the graphics follow the ParrotOS style. New features will always be added to make it as complete as possible.
If you think you can add some essential or interesting documents, feel free to clone this [repository](https://gitlab.com/parrotsec/project/documentation) and open a merge request.

### Debian Packages

Most of our 3rd party programs and most of our pre-included programs comes from Debian. We mostly wait for Debian updates.
You can contribute by creating new Debian packages or by proposing new tools, strictly already packaged according to 
[Debian standards](https://wiki.debian.org/PackagingWithGit).

To get started, you can follow [this manual](https://www.debian.org/doc/debian-policy).

Initially the work must be started on personal repo forking the package. Once the code is correctly set to be packaged, 
open a merge request and Team Leader will analyze modifications before approve.

### Community

The [community](https://parrotsec.org/community) is a very important part for an operating system like Parrot, and helping each other can only be useful 
to increase one's knowledge. The ParrotOS community always needs new moderators, for Discord channels, our Forum and in Telegram groups.

#### Community Structure

Each community is divided into the following sections:

* **General**: A welcome place to have a first approach to our community. Feel free to ask for help or whatever you need, there will always be someone who will answer your questions or direct you to the right channel.

* **Support**: Technical Support room for ParrotOS. Here you can find questions and answers concerning the OS.

* **Ask the Devs**: ParrotOS devs are here to answer questions regarding the OS and more.

* **Distro Development**: News and sneak peak at the progress of the next ParrotOS version development, questions are always welcome.

* **Hacking**: Have fun by asking questions about hacking techniques, read users’ experiences, read contents made by us or confront about what concerns Hacking and Security in general.

* **Programming**: In this room discussions about coding are highly encouraged, and if you need assistance on your tasks, don't hesitate to ask.

* **Sysadmin**: The topic here is all about system administration, networking, hardware and software.

* **OffTopic**: Free conversation room, memes are always welcome!

* **News**: Official Channel to get all of the latest news about Parrot.

#### Community Manifesto
We highly encourage users to engage discussions not only for support purposes, but also for whatever concerns security, hacking, programming (and so on), build an active and varied community where any kind of discussion or comparison are valued and welcome. 

If any user want to join us (or has already joined) to help building and keep healthy and active our community, we ask to follow the rules of each community and to meet certain requirements:

* **Be kind, always.**  
It is important to maintain a consistently polite and patient demeanour with users. Reserve expressing frustration or anger for truly exceptional and extreme circumstances.

* **Respect Everyone.**  
Our community must be healthy even when it’s about religion, political belief, physical/mental disabilities and LGBT+ communities. Don’t spread hate on anything or anyone and guide users towards respect and acceptance.

* **Be a guide to anyone approaching this field, ParrotOS and GNU/Linux for the first time.**  
  No one is born an expert in a specific field. Don’t take anything for granted, if a user asks a question about something that you know very well, share your knowledge, it’ll be accessible for the future to those who’ll be in the same situation. You don’t know the answer? Kindly guide the user to wait for someone more experienced to read the request and reply.
* **Be always enthusiastic to learn new things and be open to new possibilities.**   
Knowledge is constantly evolving, and something you used to know may vary over time, confront the community as much as possible.
* **Avoid acting impulsively or based solely on your personal dislikes.**  
Everyone can have likes and dislikes, but this must not affect the community. Moderate with intelligence and reasoning, not with your personal emotions. If there’s something negative or that needs more attention about the team, please ping the community manager in the moderation room and explain detailedly what’s going on.

We value users’ contributions so, for this reason, every three months we will announce the most active members, who will obtain in their profile the mention of “**ParrotOS Enthusiast**”. Thanks to this, we will give our community more reference points.

#### Parrot Community Activities

WIP.

## Development workflow

Our development workflow is based on these following points and always tries to involve the entire development team (and
interested contributors), so that everyone is constantly updated:

1. Devs will write their code, make a first local test in order to resolve as much bugs as possible.
2. Upload the first version (or an updated version through merge request in case of an application being updated) on GitLab. The Team Leader (or someone in charge) will analyze the code and approves the modifications.
3. An open beta/internal beta campaign will be launched in order to investigate the code and find bugs/vulnerabilities.
4. If bugs and vulnerabilities have been discovered, repeat the two previous steps until there are not critical and evident bug anymore.
5. When the code is ready to be packaged, the Team Leader or someone in charge will accept the final modifications.
