#!/usr/bin/env bash

NAME="auth.paxa.dev"
TMPDIR="/tmp/$NAME"
WORKDIR="/var/www/$NAME"
SERVICE="${NAME}.service"
PATH=$PATH:/home/nginx/.local/share/pnpm

echo "📦 Preparando ambiente de deploy..."

[ -e $TMPDIR ] && rm -rf $TMPDIR
[ -e $WORKDIR ] && cp -af $WORKDIR $TMPDIR
cd $TMPDIR || exit 1

#git clean -fxd -e .env -e drizzle/database.db
git clean -fxd -e .env
cp .env .env.production

echo "📥 Instalando dependências..."
pnpm install

echo "🗃️ Sincronizando banco de dados..."
pnpm run push
pnpm run seed

if pnpm run build; then
  echo "✅ Build concluído com sucesso!"
  sudo /usr/bin/systemctl stop $SERVICE
  ./scripts/selinux.sh
  [ -e $WORKDIR ] && rm -rf $WORKDIR
  [ -e $TMPDIR ] && cp -af $TMPDIR $WORKDIR
  sudo /usr/bin/systemctl start $SERVICE
  echo "🚀 Serviço reiniciado!"
fi