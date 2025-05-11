#!/bin/bash

# Configuration
CONTAINER_NAME="pg_container"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="cal-sync"
PORT="5434"

# Start PostgreSQL Docker container if not running
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    # Cleanup if previously stopped
    docker rm $CONTAINER_NAME
  fi

  echo "Starting PostgreSQL container..."
  docker run --name $CONTAINER_NAME \
    -e POSTGRES_USER=$POSTGRES_USER \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    -e POSTGRES_DB=$POSTGRES_DB \
    -p $PORT:5432 \
    -d postgres:15
  sleep 3
else
  echo "PostgreSQL container already running at port $PORT"
fi

# Generate DATABASE_URL
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${PORT}/${POSTGRES_DB}"

# Write to Next.js .env file
if ! grep -q "DATABASE_URL=" .env; then
  echo "DATABASE_URL=$DATABASE_URL" >> .env
  echo "Added DATABASE_URL to .env"
else
  echo "DATABASE_URL already exists in .env"
fi

# Start Next.js app
echo "Starting Next.js app..."

npm run start:dev
