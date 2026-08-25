# ParrotOS Documentation

Source code for the [official ParrotOS documentation](https://parrotsec.org/docs/), built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

The documentation covers ParrotOS installation, configuration, virtualization, containers, security tools, troubleshooting, and development.

## Requirements

- [Node.js 22.12 or newer](https://nodejs.org/)
- npm 9.6.5 or newer

Docker is optional and only required to build the production container locally.

## Local development

Clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/parrotsec/web/documentation.git
cd documentation
npm ci
```

Start the development server:

```bash
npm run dev
```

The documentation is available at <http://localhost:4321/docs/>.

## Adding documentation

Add Markdown or MDX files under the appropriate directory in `src/content/docs/`. Sidebar groups are generated from these directories.

Every page must include a title in its frontmatter:

```md
---
title: Example page
description: A short summary of the page.
---
```

Store page-specific images next to the related documentation and reference them with relative paths.

Before opening a merge request, please generate a production build:

```bash
npm run build
```

## Docker

Build the production image:

```bash
docker build -t parrot-documentation .
```

Run it locally:

```bash
docker run --rm -p 3000:80 parrot-documentation
```

The container serves the documentation at <http://localhost:3000/docs/>.

## Contributing

Create a branch from `dev`, make focused changes, and open a merge request against `dev`. Keep documentation in clear English and include screenshots when they make a procedure easier to follow.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
