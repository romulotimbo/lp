#!/usr/bin/env bash
set -euo pipefail
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"
SERVICE="${SERVICE:-landing}"
HEALTH_URL="${HEALTH_URL:-https://lp.romulohub.cloud/}"
git pull
docker compose -f "$COMPOSE_FILE" build --no-cache "$SERVICE"
docker compose -f "$COMPOSE_FILE" up -d --force-recreate "$SERVICE"
docker compose -f "$COMPOSE_FILE" ps
docker compose -f "$COMPOSE_FILE" logs "$SERVICE" --tail 20
curl -sI "$HEALTH_URL" | head -3
echo "Deploy landing concluído."
