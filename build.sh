#!/bin/bash

# Script específico para build no Vercel

echo "🚀 Iniciando build no Vercel..."

# Forçar Node.js 18
export NODE_VERSION=18
export NODE_OPTIONS=--max_old_space_size=4096

# Determinar diretório atual e navegar para o projeto
CURRENT_DIR=$(pwd)
echo "📂 Diretório atual: $CURRENT_DIR"

# Verificar se estamos na raiz ou já dentro do frontend
if [[ "$CURRENT_DIR" != *"/frontend" ]]; then
  echo "📂 Navegando para o diretório frontend..."
  cd frontend || exit 1
  echo "📂 Agora em: $(pwd)"
fi

# Instalar dependências com --force
echo "📦 Instalando dependências do frontend..."
npm install --force

# Aplicar fix para dependências conflitantes se necessário
if [ $? -ne 0 ]; then
  echo "⚠️ Problemas de dependência encontrados, tentando método alternativo..."
  npm install --legacy-peer-deps
fi

# Construir o frontend
echo "🔨 Construindo o frontend..."
npm run build

# Verificar resultado
if [ $? -eq 0 ]; then
  echo "✅ Build completo com sucesso!"
  
  # Verificar se o diretório dist foi criado
  if [ -d "dist" ]; then
    echo "📁 Diretório dist criado em $(pwd)/dist"
    ls -la dist
  else
    echo "❌ Diretório dist não encontrado!"
    exit 1
  fi
else
  echo "❌ Falha na build. Verifique os logs acima."
  exit 1
fi 