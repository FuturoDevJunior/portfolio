# Guia de Implantação - DevFerreiraG Analytics

Este documento contém instruções detalhadas para implantar o sistema de analytics e marketing em um ambiente de produção.

## Pré-requisitos

- Node.js 16+ instalado no servidor
- PM2 instalado globalmente: `npm install -g pm2`
- Nginx ou outro servidor web para proxy reverso
- Certificado SSL (Let's Encrypt recomendado)

## Arquitetura Recomendada

```
            [CDN]
              |
              ▼
[Cliente] → [Nginx/Proxy] → [API Node.js]
                              |
                              ▼
                          [Base de Dados]
```

## Etapas da Implantação

### 1. Preparação do Ambiente

```bash
# Instalar dependências globais
npm install -g pm2

# Clonar o repositório
git clone https://github.com/devferreirag/analytics-api.git
cd analytics-api

# Copiar arquivo de ambiente
cp .env.example .env

# Editar variáveis de ambiente
nano .env
```

Configurações importantes no `.env`:
```
NODE_ENV=production
PORT=3001
ENABLE_HELMET=true
ENABLE_COMPRESSION=true
HTTPS_ONLY=true
COOKIE_SECRET=<gerar-valor-seguro>
ADMIN_API_KEY=<gerar-valor-seguro>
```

### 2. Instalação e Construção

```bash
# Instalar dependências
npm run setup

# Verificar se o build funcionou corretamente
ls -la dist/
```

### 3. Configuração do PM2

Crie um arquivo `ecosystem.config.js` na raiz:

```javascript
module.exports = {
  apps: [{
    name: 'devferreirag-api',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    combine_logs: true,
    error_file: 'logs/error.log',
    out_file: 'logs/out.log'
  }]
};
```

### 4. Inicialização do Serviço

```bash
# Iniciar o serviço com PM2
npm run start:prod

# Verificar se está rodando
pm2 status

# Verificar logs
npm run logs:prod
```

### 5. Configuração do Nginx

Exemplo de configuração para Nginx:

```nginx
server {
    listen 80;
    server_name api.devferreirag.com;
    
    # Redirecionar HTTP para HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name api.devferreirag.com;
    
    # Certificados SSL
    ssl_certificate     /etc/letsencrypt/live/api.devferreirag.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.devferreirag.com/privkey.pem;
    
    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    
    # Headers de segurança
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # Proxy principal
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Cache para arquivos estáticos
    location /js/ {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 302 7d;
        proxy_cache_valid 404 1h;
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }
    
    # Logs
    access_log /var/log/nginx/api.devferreirag.com_access.log;
    error_log /var/log/nginx/api.devferreirag.com_error.log;
}
```

### 6. Verificar a Implantação

Após a implantação, verifique se tudo está funcionando corretamente:

```bash
# Usando o script npm
npm run check:prod

# Ou diretamente
NODE_ENV=production npx ts-node src/test-scripts/production-deploy-check.ts
```

### 7. Configuração do Frontend

No frontend (www.devferreirag.com), adicione o script:

```html
<script src="https://api.devferreirag.com/js/analytics.js"></script>
```

## Monitoramento

### Monitoramento com PM2

```bash
# Visualizar status
pm2 status

# Visualizar logs
pm2 logs devferreirag-api

# Visualizar monitoramento
pm2 monit
```

### Configurar Alertas

Recomendamos configurar alertas para:
- Uso de CPU acima de 80%
- Uso de memória acima de 70%
- Erros 5xx acima de 5 por minuto
- Tempo de resposta acima de 2000ms

## Backup e Recuperação

Faça backup periódico dos dados:

```bash
# Cron job para backup diário (adicionar ao crontab)
0 2 * * * cd /caminho/para/projeto && npm run backup
```

## Rollback em Caso de Falha

Em caso de problemas, você pode reverter para a versão anterior:

```bash
# Reverter para a versão anterior 
git checkout v1.0.0
npm run setup
npm run restart:prod
```

## Suporte

Para suporte, entre em contato com o time de DevOps:
- Email: devops@devferreirag.com
- Slack: #devferreirag-infra 