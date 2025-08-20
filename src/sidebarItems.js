
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
        id: 'installation/installation-parrot',
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

const virtualization = [
      {
        type: 'doc',
        id: 'virtualization/install-parrot-on-virtualbox',
        label: 'VirtualBox',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_virtual.svg',
        },
      },
      {
        type: 'doc',
        id: 'virtualization/virtualbox-guest-additions',
        label: 'VirtualBox Guest Additions',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_virtual.svg',
        },
      },
      {
        type: 'doc',
        id: 'virtualization/parrot-on-vmware',
        label: 'VMware',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_virtual.svg',
        },
      },
      {
        type: 'doc',
        id: 'virtualization/utm-configuration',
        label: 'UTM',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_virtual.svg',
        },
      }
    ];

const usb = [
      {
        type: 'doc',
        id: 'usb/how-to-create-a-parrot-usb-drive',
        label: 'Create a bootable USB',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_usb.svg',
        },
      },
      {
        type: 'doc',
        id: 'usb/persistent-usb',
        label: 'Persistent partition',
        customProps: {
          iconUrl: '/img/icons/parrotOS_icons_nobckgr_usb.svg',
        },
      }
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
    label: 'Installation/index',
    link: {
      type: 'doc',
      id: 'installation/index',
    },
    items: [
        ...installation,
    ]
  },
  {
    type: 'category',
    label: 'Virtualization',
    link: {
      type: 'doc',
      id: 'virtualization/index',
    },
    items: [
        ...virtualization,
    ]
  },
  {
    type: 'category',
    label: 'USB',
    link: {
      type: 'doc',
      id: 'usb/index',
    },
    items: [
        ...usb,
    ]
  },
];