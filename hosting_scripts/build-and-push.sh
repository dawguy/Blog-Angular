#!/usr/bin/env bash
# deploy.sh — Run this on your laptop to build, push, and prepare for droplet deploy.
# Usage: ./deploy.sh 1.0.1
set -euo pipefail

VERSION="${1:-latest}"
IMAGE="bloodisblue/bidirectional-translations:${VERSION}"
PROJECT_DIR="/Users/david/code/bidirectional_translations"

echo "==> Building Docker image: ${IMAGE}"
cd "${PROJECT_DIR}"
docker build -t "${IMAGE}" .

echo "==> Pushing to Docker Hub"
docker push "${IMAGE}"

echo ""
echo "==> Done. Now SSH to your droplet and run:"
echo ""
echo "    cd ~/blog-server"
echo "    docker compose pull bidirectional-translations"
echo "    docker compose up -d bidirectional-translations"
echo "    docker compose exec bidirectional-translations /app/bin/migrate"
