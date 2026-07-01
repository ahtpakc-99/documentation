// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.palenight
const darkCodeTheme = require('prism-react-renderer').themes.nightOwl

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ParrotOS Documentation',
  tagline:
    'An important part of any operating system is documentation, the technical manuals which describe the operation and use of programs. As part of its efforts to create a high-quality free operating system, the Parrot Project is making every effort to provide all of its users with proper documentation in an easily accessible form.',
  url: 'https://parrotsec.org',
  baseUrl: '/docs/',
  onBrokenLinks: 'ignore',
  favicon: 'img/favicon.ico',
  // ... rest of config
  scripts: [
    {
      src: '/docs/pagefind/pagefind-ui.js',
      async: true,
    },
  ],
  plugins: [
    function matomoPlugin() {
      return {
        name: 'matomo-plugin',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
                  window.addEventListener('load', function() {
                    document.body.classList.add('loaded');
                  });
                `,
              },
              {
                tagName: 'script',
                innerHTML: `
                  var _paq = window._paq = window._paq || [];
                  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                  _paq.push(["setCookieDomain", "*.parrotsec.org"]);
                  _paq.push(["setDomains", ["*.parrotsec.org"]]);
                  _paq.push(["disableCookies"]);
                  _paq.push(['trackPageView']);
                  _paq.push(['enableLinkTracking']);
                  (function() {
                    var u="https://endpoints.parrotsec.org/";
                    _paq.push(['setTrackerUrl', u+'t']);
                    _paq.push(['setSiteId', '1']);
                    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                    g.async=true; g.src=u+'j'; s.parentNode.insertBefore(g,s);
                  })();
                `,
              },
            ],
            preBodyTags: [
              {
                tagName: 'noscript',
                innerHTML: `<img referrerpolicy="no-referrer-when-downgrade" src="https://endpoints.parrotsec.org/t?idsite=1&rec=1" style="border: 0;" alt="" />`,
              },
            ],
          };
        },
      };
    },
  ],
  stylesheets: [
    {
      href: '/docs/pagefind/pagefind-ui.css',
    },
  ],
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'parrot', // Usually your GitHub org/user name.
  // projectName: 'parrot-documentation', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        /**
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        **/
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark'
      },

      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
      navbar: {
        // title: 'Documentation',
        logo: {
          alt: 'Parrot Logo',
          src: 'img/parrot-logo.svg',
          href: 'https://parrotsec.org',
          target: '_self',
        },
        hideOnScroll: true,
        // items: [
        //   {
        //     type: 'doc',
        //     docId: 'introduction/what-is-parrot',
        //     position: 'left',
        //     label: 'Documentation'
        //   },
        //   /** {to: '/blog', label: 'Blog', position: 'left'}, **/
        //   {
        //     to: 'https://parrotsec.org/download',
        //     label: 'Download',
        //     position: 'left'
        //   },
        //   {
        //     href: 'https://gitlab.com/parrotsec',
        //     label: 'GitLab',
        //     position: 'right'
        //   }
        // ]
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Social',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/parrotsec'
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/parrotproject/'
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/ParrotSec/'
              },
              {
                label: 'Telegram',
                href: 'https://t.me/parrotsecgroup'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Forum',
                href: 'https://community.parrotsec.org'
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/j7QTaCzAsm'
              }
            ]
          },
          {
            title: 'Repositories',
            items: [
              {
                label: 'GitLab',
                href: 'https://gitlab.com/parrotsec'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/parrotsec'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'Team',
                to: 'https://parrotsec.org/team/'
              },
              {
                label: 'Partners',
                to: 'https://parrotsec.org/partners/'
              },
              {
                label: 'Donate',
                to: 'https://parrotsec.org/donate/'
              }
            ]
          }
        ],
        copyright: `© ${new Date().getFullYear()} Parrot Security. All rights reserved.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
  /*
  customFields: {
    wallpaper: 'parrot_desktop.png',
  },
  */
}

module.exports = config
