# Guia de Deployment DevFerreiraG

Este documento oferece instruções detalhadas para implantação do site DevFerreiraG em ambientes de produção.

## Visão Geral

O processo de deployment envolve duas partes principais:

1. **Frontend**: Aplicação React/TypeScript
2. **Backend**: API Node.js/Express

## Pré-requisitos

### Hardware Recomendado

- **Servidor para Backend**: 
  - 2+ vCPUs
  - 4+ GB RAM
  - 20+ GB SSD
  
- **Serviço para Frontend**:
  - Serviço CDN ou servidor estático

### Software

- Node.js 16+
- PM2 
- Nginx ou equivalente
- Certificados SSL
- Git

## Fluxo de Deployment

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Construção │────►│  Validação  │────►│ Implantação │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Build React │     │Testes Auto- │     │Deploy Front-│
│ Build Node  │     │matizados    │     │end & Backend│
└─────────────┘     └─────────────┘     └─────────────┘
```

## Processo Passo a Passo

### 1. Preparação do Ambiente

```bash
# Clonar o repositório
git clone https://github.com/devferreirag/website.git
cd website

# Instalar dependências globais
npm install -g pm2
```

### 2. Deployment do Frontend

```bash
# Instalar dependências
npm install

# Construir o frontend
npm run build

# Verificar os arquivos gerados
ls -la dist/
```

Os arquivos estáticos gerados na pasta `dist/` devem ser hospedados em:

- Vercel (recomendado)
- Netlify
- Servidor Nginx
- AWS S3 + CloudFront

Para o Vercel, a configuração já está presente em `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        }
      ]
    }
  ]
}
```

### 3. Deployment do Backend

```bash
# Navegar para o diretório backend
cd backend

# Instalar dependências
npm run setup

# Configurar as variáveis de ambiente
cp .env.example .env
nano .env

# Construir o backend
npm run build

# Iniciar o serviço com PM2
npm run start:prod

# Verificar o status
pm2 status
```

### 4. Configuração do Nginx

Para servir o backend via proxy reverso, configure o Nginx:

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

### 5. Verificação Pós-Deployment

Execute o script de verificação para garantir que tudo está funcionando:

```bash
# Na raiz do projeto
./start.sh health
```

Ou execute diretamente o script de verificação:

```bash
# A partir da raiz do projeto
cd tools/monitoring
./health-check.sh
```

## Manutenção e Atualizações

### Atualização do Site

Para atualizar o site, siga estes passos:

1. Puxe as alterações mais recentes:
   ```bash
   git pull origin main
   ```

2. Reconstrua o frontend:
   ```bash
   npm run build
   ```

3. Atualize o backend:
   ```bash
   cd backend
   npm install
   npm run build
   npm run restart:prod
   ```

### Modo de Manutenção

Para ativar o modo de manutenção:

```bash
./start.sh maintenance-on
```

Para desativar:

```bash
./start.sh maintenance-off
```

### Backup

Faça backups regulares:

```bash
# Exemplo de script de backup (adicionar ao crontab)
0 2 * * * cd /caminho/para/projeto && ./tools/backup/backup-data.sh
```

## Solução de Problemas

### Logs

Verifique os logs para diagnóstico:

```bash
# Logs do backend
cd backend
npm run logs:prod

# Logs de acesso do Nginx
sudo tail -f /var/log/nginx/api.devferreirag.com_access.log

# Logs de erro do Nginx
sudo tail -f /var/log/nginx/api.devferreirag.com_error.log
```

### Problemas Comuns

#### O site não carrega

1. Verifique se o serviço está rodando:
   ```bash
   pm2 status
   ```

2. Verifique configurações do Nginx:
   ```bash
   sudo nginx -t
   ```

3. Verifique logs de erro.

#### Erros 500 na API

1. Verifique se variáveis de ambiente estão corretas.
2. Verifique logs do servidor.
3. Reinicie o serviço:
   ```bash
   cd backend
   npm run restart:prod
   ```

## Rollback

Em caso de problemas, faça rollback para a versão anterior:

```bash
# Voltar para um commit específico
git checkout <commit_hash>

# Reconstruir e reiniciar
npm run build
cd backend
npm run build
npm run restart:prod
```

## Monitoramento

### Monitoramento com PM2

```bash
# Status dos processos
pm2 status

# Monitoramento em tempo real
pm2 monit

# Logs
pm2 logs devferreirag-api
```

### Alertas

Configure alertas para:

- Uso de CPU > 80%
- Uso de memória > 80%
- Disco < 20% livre
- Erros HTTP 5xx > 5 por minuto

## Referências

- [Documentação do PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Configuração do Nginx](https://nginx.org/en/docs/)
- [Guia de Segurança Web](https://web.dev/secure/)
- [Script de inicialização do projeto](../start.sh) 