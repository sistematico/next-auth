#!/bin/bash
# Script de configuração do SELinux para auth.paxa.dev
# Oracle Linux 9

set -e

echo "🔐 Configurando SELinux para auth.paxa.dev..."

# 1. Permitir que o nginx acesse arquivos no diretório do aplicativo
echo "✅ Configurando contexto SELinux para /var/www/auth.paxa.dev..."
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/auth.paxa.dev(/.*)?"
sudo restorecon -R /var/www/auth.paxa.dev

# 2. Permitir que o nginx leia arquivos estáticos do Next.js
echo "✅ Configurando contexto para arquivos estáticos..."
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/auth.paxa.dev/.next(/.*)?"
sudo restorecon -R /var/www/auth.paxa.dev/.next 2>/dev/null || true

# 3. Permitir que o nginx faça proxy para localhost:3002
echo "✅ Habilitando httpd_can_network_connect..."
sudo setsebool -P httpd_can_network_connect 1

# 4. Permitir que o systemd execute node/pnpm como usuário nginx
echo "✅ Configurando contexto para executáveis do Node.js..."
# Permitir que systemd execute binários do usuário
sudo semanage fcontext -a -t bin_t "/home/nginx/.local/share/pnpm/pnpm"
sudo restorecon -R /home/nginx/.local 2>/dev/null || true

# 5. Permitir que o processo Next.js escute na porta 3002
echo "✅ Configurando porta 3002..."
sudo semanage port -a -t http_port_t -p tcp 3002 2>/dev/null || \
sudo semanage port -m -t http_port_t -p tcp 3002 || true

# 6. Permitir que o systemd execute o serviço como usuário nginx
echo "✅ Habilitando transições de domínio necessárias..."
sudo setsebool -P httpd_setrlimit 1
sudo setsebool -P httpd_execmem 1

# 7. Configurar contexto para o banco de dados SQLite
echo "✅ Configurando contexto para banco de dados..."
sudo semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/auth.paxa.dev/drizzle/database.db"
sudo semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/auth.paxa.dev/drizzle/database.db-shm"
sudo semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/auth.paxa.dev/drizzle/database.db-wal"
sudo restorecon /var/www/auth.paxa.dev/drizzle/database.db* 2>/dev/null || true

# 8. Verificar se há negações recentes do SELinux (útil para debug)
echo ""
echo "📋 Verificando logs recentes do SELinux..."
sudo ausearch -m avc -ts recent 2>/dev/null | grep -i denied | tail -10 || echo "Nenhuma negação recente encontrada."

echo ""
echo "✅ Configuração do SELinux concluída!"
echo ""
echo "🔍 Para debug futuro, use:"
echo "   sudo ausearch -m avc -ts recent"
echo "   sudo audit2allow -a"
echo "   sudo audit2why -a"
echo ""
echo "🔄 Reinicie o serviço:"
echo "   sudo systemctl restart auth.paxa.dev"
