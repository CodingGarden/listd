# LISTD Media

An app that will allow users to **create**, _share_ and watch 👀 lists of YouTube channels.

# Tech Stack

## Backend

- [SvelteKit](https://kit.svelte.dev/)
- [Auth.js](https://authjs.dev/)
- Databases
  - [Postgres](https://www.postgresql.org/)
    - [Prisma](https://www.prisma.io/)
  - [Redis](https://redis.io/)
    - [node-redis](https://www.npmjs.com/package/redis)

## Frontend

- [Svelte](https://svelte.dev/)
- [tailwind](https://tailwindcss.com/)
- [Skeleton UI](https://www.skeleton.dev/)

## Libraries

- [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n/)
- [zod](https://www.npmjs.com/package/zod)
- [@googleapis/youtube](https://www.npmjs.com/package/@googleapis/youtube)
- [luxon](https://www.npmjs.com/package/luxon)

## Code Quality

- [eslint](https://www.npmjs.com/package/eslint)
  - [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
- [prettier](https://www.npmjs.com/package/prettier)
- [lint-staged](https://www.npmjs.com/package/lint-staged)
- [husky](https://www.npmjs.com/package/husky)

## Testing

- E2E / Integration
  - [Playwright](https://playwright.dev/)
- Coverage
  - [Istanbul](https://www.npmjs.com/package/nyc)

## CI / CD

- [Docker](https://www.docker.com/)
- [Github Actions](https://github.com/features/actions)
