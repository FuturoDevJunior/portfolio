#!/bin/bash
# shellcheck disable=SC1090,SC2164

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Obter diretório do script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." &> /dev/null && pwd )"

echo -e "${YELLOW}Verificando se as portas 5173 e 5174 estão em uso...${NC}"
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
lsof -ti:5174 | xargs kill -9 2>/dev/null || true
sleep 1

# Verificar se as portas foram liberadas
if lsof -ti:5173 > /dev/null || lsof -ti:5174 > /dev/null; then
    echo -e "${YELLOW}AVISO: Ainda há processos nas portas 5173 ou 5174, tentando novamente...${NC}"
    lsof -ti:5173 | xargs kill -9 2>/dev/null || true
    lsof -ti:5174 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

echo -e "${GREEN}Iniciando o frontend...${NC}"
# Usar cd com || exit para evitar continuar se o diretório não existir
cd "${PROJECT_ROOT}/frontend" || { echo -e "${RED}ERRO: Diretório frontend não encontrado${NC}"; exit 1; }
# Limite a memória para evitar que seja finalizado pelo OS
export NODE_OPTIONS="--max-old-space-size=2048"
npm run dev 