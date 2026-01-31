# Next.js Simple Auth

Sistema de autenticação simples e funcional construído com Next.js 16 App Router, Drizzle ORM e SQLite.

## 🚀 Stack

- **Next.js** v16.1.6 - App Router
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **SQLite** - Database
- **TailwindCSS** v4 - Styling com tema escuro
- **pnpm** - Package manager
- **Zod** - Schema validation

## 📁 Estrutura do Projeto

```
src/
├── actions.ts              # Server Actions (login, register, logout)
├── schemas.ts              # Zod schemas para validação
├── app/
│   ├── (auth)/
│   │   ├── login/          # Página de login
│   │   └── register/       # Página de cadastro
│   ├── api/auth/logout/    # API route para logout
│   ├── dashboard/          # Página protegida
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Home
├── components/
│   ├── auth/
│   │   ├── SigninForm.tsx  # Formulário de login
│   │   └── SignupForm.tsx  # Formulário de cadastro
│   └── AuthNav.tsx         # Navegação autenticada
├── db/
│   ├── index.ts            # Conexão com DB
│   ├── schema.ts           # Schema Drizzle
│   └── seed.ts             # Seed data
└── lib/
    ├── password.ts         # Hash de senhas
    └── session.ts          # Gestão de sessões
```

## 🛠️ Setup

1. **Instale dependências**
   ```bash
   pnpm install
   ```

2. **Configure o banco de dados**
   ```bash
   pnpm push
   ```

3. **Inicie o servidor**
   ```bash
   pnpm dev
   ```

4. **Acesse** `http://localhost:3000`

## 📋 Features

- ✅ **Login** - Autenticação com email e senha
- ✅ **Cadastro** - Registro de novos usuários
- ✅ **Logout** - Encerramento de sessão
- ✅ **Sessões** - Gestão com cookies seguros
- ✅ **Proteção de rotas** - Middleware para `/dashboard`
- ✅ **Validação** - Zod schemas para forms
- ✅ **UI Responsiva** - TailwindCSS com tema escuro
- ✅ **Segurança** - Hash de senhas com crypto

## 🔐 Segurança

- Senhas hasheadas com `crypto.scrypt()`
- Sessões com cookies httpOnly e secure
- Validação de inputs com Zod
- Proteção contra timing attacks

## 📝 Scripts

- `pnpm dev` - Servidor de desenvolvimento
- `pnpm build` - Build para produção
- `pnpm start` - Servidor de produção
- `pnpm lint` - Verificação com Biome
- `pnpm format` - Formatação com Biome
- `pnpm push` - Push do schema Drizzle

## 🚀 Deploy em Produção (Oracle Linux 9)

### Pré-requisitos

- Oracle Linux 9 com SELinux ativado
- Nginx instalado
- Node.js e pnpm configurados
- Certificado SSL (Let's Encrypt)

### Estrutura de Arquivos

```
/var/www/auth.paxa.dev/          # Aplicação Next.js
/etc/nginx/conf.d/               # auth.paxa.dev.conf
/etc/systemd/system/             # auth.paxa.dev.service
```

### Passo a Passo

#### 1. Deploy da Aplicação

```bash
# Clone o repositório
cd /var/www
sudo git clone <repo-url> auth.paxa.dev
cd auth.paxa.dev

# Instale dependências e build
pnpm install
pnpm build

# Configure permissões
sudo chown -R nginx:nginx /var/www/auth.paxa.dev
```

#### 2. Configuração do Nginx

```bash
# Copie o arquivo de configuração
sudo cp files/auth.paxa.dev.conf /etc/nginx/conf.d/

# Teste a configuração
sudo nginx -t

# Não reinicie ainda (aguarde configuração do SELinux)
```

#### 3. Configuração do Systemd

```bash
# Copie o arquivo de serviço
sudo cp files/auth.paxa.dev.service /etc/systemd/system/

# Recarregue o systemd (não inicie ainda)
sudo systemctl daemon-reload
```

#### 4. 🔐 Configuração do SELinux (CRÍTICO)

O SELinux bloqueia por padrão que o nginx faça proxy reverso e que o systemd execute processos Node.js. Execute o script de configuração:

```bash
# Torne o script executável
chmod +x scripts/configure-selinux.sh

# Execute a configuração do SELinux
./scripts/configure-selinux.sh
```

**O que o script faz:**

1. **Contexto de arquivos**: Define `httpd_sys_content_t` para `/var/www/auth.paxa.dev`
2. **Contexto de escrita**: Define `httpd_sys_rw_content_t` para banco de dados SQLite
3. **Proxy reverso**: Habilita `httpd_can_network_connect` (nginx → localhost:3002)
4. **Porta customizada**: Registra porta 3002 como `http_port_t`
5. **Permissões extras**: Habilita `httpd_setrlimit` e `httpd_execmem` para Node.js

#### 5. Iniciar os Serviços

```bash
# Inicie e habilite o serviço Next.js
sudo systemctl enable auth.paxa.dev
sudo systemctl start auth.paxa.dev

# Verifique o status
sudo systemctl status auth.paxa.dev

# Reinicie o nginx
sudo systemctl restart nginx
```

### 🐛 Troubleshooting

#### Erro 502 Bad Gateway

Este erro geralmente indica que o SELinux está bloqueando a conexão. Verifique:

```bash
# 1. Verifique se o serviço está rodando
sudo systemctl status auth.paxa.dev
sudo ss -tlnp | grep 3002

# 2. Verifique logs do SELinux
sudo ausearch -m avc -ts recent | grep denied

# 3. Verifique logs do serviço
sudo journalctl -u auth.paxa.dev -n 50

# 4. Verifique logs do nginx
sudo tail -f /var/log/nginx/error.log
```

#### Debug do SELinux

```bash
# Ver negações recentes
sudo ausearch -m avc -ts today

# Gerar regras para permitir (modo permissivo)
sudo audit2allow -a

# Analisar por que foi bloqueado
sudo audit2why -a

# Temporariamente desabilitar SELinux (APENAS PARA DEBUG)
sudo setenforce 0  # Permissive
# sudo setenforce 1  # Enforcing (restaurar depois)
```

#### Reconfigurar SELinux

Se você modificar o diretório da aplicação ou portas, execute novamente:

```bash
./scripts/configure-selinux.sh
sudo systemctl restart auth.paxa.dev
sudo systemctl restart nginx
```

### 📋 Checklist de Deploy

- [ ] Aplicação clonada e build concluído
- [ ] Permissões corretas (`nginx:nginx`)
- [ ] Banco de dados criado e migrado
- [ ] Arquivo nginx configurado
- [ ] Arquivo systemd configurado
- [ ] **Script SELinux executado**
- [ ] Certificado SSL configurado
- [ ] Serviço iniciado e habilitado
- [ ] Nginx reiniciado
- [ ] Site acessível via HTTPS

### 🔄 Atualizações

```bash
# 1. Pare o serviço
sudo systemctl stop auth.paxa.dev

# 2. Atualize o código
cd /var/www/auth.paxa.dev
sudo -u nginx git pull
sudo -u nginx pnpm install
sudo -u nginx pnpm build

# 3. Restaure contextos SELinux (se novos arquivos)
sudo restorecon -R /var/www/auth.paxa.dev

# 4. Reinicie o serviço
sudo systemctl start auth.paxa.dev
```

## 🎨 Tema

O projeto utiliza TailwindCSS v4 com tema escuro configurado. Os componentes seguem um design minimalista com bordas e transições suaves.
