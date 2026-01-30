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

## 🎨 Tema

O projeto utiliza TailwindCSS v4 com tema escuro configurado. Os componentes seguem um design minimalista com bordas e transições suaves.
