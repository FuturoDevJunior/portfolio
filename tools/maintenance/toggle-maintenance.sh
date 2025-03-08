#!/bin/bash

# Script para alternar entre a página de manutenção e a aplicação React
# Uso: ./toggle-maintenance.sh [on|off]
#
# Exemplos:
#   ./toggle-maintenance.sh on   # Ativa o modo de manutenção
#   ./toggle-maintenance.sh off  # Desativa o modo de manutenção
#   ./toggle-maintenance.sh      # Alterna o modo atual (ativa/desativa)

# Caminho para o diretório public
PUBLIC_DIR="../../public"

# Função para ativar o modo de manutenção
activate_maintenance() {
  echo "🛠️  Ativando modo manutenção..."
  mv "$PUBLIC_DIR/index.html" "$PUBLIC_DIR/index.html.backup"
  cp "maintenance.html" "$PUBLIC_DIR/index.html"
  echo "✅ Site ativado em modo manutenção!"
}

# Função para desativar o modo de manutenção
deactivate_maintenance() {
  echo "🚀 Desativando modo manutenção..."
  mv "$PUBLIC_DIR/index.html" "$PUBLIC_DIR/index.maintenance.html"
  mv "$PUBLIC_DIR/index.html.backup" "$PUBLIC_DIR/index.html"
  echo "✅ Site ativado em modo normal!"
}

# Verificar se foi passado um parâmetro
if [ "$1" = "on" ]; then
  # Ativar modo manutenção
  activate_maintenance
elif [ "$1" = "off" ]; then
  # Desativar modo manutenção
  deactivate_maintenance
else
  # Funcionamento original (alternância automática)
  if [ -f "$PUBLIC_DIR/index.html.backup" ]; then
    # Se existe um backup, estamos em modo manutenção, voltar para React
    deactivate_maintenance
  else
    # Não existe backup, estamos em modo normal, mudar para manutenção
    activate_maintenance
  fi
fi

# Verifica se precisamos reconstruir
read -p "Reconstruir o site agora? (s/n): " rebuild
if [ "$rebuild" = "s" ] || [ "$rebuild" = "S" ]; then
  echo "🔨 Reconstruindo o site..."
  cd ../../ && npm run build
  echo "✅ Reconstrução concluída!"
fi 