#!/bin/bash
# Script de verificação de saúde do sistema para o site DevFerreiraG
# Uso: ./health-check.sh [--notify]

# Configurações
LOG_FILE="../logs/health-check.log"
# Ajustando para ambiente de desenvolvimento local
SITE_URL="http://localhost:3000"
ADMIN_URL="http://localhost:3001/api/admin/health-check"
API_KEY="${ADMIN_API_KEY:-admin_dev_key}"
THRESHOLD_CPU=90
THRESHOLD_MEMORY=90
THRESHOLD_DISK=90
SEND_NOTIFICATIONS=false

# Detectar ambiente
IS_DEV=true
if [[ "$SITE_URL" == *"https://"* ]]; then
  IS_DEV=false
fi

# Cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar argumentos
for arg in "$@"; do
  case $arg in
    --notify)
      SEND_NOTIFICATIONS=true
      shift
      ;;
  esac
done

# Criar diretório de logs se não existir
mkdir -p $(dirname "$LOG_FILE")

# Iniciar log
echo "===== Verificação de Saúde $(date) =====" | tee -a "$LOG_FILE"

# Função para registrar mensagens
log_message() {
  local level=$1
  local message=$2
  local color=$NC
  
  case $level in
    "INFO") color=$GREEN ;;
    "WARN") color=$YELLOW ;;
    "ERROR") color=$RED ;;
  esac
  
  echo -e "${color}[$level] $message${NC}" | tee -a "$LOG_FILE"
}

# Função para verificar conectividade HTTP
check_http() {
  local url=$1
  local name=$2
  local expected_code=${3:-200}
  local start_time=$(date +%s.%N)
  
  log_message "INFO" "Verificando $name ($url)..."
  
  local response=$(curl -sL -w "%{http_code}\\n" "$url" -o /dev/null)
  local status=$?
  local end_time=$(date +%s.%N)
  local response_time=$(echo "$end_time - $start_time" | bc)
  
  if [ $status -ne 0 ]; then
    log_message "ERROR" "Falha ao conectar com $name"
    return 1
  elif [ "$response" != "$expected_code" ]; then
    log_message "ERROR" "Resposta inesperada de $name: $response (esperado: $expected_code)"
    return 1
  else
    log_message "INFO" "$name está online (resposta: $response, tempo: ${response_time}s)"
    return 0
  fi
}

# Função para verificar recursos do sistema
check_system_resources() {
  log_message "INFO" "Verificando recursos do sistema..."
  
  # Verificar CPU
  if command -v mpstat &> /dev/null; then
    cpu_usage=$(mpstat 1 1 | awk '/Average:/ {print 100 - $NF}')
    if (( $(echo "$cpu_usage > $THRESHOLD_CPU" | bc -l) )); then
      log_message "WARN" "Uso de CPU elevado: ${cpu_usage}%"
    else
      log_message "INFO" "Uso de CPU: ${cpu_usage}%"
    fi
  else
    log_message "INFO" "Ferramenta mpstat não disponível, pulando verificação de CPU"
  fi
  
  # Verificar Memória
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    memory_usage=$(vm_stat | perl -ne '/page size of (\d+)/ and $size=$1; /Pages free: (\d+)/ and $free=$1*$size; END { print int(100*(1-$free/4096/1024/1024)); }')
  else
    # Linux
    memory_usage=$(free | grep Mem | awk '{print int($3/$2 * 100.0)}')
  fi
  
  if [ -n "$memory_usage" ]; then
    if (( $(echo "$memory_usage > $THRESHOLD_MEMORY" | bc -l) )); then
      log_message "WARN" "Uso de memória elevado: ${memory_usage}%"
    else
      log_message "INFO" "Uso de memória: ${memory_usage}%"
    fi
  fi
  
  # Verificar espaço em disco
  disk_usage=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
  if (( disk_usage > THRESHOLD_DISK )); then
    log_message "WARN" "Uso de disco elevado: ${disk_usage}%"
  else
    log_message "INFO" "Uso de disco: ${disk_usage}%"
  fi
}

# Função para verificar logs de erro
check_error_logs() {
  log_message "INFO" "Verificando logs de erro recentes..."
  
  local error_log="./logs/error.log"
  if [ -f "$error_log" ]; then
    local recent_errors=$(grep -c "ERROR" "$error_log" 2>/dev/null || echo "0")
    local critical_errors=$(grep -c "CRITICAL" "$error_log" 2>/dev/null || echo "0")
    
    log_message "INFO" "Erros nas últimas 24h: $recent_errors (críticos: $critical_errors)"
    
    if [ "$critical_errors" -gt 0 ]; then
      log_message "WARN" "Detectados erros críticos nos logs!"
      # Mostrar últimos 3 erros críticos
      grep "CRITICAL" "$error_log" | tail -n 3 | while read -r line; do
        log_message "INFO" "  $line"
      done
    fi
  else
    log_message "INFO" "Arquivo de log não encontrado em $error_log"
  fi
}

