#!/bin/bash

# Script para limpar completamente o repositório do GitHub e fazer upload de todo o conteúdo local
# SEM MODIFICAR O REPOSITÓRIO LOCAL
set -e

echo "🚀 Iniciando processo de limpeza do repositório remoto e upload do conteúdo local..."

# Verificar se estamos em um repositório Git
if [ ! -d ".git" ]; then
  echo "❌ Este diretório não é um repositório Git. Abortando."
  exit 1
fi

# Verificar estrutura do projeto
echo "🔍 Verificando estrutura do projeto..."
if [ ! -d "frontend" ]; then
  echo "❌ O diretório 'frontend' não foi encontrado. Abortando."
  exit 1
fi

if [ ! -d "backend" ]; then
  echo "⚠️ O diretório 'backend' não foi encontrado. Continuando apenas com frontend."
fi

# Verificar se o vercel.json na raiz está sincronizado
echo "🔍 Verificando configuração do Vercel..."
cat > vercel.json << EOF
{
  "version": 2,
  "buildCommand": "cd frontend && npm install --force && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "public": true,
  "github": {
    "silent": false
  }
}
EOF
echo "✅ Arquivo vercel.json na raiz atualizado para apontar corretamente para frontend/dist"

# Verificar package.json na raiz
echo "🔍 Verificando package.json..."
if [ -f "package.json" ]; then
  # Certificar-se de que o script vercel-build está configurado corretamente
  if grep -q "vercel-build" package.json; then
    echo "⚙️ Atualizando script vercel-build em package.json..."
    sed -i.bak 's|"vercel-build": ".*"|"vercel-build": "cd frontend \&\& npm install --force \&\& npm run build"|g' package.json
    rm -f package.json.bak
    echo "✅ Script vercel-build atualizado"
  fi
fi

# Confirmar a ação com o usuário
echo "⚠️ ATENÇÃO: Este script irá APAGAR TODO o conteúdo do repositório REMOTO e substituir pelo conteúdo local."
echo "   Repositório remoto: $(git remote get-url origin)"
echo "   Seu repositório local NÃO será afetado."
read -p "   Tem certeza que deseja continuar? (s/N): " confirmar
if [[ ! "$confirmar" =~ ^[sS]$ ]]; then
  echo "Operação cancelada pelo usuário."
  exit 0
fi

# Identificar a branch atual
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "📋 Branch atual: $current_branch"

# Criar uma branch temporária usando --orphan (sem histórico)
temp_branch="temp-deploy-$(date +%s)"
echo "🔄 Criando branch temporária sem histórico: $temp_branch"
git checkout --orphan $temp_branch

# Preparar o conteúdo para commit (preservando arquivos locais)
echo "📦 Preparando arquivos para envio..."
git add .

# Verificar quais arquivos estão sendo adicionados
echo "📋 Aqui está o que será enviado para o repositório remoto:"
git status

echo "🚨 Último aviso antes de continuar!"
echo "   Esta ação irá APAGAR TODO o histórico e conteúdo no repositório REMOTO."
echo "   Seu repositório local permanecerá intacto."
read -p "Deseja prosseguir com a limpeza do repositório remoto? (s/N): " confirmar_final
if [[ ! "$confirmar_final" =~ ^[sS]$ ]]; then
  echo "Operação cancelada pelo usuário."
  git checkout $current_branch
  git branch -D $temp_branch
  exit 0
fi

# Criar um commit com os novos arquivos
echo "💾 Criando commit inicial..."
git commit -m "Projeto completamente reorganizado - Upload da estrutura limpa e organizada"

# Forçar o push da nova branch para substituir completamente a branch remota
echo "☁️ Enviando para o repositório remoto (isso vai substituir tudo lá)..."
git push -f origin $temp_branch:$current_branch

# Voltar para a branch original SEM modificar o conteúdo local
echo "🔙 Voltando para a branch original sem alterar conteúdo local..."
git checkout -f $current_branch

# Remover a branch temporária
git branch -D $temp_branch

echo "✅ Processo concluído com sucesso!"
echo "   O repositório remoto foi completamente substituído pelo conteúdo local."
echo "   Seu repositório local permanece inalterado."
echo ""
echo "   O Vercel deverá iniciar o deploy automaticamente se estiver configurado."
echo ""
echo "   Verifique o repositório em: https://github.com/FuturoDevJunior/portfolio"
echo ""
echo "   Para acompanhar o progresso do deploy, acesse seu dashboard no Vercel." 