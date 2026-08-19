// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "",
	  logo: {
        src: './src/assets/parrot-logo.svg',
      },
      customCss: [
        "./src/styles/index.css",
      ],
      social: [
        {
          icon: "gitlab",
          label: "Gitlab",
          href: "https://gitlab.com/parrotsec",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Installation",
          items: [{ autogenerate: { directory: "installation" } }],
        },
      ],
    }),
  ],
});
