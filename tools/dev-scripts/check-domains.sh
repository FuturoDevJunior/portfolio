#!/bin/bash

# Script para verificar a configuração de múltiplos domínios
# Autor: DevFerreiraG
# Uso: ./check-domains.sh

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Verificador de Configuração Multi-Domínio${NC}"
echo "==============================================="

# Verificar se curl está instalado
if ! command -v curl &> /dev/null; then
    echo -e "${RED}Erro: curl não está instalado. Por favor, instale-o para continuar.${NC}"
    exit 1
fi

# Definir domínios para testar
PRIMARY_DOMAIN="www.devferreirag.com"
SECONDARY_DOMAIN="www.devferreirag.com.br"
API_DOMAIN="api.devferreirag.com"
API_DOMAIN_BR="api.devferreirag.com.br"

# Verificar redirecionamento entre domínios
echo -e "\n${YELLOW}Verificando redirecionamento entre domínios...${NC}"

# Testar redirecionamento do domínio .com.br para .com
REDIRECT_TEST=$(curl -s -I -H "Host: $SECONDARY_DOMAIN" "http://localhost:3001" | grep -i "location" | grep -q "$PRIMARY_DOMAIN")
REDIRECT_STATUS=$?

if [ $REDIRECT_STATUS -eq 0 ]; then
    echo -e "${GREEN}✓ Redirecionamento de $SECONDARY_DOMAIN para $PRIMARY_DOMAIN configurado corretamente${NC}"
else
    echo -e "${RED}✗ Redirecionamento de $SECONDARY_DOMAIN para $PRIMARY_DOMAIN NÃO está configurado${NC}"
    echo "  Verifique o middleware domainRedirect.ts"
fi

# Verificar configuração CORS
echo -e "\n${YELLOW}Verificando configuração CORS no backend...${NC}"
grep -q "CORS_ORIGINS.*$PRIMARY_DOMAIN" backend/.env
CORS_PRIMARY=$?

grep -q "CORS_ORIGINS.*$SECONDARY_DOMAIN" backend/.env
CORS_SECONDARY=$?

if [ $CORS_PRIMARY -eq 0 ] && [ $CORS_SECONDARY -eq 0 ]; then
    echo -e "${GREEN}✓ CORS configurado corretamente para ambos os domínios${NC}"
else
    echo -e "${RED}✗ CORS não está configurado corretamente para ambos os domínios${NC}"
    echo "  Verifique a variável CORS_ORIGINS em backend/.env"
fi

# Verificar Content Security Policy
echo -e "\n${YELLOW}Verificando Content Security Policy no frontend...${NC}"
grep -q "connect-src.*$API_DOMAIN" frontend/vercel.json
CSP_API=$?

grep -q "connect-src.*$API_DOMAIN_BR" frontend/vercel.json
CSP_API_BR=$?

if [ $CSP_API -eq 0 ] && [ $CSP_API_BR -eq 0 ]; then
    echo -e "${GREEN}✓ CSP configurado corretamente para ambas as APIs${NC}"
else
    echo -e "${RED}✗ CSP não está configurado corretamente para ambas as APIs${NC}"
    echo "  Verifique a diretiva connect-src no Content-Security-Policy em frontend/vercel.json"
fi

# Verificar configuração .env.production
echo -e "\n${YELLOW}Verificando configuração de produção no frontend...${NC}"
if [ -f frontend/.env.production ]; then
    echo -e "${GREEN}✓ Arquivo .env.production encontrado${NC}"
    
    grep -q "VITE_BASE_URL.*api" frontend/.env.production
    ENV_API=$?
    
    if [ $ENV_API -eq 0 ]; then
        echo -e "${GREEN}✓ VITE_BASE_URL configurado corretamente${NC}"
    else
        echo -e "${RED}✗ VITE_BASE_URL não está configurado corretamente${NC}"
        echo "  Verifique a variável VITE_BASE_URL em frontend/.env.production"
    fi
else
    echo -e "${RED}✗ Arquivo .env.production não encontrado${NC}"
    echo "  Crie o arquivo frontend/.env.production com as configurações necessárias"
fi

echo -e "\n${YELLOW}Verificação concluída.${NC}"
echo "==============================================="
echo -e "${YELLOW}Recomendação:${NC} Certifique-se de que seus domínios estejam"
echo "corretamente configurados no painel da Vercel e DNS." 