// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "ParrotOS Docs",
      favicon: "/favicon.ico",
	  logo: {
        src: './src/assets/parrot-logo.svg',
      },
      customCss: [
        "./src/styles/index.css",
      ],
      components: {
        PageTitle: "./src/components/PageTitle.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
      },
      social: [
        {
          icon: "gitlab",
          label: "Gitlab",
          href: "https://gitlab.com/parrotsec",
        },
      ],
      sidebar: [
        {
          label: "Introduction",
          collapsed: true,
          items: [{ autogenerate: { directory: "introduction" } }],
        },
        {
          label: "Installation",
          collapsed: true,
          items: [{ autogenerate: { directory: "installation" } }],
        },
        {
          label: "Virtualization",
          collapsed: true,
          items: [{ autogenerate: { directory: "virtualization" } }],
        },
        {
          label: "Containers",
          collapsed: true,
          items: [{ autogenerate: { directory: "containers" } }],
        },
        {
          label: "USB",
          collapsed: true,
          items: [{ autogenerate: { directory: "usb" } }],
        },
        {
          label: "Configuration",
          collapsed: true,
          items: [{ autogenerate: { directory: "configuration" } }],
        },
        {
          label: "Troubleshooting",
          collapsed: true,
          items: [{ autogenerate: { directory: "troubleshooting" } }],
        },
        {
          label: "Tools",
          collapsed: true,
          items: [{ autogenerate: { directory: "tools" } }],
        },
        {
          label: "Development",
          collapsed: true,
          items: [{ autogenerate: { directory: "development" } }],
        },
        {
          label: "Mirrors",
          collapsed: true,
          items: [{ autogenerate: { directory: "mirrors" } }],
        },
      ],
    }),
  ],
});
