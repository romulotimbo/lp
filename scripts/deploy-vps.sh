#!/usr/bin/env bash
set -euo pipefail
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"
SERVICE="${SERVICE:-landing}"
HEALTH_URL="${HEALTH_URL:-https://lp.romulohub.cloud/}"
git pull
docker compose -f "$COMPOSE_FILE" build --no-cache landing-api landing
docker compose -f "$COMPOSE_FILE" up -d --force-recreate landing-api landing
docker compose -f "$COMPOSE_FILE" ps
docker compose -f "$COMPOSE_FILE" logs landing-api --tail 15
docker compose -f "$COMPOSE_FILE" logs landing --tail 15
curl -sI "$HEALTH_URL" | head -3
curl -s "https://lp.romulohub.cloud/api/health" || true
echo "Deploy landing concluído."
