# Painel Administrativo

## Visão Geral

Painel completo de administração para gerenciamento de usuários com funcionalidades de CRUD (Criar, Ler, Atualizar, Deletar).

## Recursos

- ✅ **Listagem paginada** de usuários (10 por página)
- ✅ **Criar novos usuários** com role de admin ou usuário comum
- ✅ **Editar usuários existentes** (nome, email, senha, role)
- ✅ **Deletar usuários** com confirmação
- ✅ **Proteção de rotas** - apenas admins têm acesso
- ✅ **Validação de dados** server-side com Zod
- ✅ **Interface limpa** com Tailwind CSS

## Como Usar

### 1. Criar usuário admin

Execute o seed para criar usuários de teste:

```bash
npm run seed
# ou
pnpm seed
```

Isso criará:
- **Admin**: `admin@example.com` / senha: `admin123`
- **User**: `john@example.com` / senha: `user123`

### 2. Acessar o painel

1. Faça login com a conta de admin
2. Clique no link "Admin" na navegação
3. Você será redirecionado para `/admin/users`

### 3. Funcionalidades disponíveis

#### Listar Usuários
- Acesse `/admin/users`
- Veja todos os usuários com informações de ID, nome, email, role e data de criação
- Navegue entre páginas usando os controles de paginação

#### Criar Novo Usuário
- Clique em "+ Novo Usuário"
- Preencha o formulário:
  - Nome (obrigatório)
  - Email (obrigatório, deve ser único)
  - Senha (mínimo 8 caracteres)
  - Permissão (Usuário ou Administrador)
- Clique em "Criar"

#### Editar Usuário
- Na listagem, clique em "Editar" ao lado do usuário desejado
- Modifique os campos necessários
- Deixe o campo senha em branco para manter a senha atual
- Clique em "Atualizar"

#### Deletar Usuário
- Na listagem, clique em "Deletar"
- Confirme a ação
- **Nota**: Não é possível deletar sua própria conta

## Segurança

### Proteção de Rotas
Todas as rotas admin são protegidas pelo helper `requireAdmin()`:
- Verifica se há sessão ativa
- Valida se o usuário tem role "admin"
- Redireciona para home se não autorizado

### Validação de Dados
Todos os dados são validados com Zod antes de serem processados:
- Campos obrigatórios
- Formato de email válido
- Senha com mínimo de 8 caracteres
- Role válido (user ou admin)

### Senhas
- Todas as senhas são hasheadas com salt único
- Impossível recuperar senha original do banco
- Ao editar, senha vazia mantém a senha atual

## Estrutura de Arquivos

```
src/
├── actions.ts                          # Server actions do admin
├── schemas.ts                          # Schemas de validação Zod
├── lib/
│   └── admin.ts                        # Helpers de autenticação admin
├── app/
│   └── admin/
│       └── users/
│           ├── page.tsx                # Listagem de usuários
│           ├── new/
│           │   └── page.tsx            # Criar novo usuário
│           └── [id]/
│               └── edit/
│                   └── page.tsx        # Editar usuário
└── components/
    └── admin/
        ├── UserForm.tsx                # Formulário de criar/editar
        └── DeleteUserButton.tsx        # Botão de deletar
```

## API Server Actions

### `adminGetUsers(page, pageSize)`
Lista usuários com paginação.

### `adminCreateUser(formData)`
Cria novo usuário. Retorna `{ success: true }` ou `{ error: string }`.

### `adminUpdateUser(formData)`
Atualiza usuário existente. Retorna `{ success: true }` ou `{ error: string }`.

### `adminDeleteUser(userId)`
Deleta usuário. Retorna `{ success: true }` ou `{ error: string }`.

## Melhorias Futuras

Possíveis expansões:
- [ ] Filtros de busca por nome/email
- [ ] Ordenação por colunas
- [ ] Exportação de dados (CSV/JSON)
- [ ] Logs de auditoria
- [ ] Bulk operations (deletar múltiplos)
- [ ] Upload de avatar
- [ ] Recuperação de senha
