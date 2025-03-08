#!/bin/bash

# Script para alternar entre a página de manutenção e a aplicação React

if [ -f "index.html.backup" ]; then
  # Se existe um backup, estamos em modo manutenção, voltar para React
  echo "🚀 Ativando o site em modo React..."
  mv index.html index.maintenance.html
  mv index.html.backup index.html
  echo "✅ Site ativado em modo normal (React)!"
else
  # Não existe backup, estamos em modo normal, mudar para manutenção
  echo "🛠️  Ativando modo manutenção..."
  mv index.html index.html.backup
  mv index.maintenance.html index.html
  echo "✅ Site ativado em modo manutenção!"
fi

# Verifica se precisamos reconstruir
read -p "Reconstruir o site agora? (s/n): " rebuild
if [ "$rebuild" = "s" ] || [ "$rebuild" = "S" ]; then
  echo "🔨 Reconstruindo o site..."
  npm run build
  echo "✅ Reconstrução concluída!"
fi 