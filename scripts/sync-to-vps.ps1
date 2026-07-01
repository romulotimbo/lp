# Sincroniza o projeto para o VPS e executa deploy
# Uso: .\scripts\sync-to-vps.ps1 [-SshHost romulohub]
param(
    [string]$SshHost = "romulohub",
    [string]$RemotePath = "/srv/data/landing"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "==> Empacotando projeto (exclui node_modules e dist)..."
$archive = Join-Path $env:TEMP "landing-deploy.tar.gz"
if (Test-Path $archive) { Remove-Item $archive }

Push-Location $ProjectRoot
tar --exclude=node_modules --exclude=dist --exclude=.git -czf $archive .
Pop-Location

Write-Host "==> Enviando para ${SshHost}:${RemotePath}..."
ssh $SshHost "mkdir -p $RemotePath"
scp $archive "${SshHost}:${RemotePath}/landing-deploy.tar.gz"

Write-Host "==> Extraindo e fazendo deploy no VPS..."
ssh $SshHost @"
set -e
cd $RemotePath
tar -xzf landing-deploy.tar.gz
rm landing-deploy.tar.gz
chmod +x scripts/*.sh 2>/dev/null || true
bash scripts/deploy-vps.sh
"@

Remove-Item $archive -ErrorAction SilentlyContinue
Write-Host "==> Concluído."
