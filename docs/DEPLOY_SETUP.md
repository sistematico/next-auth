# Configuração do Deploy

## Problema do sudo no GitHub Actions

O deploy via GitHub Actions falha porque o sudo requer senha interativa. Para resolver, configure o sudo sem senha no servidor.

## Solução: Configurar sudoers no servidor

1. **No servidor VPS**, edite o arquivo sudoers:

```bash
sudo visudo -f /etc/sudoers.d/github-deploy
```

2. **Adicione as seguintes linhas** (substitua `seu_usuario` pelo usuário SSH usado no GitHub Actions):

```
# Permitir comandos necessários para o deploy do auth.paxa.dev
seu_usuario ALL=(ALL) NOPASSWD: /usr/bin/systemctl stop auth.paxa.dev.service
seu_usuario ALL=(ALL) NOPASSWD: /usr/bin/systemctl start auth.paxa.dev.service
seu_usuario ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart auth.paxa.dev.service
seu_usuario ALL=(ALL) NOPASSWD: /usr/bin/systemctl status auth.paxa.dev.service
seu_usuario ALL=(ALL) NOPASSWD: /usr/sbin/semanage
seu_usuario ALL=(ALL) NOPASSWD: /usr/sbin/restorecon
seu_usuario ALL=(ALL) NOPASSWD: /usr/sbin/setsebool
seu_usuario ALL=(ALL) NOPASSWD: /usr/sbin/ausearch
```

3. **Salve e saia** (`:wq` no vi/vim)

4. **Teste a configuração:**

```bash
sudo -k  # Limpa o cache de credenciais
sudo systemctl status auth.paxa.dev.service  # Não deve pedir senha
```

## Alternativa: Executar SELinux separadamente

Se preferir não dar permissões sudo, você pode:

1. Executar `selinux.sh` manualmente no servidor uma única vez com sudo
2. Modificar `deploy.sh` para remover a chamada ao `selinux.sh`
3. Usar `systemctl --user` se o serviço estiver configurado como user service

## Verificação após configuração

Após configurar o sudoers, faça um novo push para testar:

```bash
git add .
git commit -m "docs: add deploy setup instructions"
git push
```

O deploy deve funcionar sem pedir senha.