# Função para verificar o status do backend
check_backend_api() {
  log_message "INFO" "Verificando API do backend..."
  
  local response=$(curl -s -H "X-API-Key: $API_KEY" "$ADMIN_URL")
  local status=$?
  
  if [ $status -ne 0 ]; then
    log_message "ERROR" "Não foi possível conectar à API do backend"
    return 1
  fi
  
  # Verificar a resposta JSON
  if command -v jq &> /dev/null; then
    local api_status=$(echo "$response" | jq -r '.status // "unknown"')
    local api_uptime=$(echo "$response" | jq -r '.uptime // "unknown"')
    
    if [ "$api_status" == "operational" ]; then
      log_message "INFO" "API do backend está operacional (uptime: ${api_uptime}s)"
    else
      log_message "WARN" "Status da API: $api_status"
    fi
  else
    # Verificação básica sem jq
    if [[ "$response" == *"operational"* ]]; then
      log_message "INFO" "API do backend parece estar operacional"
    else
      log_message "WARN" "Resposta da API não contém 'operational'"
    fi
  fi
}

# Função para verificar certificado SSL
check_ssl_certificate() {
  log_message "INFO" "Verificando certificado SSL..."
  
  # Pular verificação SSL em desenvolvimento local
  if [ "$IS_DEV" = true ]; then
    log_message "INFO" "Ambiente de desenvolvimento local detectado, pulando verificação SSL"
    return 0
  fi
  
  if command -v openssl &> /dev/null; then
    # Extrair domínio da URL
    domain=$(echo "$SITE_URL" | sed -e 's|^[^/]*//||' -e 's|/.*$||')
    
    # Verificar data de expiração
    expiry_date=$(echo | openssl s_client -servername "$domain" -connect "$domain":443 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
    
    if [ -n "$expiry_date" ]; then
      # Converter para timestamp
      expiry_timestamp=$(date -j -f "%b %d %H:%M:%S %Y %Z" "$expiry_date" "+%s" 2>/dev/null)
      current_timestamp=$(date "+%s")
      
      # Calcular dias restantes
      days_remaining=$(( (expiry_timestamp - current_timestamp) / 86400 ))
      
      if [ $days_remaining -lt 30 ]; then
        log_message "WARN" "Certificado SSL expira em $days_remaining dias ($expiry_date)"
      else
        log_message "INFO" "Certificado SSL válido por mais $days_remaining dias"
      fi
    else
      log_message "ERROR" "Não foi possível verificar o certificado SSL"
    fi
  else
    log_message "INFO" "OpenSSL não disponível, pulando verificação de SSL"
  fi
}

# Função para enviar notificações
send_notification() {
  local subject="$1"
  local body="$2"
  
  if [ "$SEND_NOTIFICATIONS" = true ]; then
    log_message "INFO" "Enviando notificação: $subject"
    # Implementação simplificada - aqui você integaria com um serviço real
    echo "NOTIFICAÇÃO: $subject" >> "$LOG_FILE"
    echo "$body" >> "$LOG_FILE"
    
    # Exemplo de como enviar um email (descomente e configure se necessário)
    # echo "$body" | mail -s "$subject" admin@devferreirag.com
  fi
}

# Executar verificações
main() {
  local errors=0
  local warnings=0
  
  # Verificar site principal
  check_http "$SITE_URL" "Site principal"
  errors=$((errors + $?))
  
  # Verificar recursos do sistema
  check_system_resources
  
  # Verificar logs de erro
  check_error_logs
  
  # Verificar API do backend
  check_backend_api
  errors=$((errors + $?))
  
  # Verificar certificado SSL
  check_ssl_certificate
  
  # Relatório final
  echo "===== Sumário da Verificação =====" | tee -a "$LOG_FILE"
  if [ $errors -gt 0 ]; then
    log_message "ERROR" "Verificação concluída com $errors erros"
    send_notification "ALERTA: Problemas detectados no site" "A verificação de saúde detectou $errors erros. Verifique o log para mais detalhes."
  else
    log_message "INFO" "Verificação concluída com sucesso"
  fi
  
  echo "Verificação completa: $(date)" | tee -a "$LOG_FILE"
  echo "Resultado salvo em $LOG_FILE" | tee -a "$LOG_FILE"
}

# Executar função principal
main 