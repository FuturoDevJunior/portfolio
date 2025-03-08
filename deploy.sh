#!/bin/bash

# Script para implantar o projeto no Vercel

echo "🚀 Iniciando processo de implantação..."

# Verifica se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI não encontrado! Instale com: npm install -g vercel"
  exit 1
fi

# Determinar diretório atual
CURRENT_DIR=$(pwd)
echo "📂 Diretório atual: $CURRENT_DIR"

# Instala dependências do workspace se necessário
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências do workspace..."
  npm install
fi

# Constrói o frontend
echo "🔨 Construindo o frontend..."
if [[ "$CURRENT_DIR" != *"/frontend" ]]; then
  cd frontend || { echo "❌ Diretório frontend não encontrado!"; exit 1; }
else
  echo "📂 Já estamos no diretório frontend"
fi

echo "📂 Agora em: $(pwd)"
npm install
npm run build

# Verificar se a construção foi bem-sucedida
if [ -d "dist" ]; then
  echo "✅ Build completo com sucesso!"
  echo "🌐 Implantando no Vercel..."
  
  # Implantação no Vercel
  echo "   Enviando para o Vercel..."
  vercel --prod
  
  echo "🎉 Implantação concluída!"
else
  echo "❌ Falha na construção do frontend"
  exit 1
fi 