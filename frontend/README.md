# DevFerreiraG - Site Profissional

Este repositório contém o código-fonte do site profissional de DevFerreiraG, incluindo um frontend em React/TypeScript e um backend com recursos de SEO, analytics e marketing.

## Estrutura do Projeto

```
/
├── backend/             # API e serviços backend
│   ├── src/             # Código-fonte TypeScript
│   ├── public/          # Arquivos estáticos 
│   └── dist/            # Build compilado
│
├── src/                 # Frontend React/TypeScript
│   ├── components/      # Componentes React
│   ├── lib/             # Bibliotecas e utilitários
│   └── hooks/           # React hooks
│
├── public/              # Arquivos estáticos do frontend
│
├── tools/               # Scripts e ferramentas
│   ├── maintenance/     # Scripts de modo manutenção
│   └── monitoring/      # Scripts de monitoramento
│
└── docs/                # Documentação adicional
```

## Começando

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- PM2 (para produção)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/devferreirag/website.git
   cd website
   ```

2. Instale as dependências do frontend:
   ```bash
   npm install
   ```

3. Instale as dependências do backend:
   ```bash
   cd backend
   npm run setup
   ```

4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env conforme necessário
   ```

### Execução

#### Desenvolvimento

1. Inicie o backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Em outro terminal, inicie o frontend:
   ```bash
   npm run dev
   ```

#### Produção

Para deploy em produção, siga as instruções em `/backend/DEPLOYMENT.md`.

## Funcionalidades Principais

- **Website Profissional**: Showcase de projetos e habilidades
- **Analytics**: Rastreamento detalhado de interações do usuário
- **SEO**: Otimização para mecanismos de busca
- **Marketing**: Rastreamento de campanhas e conversões

## Ferramentas

O diretório `/tools` contém scripts úteis para operação e manutenção:

- **Modo de Manutenção**: Scripts para ativar/desativar modo de manutenção
- **Monitoramento**: Scripts para verificar a saúde da aplicação

Consulte `/tools/README.md` para mais detalhes.

## Licença

Proprietária - DevFerreiraG © 2023

## Contato

Para questões relacionadas a este projeto, entre em contato através do site ou via GitHub.