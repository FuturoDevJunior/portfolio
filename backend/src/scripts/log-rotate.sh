#!/bin/bash
# Script para rotação e limpeza de logs
# Adicionar ao crontab:
# 0 0 * * 0 /caminho/para/backend/src/scripts/log-rotate.sh > /dev/null 2>&1

# Configurações
APP_DIR="/caminho/para/aplicação"
LOG_DIR="${APP_DIR}/logs"
BACKUP_DIR="${LOG_DIR}/backup"
RETENTION_DAYS=30
DATE_FORMAT=$(date +"%Y-%m-%d")

# Criar diretório de backup se não existir
mkdir -p "${BACKUP_DIR}"

# Verificar se os arquivos de log existem
if [ -f "${LOG_DIR}/out.log" ]; then
    # Compactar e mover logs atuais
    echo "Rotacionando logs de saída..."
    cp "${LOG_DIR}/out.log" "${BACKUP_DIR}/out-${DATE_FORMAT}.log"
    cat /dev/null > "${LOG_DIR}/out.log"
    gzip "${BACKUP_DIR}/out-${DATE_FORMAT}.log"
fi

if [ -f "${LOG_DIR}/error.log" ]; then
    # Compactar e mover logs de erro
    echo "Rotacionando logs de erro..."
    cp "${LOG_DIR}/error.log" "${BACKUP_DIR}/error-${DATE_FORMAT}.log"
    cat /dev/null > "${LOG_DIR}/error.log"
    gzip "${BACKUP_DIR}/error-${DATE_FORMAT}.log"
fi

# Limpar logs antigos (mais de 30 dias)
echo "Removendo logs antigos..."
find "${BACKUP_DIR}" -name "*.gz" -type f -mtime +${RETENTION_DAYS} -delete

echo "Rotação de logs concluída em $(date)"
exit 0 