#!/usr/bin/env bash
# deploy.sh — Run this on the DO droplet (or locally) to start all services.
# Usage: ./deploy.sh
set -euo pipefail

cd "$(dirname "$0")"

# Ensure .env exists
if [ ! -f .env ]; then
  echo "ERROR: .env file not found."
  echo "  Copy .env.example to .env and fill in your secrets first:"
  echo "    cp .env.example .env"
  exit 1
fi

echo "==> Pulling latest images"
docker compose pull

echo "==> Starting all services"
docker compose up -d

echo "==> Running database migrations (bidirectional-translations)"
docker compose exec bidirectional-translations /app/bin/migrate

echo ""
echo "==> All services running!"
echo ""
echo "    nginx                       → ports 80, 443"
echo "    frontend                    → wrightdavid.com (Angular)"
echo "    backend                     → wrightdavid.com/api/ (Node API)"
echo "    kelly-criterion             → yoloresponsibly.com"
echo "    bidirectional-translations  → YOUR_DOMAIN (Phoenix LiveView)"
