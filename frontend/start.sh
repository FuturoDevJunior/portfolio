#!/bin/bash
# Script de inicialização do projeto DevFerreiraG
# Autor: DevFerreiraG
# Uso: ./start.sh [dev|prod|maintenance-on|maintenance-off]

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "================================================="
echo "           DevFerreiraG - Inicialização          "
echo "================================================="
echo -e "${NC}"

# Verificar argumentos
MODE=${1:-dev}

# Função para iniciar em modo desenvolvimento
start_dev() {
    echo -e "${GREEN}Iniciando em modo de desenvolvimento...${NC}"
    echo -e "${YELLOW}Iniciando backend...${NC}"
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    echo -e "${YELLOW}Iniciando frontend...${NC}"
    npm run dev &
    FRONTEND_PID=$!
    
    echo -e "${GREEN}Ambiente de desenvolvimento inicializado!${NC}"
    echo -e "${YELLOW}Backend PID: ${BACKEND_PID}${NC}"
    echo -e "${YELLOW}Frontend PID: ${FRONTEND_PID}${NC}"
    echo -e "${BLUE}Pressione Ctrl+C para encerrar ambos os processos${NC}"
    
    # Função para encerrar processos ao sair
    trap "kill $BACKEND_PID $FRONTEND_PID; echo -e '${RED}Processos encerrados${NC}'; exit" INT TERM
    
    # Manter script em execução
    wait
}

# Função para iniciar em modo produção
start_prod() {
    echo -e "${GREEN}Iniciando em modo de produção...${NC}"
    
    echo -e "${YELLOW}Construindo o frontend...${NC}"
    npm run build
    
    echo -e "${YELLOW}Iniciando o backend em produção...${NC}"
    cd backend
    npm run start:prod
    
    echo -e "${GREEN}Ambiente de produção inicializado!${NC}"
    echo -e "${BLUE}Use 'npm run stop:prod' no diretório backend para encerrar${NC}"
}

# Função para verificar a saúde do sistema
check_health() {
    echo -e "${GREEN}Verificando a saúde do sistema...${NC}"
    ./tools/monitoring/health-check.sh
}

# Função para ativar modo de manutenção
maintenance_on() {
    echo -e "${YELLOW}Ativando modo de manutenção...${NC}"
    cd tools/maintenance
    ./toggle-maintenance.sh on
    cd ../..
    echo -e "${GREEN}Modo de manutenção ativado!${NC}"
}

# Função para desativar modo de manutenção
maintenance_off() {
    echo -e "${YELLOW}Desativando modo de manutenção...${NC}"
    cd tools/maintenance
    ./toggle-maintenance.sh off
    cd ../..
    echo -e "${GREEN}Modo de manutenção desativado!${NC}"
}

# Executar função com base no argumento
case $MODE in
    dev)
        start_dev
        ;;
    prod)
        start_prod
        ;;
    health)
        check_health
        ;;
    maintenance-on)
        maintenance_on
        ;;
    maintenance-off)
        maintenance_off
        ;;
    *)
        echo -e "${RED}Modo desconhecido: $MODE${NC}"
        echo -e "${YELLOW}Modos disponíveis:${NC}"
        echo -e "  dev             - Inicia em modo desenvolvimento"
        echo -e "  prod            - Inicia em modo produção"
        echo -e "  health          - Verifica a saúde do sistema"
        echo -e "  maintenance-on  - Ativa o modo de manutenção"
        echo -e "  maintenance-off - Desativa o modo de manutenção"
        exit 1
        ;;
esac 