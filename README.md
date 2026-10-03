# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## Contact form on Cloudflare Pages

The contact form uses the Pages Function in `functions/api/contact.ts` to send messages through Resend. Deploy the project as a Cloudflare Pages site with build command `npm run build` and output directory `dist`.

In the Pages project settings, add these runtime variables:

- `RESEND_API_KEY` — a Resend API key, stored as a secret.
- `RESEND_FROM_EMAIL` — a sender address on a domain verified in Resend, for example `Portfolio Contact <contact@your-domain.com>`.

The function delivers submissions to `akshaansingh.2018@gmail.com` and sets the submitter's address as the reply-to. For local Pages Function testing, put the same values in a root `.dev.vars` file (do not commit it), then run `npm run build` and `npx wrangler pages dev dist`.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
