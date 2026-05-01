#!/usr/bin/env bash

set -euo pipefail

echo "Setting up Letteranne..."

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found. Install Docker first."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose plugin not found. Install Docker Compose plugin first."
  exit 1
fi

if [ ! -f .env ]; then
  echo "Creating .env from .env.example"
  cp .env.example .env
  echo "Update .env values before production usage."
fi

echo "Starting local services..."
docker compose up -d

echo "Waiting for backend container..."
sleep 5

echo "Running database migrations..."
docker compose exec backend python manage.py migrate

echo
echo "Setup complete."
echo "Next steps:"
echo "  1) Visit http://localhost:5173"
echo "  2) Use make test to run tests"
