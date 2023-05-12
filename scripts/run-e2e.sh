#!/usr/bin/env bash

source .env

if [[ "$OSTYPE" == "darwin"* ]]; then
  if ! type "gtimeout" > /dev/null; then
    echo "Before running e2e tests on a mac,"
    echo "You need to install gtimeout with:"
    echo "brew install coreutils"
    exit 1
  fi
  alias timeout=gtimeout
fi

docker compose -f docker-compose.test.yml up -d
echo '🟡 - Waiting for postgres database to be ready...'
./scripts/wait-for-it.sh -t 1 "${DATABASE_URL}" -- echo '🟢 - Postgres database is ready!'
echo '🟡 - Waiting for redis database to be ready...'
./scripts/wait-for-it.sh -t 1 "${REDIS_URL}" -- echo '🟢 - Redis database is ready!'
npx prisma migrate dev --name init
npx playwright test
docker compose -f docker-compose.test.yml down