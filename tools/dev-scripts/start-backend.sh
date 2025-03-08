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

echo -e "${YELLOW}Verificando se a porta 3001 está em uso...${NC}"
if lsof -ti:3001 > /dev/null; then
    echo -e "${YELLOW}Matando processo na porta 3001...${NC}"
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# Verificar se ainda está em uso
if lsof -ti:3001 > /dev/null; then
    echo -e "${RED}ERRO: Não foi possível liberar a porta 3001${NC}"
    exit 1
fi

echo -e "${GREEN}Iniciando o backend...${NC}"
# Usar cd com || exit para evitar continuar se o diretório não existir
cd "${PROJECT_ROOT}/backend" || { echo -e "${RED}ERRO: Diretório backend não encontrado${NC}"; exit 1; }
# Limitar uso de memória para evitar que seja finalizado pelo OS
export NODE_OPTIONS="--max-old-space-size=2048"
NODE_ENV=development node dist/index.js 