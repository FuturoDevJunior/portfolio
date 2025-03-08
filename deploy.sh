#!/bin/bash

# Script para implantar o projeto no Vercel ou Netlify

echo "🚀 Iniciando processo de implantação..."

# Instala dependências do workspace
echo "📦 Instalando dependências..."
npm install

# Constrói o frontend
echo "🔨 Construindo o frontend..."
cd frontend
npm install
npm run build
cd ..

# Verifica se a construção foi bem-sucedida
if [ -d "frontend/dist" ]; then
  echo "✅ Build completo com sucesso!"
  echo "🌐 Pronto para implantar no Vercel ou Netlify"
  echo "   Use: vercel --prod (para Vercel)"
  echo "   Ou: netlify deploy --prod (para Netlify)"
else
  echo "❌ Falha na construção do frontend"
  exit 1
fi 