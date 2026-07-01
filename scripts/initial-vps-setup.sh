#!/usr/bin/env bash
# Primeiro deploy no VPS — executar como root em /srv/data/landing
set -euo pipefail

LANDING_DIR="/srv/data/landing"
REPO_URL="${1:-}"

if [[ ! -d "$LANDING_DIR" ]]; then
  mkdir -p "$LANDING_DIR"
fi

cd "$LANDING_DIR"

if [[ -n "$REPO_URL" ]] && [[ ! -d .git ]]; then
  echo "==> Clonando repositório..."
  git clone "$REPO_URL" .
elif [[ -d .git ]]; then
  echo "==> Atualizando repositório..."
  git pull
else
  echo "Aviso: sem git remoto — assumindo arquivos já copiados para $LANDING_DIR"
fi

if ! docker network inspect traefik-proxy >/dev/null 2>&1; then
  echo "ERRO: rede traefik-proxy não encontrada. Verifique se o Traefik está rodando."
  exit 1
fi

echo "==> Build e subida do container landing..."
docker compose build --no-cache landing
docker compose up -d --force-recreate landing

echo ""
docker compose ps
docker compose logs landing --tail 20

echo ""
echo "==> Próximo passo: DNS A record lp.romulohub.cloud -> $(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo "==> Depois do DNS propagar: curl -sI https://lp.romulohub.cloud/ | head -5"
