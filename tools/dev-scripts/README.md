# Scripts de Desenvolvimento Otimizados para DevFerreiraG

Este diretório contém scripts otimizados para o desenvolvimento do projeto DevFerreiraG.

## Problema Resolvido

Estes scripts foram criados para lidar com problemas comuns durante o desenvolvimento:

1. **Processos Encerrados Abruptamente (Killed: 9)**
   - Limitação de uso de memória para evitar que o sistema mate os processos
   - Melhor limpeza de processos nas portas utilizadas

2. **Navegação de Diretório Inconsistente**
   - Uso de caminhos absolutos baseados na localização do script
   - Detecção automática do diretório raiz do projeto

3. **Gerenciamento de Recursos**
   - Limitação de memória para Node.js
   - Encerramento mais elegante de processos

## Scripts Disponíveis

### `kill-nodes.sh`

Mata todos os processos Node.js nas portas 3001 (backend), 5173 e 5174 (frontend), além de processos vite e nodemon.

```bash
./tools/dev-scripts/kill-nodes.sh
```

### `start-backend.sh`

Inicia o backend com configurações otimizadas.

```bash
./tools/dev-scripts/start-backend.sh
```

### `start-frontend.sh`

Inicia o frontend com configurações otimizadas.

```bash
./tools/dev-scripts/start-frontend.sh
```

## Utilização Recomendada

Para máxima estabilidade, recomendamos executar o backend e o frontend em terminais separados:

```bash
# Terminal 1
./tools/dev-scripts/start-backend.sh

# Terminal 2
./tools/dev-scripts/start-frontend.sh
```

Se encontrar problemas, primeiro limpe todos os processos:

```bash
./tools/dev-scripts/kill-nodes.sh
```

## Diagnóstico de Problemas

Se os scripts não funcionarem como esperado, verifique:

1. Se você tem permissão de execução nos scripts:
   ```bash
   chmod +x tools/dev-scripts/*.sh
   ```

2. Se as portas 3001, 5173, 5174 estão sendo usadas por outros processos:
   ```bash
   lsof -i:3001
   lsof -i:5173
   lsof -i:5174
   ```

## Notas sobre Configuração

- Os scripts definem `NODE_OPTIONS="--max-old-space-size=2048"` para limitar o uso de memória
- O backend é executado com `NODE_ENV=development` 