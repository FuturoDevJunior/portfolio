# Ferramentas de Manutenção e Monitoramento

Este diretório contém scripts e ferramentas para manutenção, monitoramento e operações do projeto DevFerreiraG.

## Estrutura

- **maintenance/** - Scripts e arquivos para modo de manutenção
  - `maintenance.html` - Página exibida durante períodos de manutenção
  - `toggle-maintenance.sh` - Script para ativar/desativar modo de manutenção

- **monitoring/** - Scripts para monitoramento da aplicação
  - `health-check.sh` - Script para verificar a saúde da aplicação

## Como Usar

### Modo de Manutenção

Para ativar o modo de manutenção:

```bash
cd tools/maintenance
./toggle-maintenance.sh on
```

Para desativar:

```bash
cd tools/maintenance
./toggle-maintenance.sh off
```

### Monitoramento

Para executar verificação de saúde:

```bash
cd tools/monitoring
./health-check.sh
```

## Boas Práticas

1. Mantenha os scripts atualizados e documentados
2. Use comentários para explicar trechos complexos nos scripts
3. Teste os scripts em ambiente de desenvolvimento antes de usá-los em produção
4. Adicione logs aos scripts para facilitar o diagnóstico de problemas 