
const introduction = [
      {
        type: 'doc',
        id: 'introduction/what-is-parrot',
        label: 'What is Parrot?',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_intro.svg',
        },
      },
      {
        type: 'doc',
        id: 'introduction/gnu-linux-basics',
        label: 'GNU/Linux Basics',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_intro.svg',
        },
      },
      {
        type: 'doc',
        id: 'introduction/download-parrot',
        label: 'Download Parrot',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_intro.svg',
        },
      },
      {
        type: 'doc',
        id: 'introduction/community-contributions',
        label: 'Community & Contributors',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_intro.svg',
        },
      },
    ];

const installation = [
      {
        type: 'doc',
        id: 'installation/installation',
        label: 'Install ParrotOS',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_instal.svg',
        },
      },
      {
        type: 'doc',
        id: 'installation/dualboot-with-windows',
        label: 'Dualboot with Windows',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_instal.svg',
        },
      },
      {
        type: 'doc',
        id: 'installation/install-with-wsl',
        label: 'WSL Edition',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_instal.svg',
        },
      },
      {
        type: 'doc',
        id: 'installation/manual-installation',
        label: 'Manual partioning',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_instal.svg',
        },
      },
      {
        type: 'doc',
        id: 'installation/raspberrypi',
        label: 'Raspberry Pi',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_instal.svg',
        },
      },
    ];

export const sidebarItems = [
  {
    type: 'category',
    label: 'Introduction',
    link: {
      type: 'doc',
      id: 'introduction/index',
    },
    items: [
        ...introduction,
    ]
  },
  {
    type: 'category',
    label: 'Installation',
    link: {
      type: 'doc',
      id: 'installation/index',
    },
    items: [
        ...installation,
    ]
  },
];