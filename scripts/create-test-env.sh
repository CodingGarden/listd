#! /bin/sh

cat <<< "VITE_COVERAGE=${VITE_COVERAGE}
NODE_ENV=${NODE_ENV}
REDIS_PORT=${REDIS_PORT}
REDIS_HOST=${REDIS_HOST}
REDIS_URL=${REDIS_URL}
AUTH_SECRET=${AUTH_SECRET}
YOUTUBE_API_KEY=${YOUTUBE_API_KEY}
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
DB_HOST=${DB_HOST}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
DB_PORT=${DB_PORT}
DATABASE_URL=${DATABASE_URL}" > .env.test