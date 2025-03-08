# Implantação em Produção - www.devferreirag.com

Este documento contém um resumo das etapas necessárias para a implantação da API de analytics em produção para o site www.devferreirag.com. Para instruções detalhadas, consulte o arquivo [DEPLOYMENT.md](./DEPLOYMENT.md).

## Checklist de Pré-implantação

- [ ] Variáveis de ambiente configuradas corretamente em `.env`
- [ ] Testes automatizados executados com sucesso
- [ ] Vulnerabilidades de dependências verificadas (npm audit)
- [ ] Certificados SSL válidos e configurados
- [ ] Domínio api.devferreirag.com configurado no DNS

## Comandos para Implantação

```bash
# 1. Clone o repositório
git clone https://github.com/devferreirag/analytics-api.git
cd analytics-api

# 2. Configure o ambiente
cp .env.example .env
nano .env  # Edite as variáveis para produção

# 3. Instale e construa a aplicação
npm run setup

# 4. Inicie o serviço com PM2
npm run start:prod

# 5. Verifique o status
pm2 status
```

## Configuração do Frontend

Adicione o seguinte script no `<head>` do site www.devferreirag.com:

```html
<script src="https://api.devferreirag.com/js/analytics.js"></script>
```

## Verificação Pós-implantação

Execute o script de verificação para garantir que tudo está funcionando corretamente:

```bash
# Usando o script npm
npm run check:prod

# Ou diretamente
NODE_ENV=production npx ts-node src/test-scripts/production-deploy-check.ts
```

## Tarefas de Manutenção

- Backup diário dos logs e dados (já configurado via cron)
- Rotação semanal de logs: `npm run log:rotate` (já configurado via cron)
- Monitoramento com PM2 e alertas configurados

## Contatos de Emergência

- DevOps: devops@devferreirag.com / (11) 99999-9999
- Backend: backend@devferreirag.com / (11) 88888-8888

## Documentação Adicional

- [Guia de Implantação Detalhado](./DEPLOYMENT.md)
- [API de Analytics e Marketing](./README.md)
- [Solução de Problemas](./TROUBLESHOOTING.md) (se existir) 