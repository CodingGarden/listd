# Contribution Guidelines

When contributing to `listd`, whether on GitHub or in other community spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the [issue tracker](https://github.com/CodingGarden/listd/issues) for known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure you open an issue first describing the changes you want to make, and open a pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In an effort to respect your time, if you wanted to implement a change that has already been declined, or is generally not needed, start by [opening an issue](https://github.com/CodingGarden/listd/issues/new) describing the problem you would like to solve.

### Setup your environment

Fork the [Listd repository](https://github.com/CodingGarden/listd) to your own GitHub account and then clone it to your local device.

```bash
git clone git@github.com:YOUR_USER_NAME/listd.git
```

Then, install the project's dependencies:

```bash
npm install
```

### Set up the database

This project uses [PostgreSQL](https://www.postgresql.org/) as its database.

The project has a `docker-compose.dev.yml` file ready to use if you have [Docker](https://www.docker.com/) installed.

You can also install Postgres on your local machine [directly](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) or use a cloud service.

copy `.env.example` to `.env`

```bash
 cp .env.example .env
```

#### `.env` variables for PostgreSQL

```bash
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```

If you are using Docker, you can use the following values:

```bash
DB_HOST=localhost
DB_USER=listdapp
DB_PASSWORD=supersecret
DB_NAME=listd
DB_PORT=5432
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```

- DATABASE_URL: The full database connection URL. This is required and is used by prisma.

#### Set up PostgreSQL by Docker Compose

If you have [Docker](https://www.docker.com/) installed, you can use the following command to start a PostgreSQL container:

```bash
docker-compose -f docker-compose.dev.yml up -d --wait
```

#### Prisma Setup

Use the following command to generate the Prisma client:

```bash
npx prisma migrate dev
```

View the database diagram [here](./prisma/ERD.md).

#### Playwright Setup

Ensure you have the Playwright executables installed to run tests:

```bash
npx playwright install
```

### Getting Google OAuth API Credentials

1. Visit the [Google Cloud Console](https://console.developers.google.com/apis/credentials)
2. Go to the OAuth consent screen tab, fill first step leaving the rest blank and click Save. This will create a project for you
3. Now Publish your OAuth consent screen App.
4. Go to the [Credentials tab](https://console.cloud.google.com/apis/credentials) and click Create Credentials -> OAuth Client ID
   - Choose Web Application
   - Add `http://localhost:5173` to the Authorized JavaScript origins
   - Add `http://localhost:5173/auth/callback/google` to the Authorized redirect URIs.
   - Click Create.
5. Copy the Client ID and Client Secret and paste them into the `.env` file.

```bash
AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### Run the project

To run the project in development mode, run the following command:

```bash
npm run dev
```

### Make changes

Before making any changes, make sure you create a new branch:

```bash
git checkout -b your-branch-name
```

When you're done making changes, commit them and push them to your fork:

```bash
git add .
git commit -m "your commit message"
git push
```

Then, [create a pull request](https://github.com/CodingGarden/listd/pulls)
from your fork to the `main` branch of the `listd` repository.

## Server Environment Variables

Server environment variables should only be accessed from [`'$lib/config.server.ts'`](./src/lib/config.server.ts) (do not import directly from `'$env/static/private'`).

If you need access to a new environment variable, add it to the schema in [`'$lib/config.server.ts'`](./src/lib/config.server.ts).

## Code Style Guidelines

In order to maintain consistent and readable code, this project adheres to certain code style guidelines. Please follow these guidelines when contributing to the project.

### Linter

This project uses `ESLint` as our linter tool. To configure your VSCode workspace to show lint warnings, you can find a suggested configuration file, named `default.settings.json`, in the `.vscode` directory. Copy and rename this file to `settings.json` to enable the linter warnings in VSCode. Please do not alter the original `default.settings.json`.

To further improve your development experience while working on `listd`, this project also includes a list of suggested VSCode extensions in the file `.vscode/extensions.json`.

### Formatter

This project uses [Prettier](https://prettier.io/) to format the code. You can run `npm run format:fix` to format the code before committing.

<!-- TODO: setup eslint -->
<!-- TODO: setup github actions to run linter -->
<!-- TODO: setup pre-commit hooks to run linter -->

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
