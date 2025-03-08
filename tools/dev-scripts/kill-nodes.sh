#!/bin/bash
# shellcheck disable=SC2181

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Matando todos os processos Node nas portas 3001, 5173 e 5174...${NC}"

# Matar node nas portas específicas - usando aspas para prevenir globbing e word splitting
lsof -ti:3001 | xargs kill -9 2>/dev/null || echo "Nenhum processo na porta 3001"
lsof -ti:5173 | xargs kill -9 2>/dev/null || echo "Nenhum processo na porta 5173"
lsof -ti:5174 | xargs kill -9 2>/dev/null || echo "Nenhum processo na porta 5174"

# Tentar matar qualquer processo vite ou nodemon que possa estar causando problemas
echo -e "${YELLOW}Procurando por processos vite e nodemon persistentes...${NC}"
pkill -f "vite" || echo "Nenhum processo vite encontrado"
pkill -f "nodemon" || echo "Nenhum processo nodemon encontrado"

# Aguardar um momento para os processos terminarem
sleep 1

echo -e "${GREEN}Verificando se ainda existem processos nas portas:${NC}"
if ! lsof -i:3001 &>/dev/null; then
    echo -e "${GREEN}Porta 3001 está livre!${NC}"
else
    echo -e "${RED}Porta 3001 ainda está em uso!${NC}"
fi

if ! lsof -i:5173 &>/dev/null; then
    echo -e "${GREEN}Porta 5173 está livre!${NC}"
else
    echo -e "${RED}Porta 5173 ainda está em uso!${NC}"
fi

if ! lsof -i:5174 &>/dev/null; then
    echo -e "${GREEN}Porta 5174 está livre!${NC}"
else
    echo -e "${RED}Porta 5174 ainda está em uso!${NC}"
fi

echo -e "${GREEN}Limpeza de processos concluída!${NC}" 