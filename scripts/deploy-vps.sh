#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Build e deploy landing (lp.romulohub.cloud)"
docker compose build --no-cache landing
docker compose up -d --force-recreate landing
docker compose logs landing --tail 30

echo ""
echo "==> Verificação HTTPS"
curl -sI "https://lp.romulohub.cloud/" | head -5
echo ""
echo "Deploy landing concluído."
