# Nuxt Minimal Starter

## Documentation

Project guides live in: `docs/README.md`

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

## Docker

Build and run with Docker:

```bash
# build image
docker build -t portfolio .

# run container (override port as needed)
docker run --rm -p 3000:3000 \
	-e WEB3FORMS_ACCESS_KEY=your_key_here \
	portfolio
```

The container serves the built app on port 3000 via `node .output/server/index.mjs`. Set any required runtime env vars (e.g. `WEB3FORMS_ACCESS_KEY`).

Or use Docker Compose (ports and env can be overridden as needed):

```bash
docker compose up --build

# or detached
docker compose up --build -d
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
