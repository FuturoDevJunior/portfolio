#!/bin/bash

# Script específico para build no Vercel

echo "🚀 Iniciando build no Vercel..."

# Forçar Node.js 18
export NODE_VERSION=18
export NODE_OPTIONS=--max_old_space_size=4096

# Instalar dependências com --force
echo "📦 Instalando dependências do frontend..."
cd frontend
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
else
  echo "❌ Falha na build. Verifique os logs acima."
  exit 1
fi 