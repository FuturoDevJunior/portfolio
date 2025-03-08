#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento local
set -e

echo "🚀 Iniciando ambiente de desenvolvimento local"

show_help() {
  echo "Uso: ./dev.sh [opções]"
  echo "Opções:"
  echo "  --frontend-only  : Inicia apenas o frontend"
  echo "  --backend-only   : Inicia apenas o backend"
  echo "  --help           : Mostra esta ajuda"
  exit 0
}

# Processar argumentos
FRONTEND_ONLY=false
BACKEND_ONLY=false

for arg in "$@"; do
  case $arg in
    --frontend-only)
      FRONTEND_ONLY=true
      ;;
    --backend-only)
      BACKEND_ONLY=true
      ;;
    --help)
      show_help
      ;;
  esac
done

# Função para limpar ao encerrar
cleanup() {
  echo ""
  echo "🧹 Limpando processos..."
  
  if [ ! -z "$BACKEND_PID" ]; then
    echo "  Encerrando backend (PID: $BACKEND_PID)"
    kill $BACKEND_PID 2>/dev/null || true
  fi
  
  if [ ! -z "$FRONTEND_PID" ]; then
    echo "  Encerrando frontend (PID: $FRONTEND_PID)"
    kill $FRONTEND_PID 2>/dev/null || true
  fi
  
  echo "✅ Ambiente encerrado!"
  exit 0
}

# Registrar a função de limpeza para sinais de término
trap cleanup SIGINT SIGTERM

# Verificar Node.js
NODE_VERSION=$(node -v 2>/dev/null || echo "not-installed")
if [[ "$NODE_VERSION" == "not-installed" ]]; then
  echo "❌ Node.js não está instalado. Por favor, instale o Node.js v16 ou superior."
  exit 1
fi

# Assegurar o diretório correto
PROJECT_ROOT="$(dirname "$0")"
cd "$PROJECT_ROOT"
echo "📂 Diretório do projeto: $(pwd)"

# Verificar se as pastas existem
if [ ! -d "frontend" ]; then
  echo "❌ O diretório 'frontend' não foi encontrado. Por favor, verifique a estrutura do projeto."
  exit 1
fi

if [ ! -d "backend" ] && [ "$FRONTEND_ONLY" = false ]; then
  echo "❌ O diretório 'backend' não foi encontrado. Por favor, verifique a estrutura do projeto."
  echo "   Continuando apenas com o frontend..."
  FRONTEND_ONLY=true
fi

# Instalar dependências se necessário
if [ "$FRONTEND_ONLY" = false ]; then
  if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    (cd backend && npm install)
  fi
fi

if [ "$BACKEND_ONLY" = false ]; then
  if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    (cd frontend && npm install)
  fi
fi

# Iniciar o backend
if [ "$FRONTEND_ONLY" = false ]; then
  echo "🔧 Iniciando backend em http://localhost:3001"
  (cd backend && npm run dev) &
  BACKEND_PID=$!
  
  # Verificar se o backend iniciou corretamente
  sleep 2
  if ! ps -p $BACKEND_PID > /dev/null; then
    echo "⚠️ Aviso: backend parece ter falhado ao iniciar."
    echo "  Tente iniciar manualmente com: cd backend && npm run dev"
    echo "  Continuando apenas com o frontend..."
  else
    echo "✅ Backend iniciado com sucesso (PID: $BACKEND_PID)"
  fi
  
  # Aguardar o backend iniciar
  echo "⏳ Aguardando o backend se estabilizar..."
  sleep 3
fi

# Iniciar o frontend
if [ "$BACKEND_ONLY" = false ]; then
  echo "🎨 Iniciando frontend em http://localhost:5173"
  (cd frontend && npm run dev) &
  FRONTEND_PID=$!
  
  # Verificar se o frontend iniciou corretamente
  sleep 2
  if ! ps -p $FRONTEND_PID > /dev/null; then
    echo "⚠️ Aviso: frontend parece ter falhado ao iniciar."
    echo "  Tente iniciar manualmente com: cd frontend && npm run dev"
  else
    echo "✅ Frontend iniciado com sucesso (PID: $FRONTEND_PID)"
  fi
fi

echo ""
echo "✨ Ambiente de desenvolvimento iniciado!"

if [ "$FRONTEND_ONLY" = false ]; then
  echo "📝 Backend: http://localhost:3001"
fi

if [ "$BACKEND_ONLY" = false ]; then
  echo "🖥️ Frontend: http://localhost:5173"
fi

echo "⚠️ Pressione Ctrl+C para encerrar os serviços"
echo ""
echo "ℹ️ Se algum serviço falhar, você pode iniciar manualmente com:"
echo "  Backend: cd backend && npm run dev"
echo "  Frontend: cd frontend && npm run dev"

# Aguardar indefinidamente
wait 