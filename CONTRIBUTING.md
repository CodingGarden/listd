 105 lines (68 sloc) 4.27 KB
# Contribution Guidelines

When contributing to `listd`, whether on GitHub or in other community spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the [issue tracker](https://github.com/CodingGarden/listd/issuess) for known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure you open an issue first describing the changes you want to make, and open a pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In order to not waste your time implementing a change that has already been declined, or is generally not needed, start by [opening an issue](https://github.com/CodingGarden/listd/issues/new) describing the problem you would like to solve.

### Setup your environment

Fork the [Listd repository](https://github.com/CodingGarden/) to your own GitHub account and then clone it to your local device.


```bash
git clone git@github.com:YOUR_USER_NAME/listd.git
```

Then, install the project's dependencies:

```bash
npm install
```

### Set up the database

This project uses [PostgreSQL](https://www.postgresql.org/) as its database. You can install it on your local machine by [Docker](https://www.docker.com/) or use a cloud service like [ElephantSQL](https://www.elephantsql.com/).

create a `.env` file in the root directory of the project and add the following variables:

#### `.env` variables for PostgreSQL

```bash
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```
* DB_HOST: The host of your database. If you use ElephantSQL, you can find it in the connection string. If you use Docker, it's `localhost`.

* DB_PORT: The port of your database. If you use ElephantSQL, you can find it in the connection string. If you use Docker, it's `5432`.

* DB_USER: The user of your database. If you use ElephantSQL, you can find it in the connection string. If you use Docker, it's `postgres`.

* DB_PASSWORD: The password of your database. If you use ElephantSQL, you can find it in the connection string. If you use Docker, it's `postgres`.

* DB_NAME: The name of your database. If you use ElephantSQL, you can find it in the connection string. If you use Docker, it's `postgres`.

#### Set up PostgreSQL by Docker Compose

If you have [Docker](https://www.docker.com/) installed, you can use the following command to start a PostgreSQL container:

```bash
docker-compose up -d
```

### Migration

This project uses [Prisma](prisma.io/) to manage the database. You can use the following command to create a migration file:

```bash
npx prisma migrate dev --name init
```

Then, you can use the following command to generate the Prisma client:

```bash
npx prisma generate
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

## Code Style

This project uses [Prettier](https://prettier.io/) to format the code. You can run `npm run format` to format the code before committing.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.


