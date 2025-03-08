#!/bin/bash

# Script para implantar o frontend diretamente no Vercel
set -e

echo "🚀 Iniciando processo de implantação direta do frontend no Vercel..."

# Verifica se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI não encontrado! Instalando globalmente..."
  npm install -g vercel
fi

# Navegar para o diretório frontend
cd frontend || { echo "❌ Diretório frontend não encontrado!"; exit 1; }
echo "📂 Agora em: $(pwd)"

# Verificar arquivo vercel.json
if [ ! -f "vercel.json" ]; then
  echo "❌ Arquivo vercel.json não encontrado no diretório frontend!"
  exit 1
fi

echo "✅ Usando o seguinte arquivo vercel.json:"
cat vercel.json | grep -v '^\s*$'

# Verificar arquivo .env.production
if [ ! -f ".env.production" ]; then
  echo "❌ Arquivo .env.production não encontrado no diretório frontend!"
  exit 1
fi

echo "✅ Usando as seguintes variáveis de ambiente de produção:"
cat .env.production | grep -v '^\s*$\|^#'

# Confirmar com o usuário
echo ""
echo "⚠️ ATENÇÃO: Este script implantará o frontend diretamente no Vercel."
read -p "   Deseja continuar? (s/N): " confirmar
if [[ ! "$confirmar" =~ ^[sS]$ ]]; then
  echo "Operação cancelada pelo usuário."
  exit 0
fi

# Realizar o deploy
echo "🌐 Implantando o frontend no Vercel..."
vercel --prod

echo "✅ Processo concluído!"
echo "   Verifique o status da implantação no dashboard do Vercel." 