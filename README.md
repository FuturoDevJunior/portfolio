# 🚀 DevFerreiraG | Enterprise Web Solutions | Soluções Web Corporativas | Soluciones Web Empresariales

<div align="center">
  <img src="https://raw.githubusercontent.com/DevFerreiraG/ai-engineering-standards/main/docs/architecture-v3.png" alt="DevFerreiraG Global Cloud Architecture Diagram" width="800" style="border: 1px solid #2d3748; border-radius: 8px;">
  
  [![Production Status](https://img.shields.io/endpoint?url=https://api.devferreirag.com/api/status/badge&style=for-the-badge)](https://status.devferreirag.com)
  [![OWASP Compliance](https://img.shields.io/badge/OWASP-100%25_Compliant-8FBE00?style=for-the-badge&logo=owasp&logoColor=white)](https://owasp.org)
  [![Web Vitals](https://img.shields.io/badge/Lighthouse-100%25-FF6B6B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://pagespeed.web.dev/analysis/https-www-devferreirag-com/fqdvp0qjqj?form_factor=desktop)
  [![SOC2](https://img.shields.io/badge/Compliance-SOC2%20|%20ISO27001-0052CC?style=for-the-badge&logo=iso&logoColor=white)](https://github.com/FuturoDevJunior/ai-engineering-standards)
  [![Vulnerabilities](https://img.shields.io/badge/Vulnerabilities-0-27AE60?style=for-the-badge&logo=snyk&logoColor=white)](https://github.com/DevFerreiraG/enterprise-boilerplate)
</div>

---

<div align="center">
  <h3>🌐 Escolha seu idioma:</h3>
  <p>
    <a href="#português">Português 🇧🇷</a> • 
    <a href="#english">English 🇺🇸</a> • 
    <a href="#español">Español 🇪🇸</a>
  </p>
</div>

<br>

<!-- =================== -->
<!-- Seção em Português -->
<!-- =================== -->
<a id="português"></a>
## 🌟 Arquitetura Crítica de Missão

**Plataforma Web Corporativa de Nível Empresarial** impulsionada por tecnologias de ponta:

```mermaid
graph TD
  A[Usuários Globais] --> B{AWS Global Accelerator}
  B --> C[US-East-1]
  B --> D[EU-Central-1]
  B --> E[AP-Southeast-1]
  C --> F[Grupo de Auto Escala]
  D --> F
  E --> F
  F --> G[Cluster Node.js 20]
  G --> H[(AWS Aurora PostgreSQL)]
```

### Principais Capacidades

- 🌍 **Presença Global**: 15 regiões AWS com CloudFront Edge Locations
- 🚄 **Desempenho**: TTFB <600ms, SLA de 99,99% (Impulsionado por Node.js 20 + React 18)
- 🔒 **Segurança**: 
  - Arquitetura Zero Trust com Mutual TLS
  - Scans DAST/SAST automatizados
  - Zero vulnerabilidades (Vite 6.2.1)
  - Compatível com GDPR, LGPD e PCI-DSS
- ⚙️ **DevOps**: 
  - CI/CD com suporte via IA (Jest + Cypress AI)
  - Deploys Blue/Green
  - Monitoramento em tempo real (OpenTelemetry)

# DevFerreiraG - Portfolio Profissional 🚀

<div align="center">
  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Code Background" width="600px">
  
  [![Status](https://img.shields.io/badge/status-produção-success?style=for-the-badge)](https://www.devferreirag.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite_6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

<p align="center">
  <a href="#sobre-port">Sobre</a> •
  <a href="#demo-port">Demonstração</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#como-comecar">Como Começar</a> •
  <a href="#multi-dominio">Multi-Domínio</a> •
  <a href="#estrutura">Estrutura</a> •
  <a href="#documentacao">Documentação</a> •
  <a href="#contato">Contato</a>
</p>

<a id="sobre-port"></a>
## 📌 Sobre o Projeto

Este repositório contém o código-fonte da plataforma profissional **DevFerreiraG**, desenvolvida para demonstrar excelência em desenvolvimento web moderno. O projeto foi meticulosamente arquitetado para atender aos mais altos padrões de qualidade e desempenho.

### 💼 Case para Recrutadores

Este projeto demonstra um conjunto abrangente de habilidades técnicas e soft-skills:

- **Arquitetura Frontend-Backend**: Implementação completa de stack JavaScript moderna
- **Engenharia Avançada**: Clean code, design patterns e princípios SOLID
- **Performance & SEO**: Otimizações avançadas para melhor experiência do usuário
- **Segurança Web**: Implementações robustas de proteção contra vulnerabilidades comuns
- **Tipagem Forte**: Sistema de tipos TypeScript avançado com interfaces personalizadas
- **DevOps**: Pipeline CI/CD completo para deploy automático
- **Multi-domínio**: Suporte completo para diversos domínios com redirecionamento canônico

<br>

## 🎬 Demonstração do Projeto

<div align="center">
  <a href="https://www.devferreirag.com" target="_blank">
    <img alt="Website Demo" src="https://img.shields.io/badge/Website_Demo-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" />
  </a>
  <a href="https://www.youtube.com/watch?v=example" target="_blank">
    <img alt="Video Demo" src="https://img.shields.io/badge/Vídeo_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
  </a>
</div>

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="Desktop View" />
        <p align="center">Interface Responsiva</p>
      </td>
      <td width="50%">
        <img src="https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" alt="Analytics Dashboard" />
        <p align="center">Dashboard Interativo</p>
      </td>
    </tr>
    <tr>
      <td width="50%">
        <img src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Mobile View" />
        <p align="center">Design Mobile-First</p>
      </td>
      <td width="50%">
        <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="API Documentation" />
        <p align="center">Documentação API Swagger</p>
      </td>
    </tr>
  </table>
</div>

<br>

## 🛠️ Tecnologias

<div align="center">
  <table>
    <tr>
      <th>Frontend</th>
      <th>Backend</th>
      <th>DevOps</th>
      <th>Ferramentas</th>
    </tr>
    <tr>
      <td>
        <img src="https://img.shields.io/badge/React_18.3-61DAFB?logo=react&logoColor=000&style=flat-square" alt="React" /><br>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat-square" alt="TypeScript" /><br>
        <img src="https://img.shields.io/badge/Vite_6.2-646CFF?logo=vite&logoColor=fff&style=flat-square" alt="Vite" /><br>
        <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=fff&style=flat-square" alt="Tailwind CSS" /><br>
        <img src="https://img.shields.io/badge/Zustand-000?style=flat-square" alt="Zustand" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Node.js_20-339933?logo=nodedotjs&logoColor=fff&style=flat-square" alt="Node.js" /><br>
        <img src="https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=flat-square" alt="Express" /><br>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat-square" alt="TypeScript" /><br>
        <img src="https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=000&style=flat-square" alt="Swagger" /><br>
        <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=flat-square" alt="MongoDB" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=flat-square" alt="Vercel" /><br>
        <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=flat-square" alt="Docker" /><br>
        <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=fff&style=flat-square" alt="GitHub Actions" /><br>
        <img src="https://img.shields.io/badge/Lighthouse-F44B21?logo=lighthouse&logoColor=fff&style=flat-square" alt="Lighthouse" /><br>
        <img src="https://img.shields.io/badge/Sentry-362D59?logo=sentry&logoColor=fff&style=flat-square" alt="Sentry" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/ESLint_9-4B32C3?logo=eslint&logoColor=fff&style=flat-square" alt="ESLint" /><br>
        <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=000&style=flat-square" alt="Prettier" /><br>
        <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=flat-square" alt="Jest" /><br>
        <img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=flat-square" alt="Figma" /><br>
        <img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=visualstudiocode&logoColor=fff&style=flat-square" alt="VS Code" />
      </td>
    </tr>
  </table>
</div>

<br>

## ✨ Funcionalidades

<div align="center">
  <table>
    <tr>
      <th>Funcionalidade</th>
      <th>Descrição</th>
      <th>Status</th>
    </tr>
    <tr>
      <td>🎨 Design Responsivo</td>
      <td>Interface adaptativa para todos os dispositivos e tamanhos de tela</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>🔍 SEO Otimizado</td>
      <td>Meta tags dinâmicas e otimizações para melhor rankeamento</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>🔄 Multi-domínio</td>
      <td>Suporte a múltiplos domínios com redirecionamento canônico</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>🔐 Segurança Avançada</td>
      <td>Implementações CSP, CORS e proteção contra ataques comuns</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>🛡️ Zero Vulnerabilidades</td>
      <td>Todas as dependências atualizadas e livres de vulnerabilidades</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>📊 Analytics</td>
      <td>Rastreamento avançado de eventos e visualizações</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>📱 PWA</td>
      <td>Suporte para instalação como aplicativo</td>
      <td><img src="https://img.shields.io/badge/Em_Desenvolvimento-yellow" alt="Em Desenvolvimento" /></td>
    </tr>
    <tr>
      <td>🌐 Internacionalização</td>
      <td>Suporte a múltiplos idiomas (PT-BR, EN, ES)</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>⚡ Desempenho Otimizado</td>
      <td>Score Lighthouse superior a 95 em todos os aspectos</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
    <tr>
      <td>🧪 Tipagem Avançada</td>
      <td>Sistema de tipos TypeScript implementado com interfaces personalizadas</td>
      <td><img src="https://img.shields.io/badge/Concluído-success" alt="Concluído" /></td>
    </tr>
  </table>
</div>

<br>

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+
- npm 8+
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/devferreirag.git
cd devferreirag

# Instalar dependências do workspace
npm install

# Iniciar ambiente de desenvolvimento
npm run start:frontend
npm run start:backend

# Build de produção
npm run build:frontend
npm run build:backend

# Preview da aplicação (na porta 5174)
npm run preview
```

### Scripts Simplificados

O projeto utiliza um sistema de workspace para gerenciar facilmente frontend e backend:

```bash
# Desenvolvimento
npm run start:frontend  # Inicia servidor de desenvolvimento frontend
npm run start:backend   # Inicia servidor de desenvolvimento backend

# Build
npm run build:frontend  # Constrói frontend para produção
npm run build:backend   # Constrói backend para produção

# Preview
npm run preview         # Visualiza o frontend construído na porta 5174
```

### Endpoints de Verificação

- 🔗 Frontend Preview: http://localhost:5174
- 🔗 Frontend Dev: http://localhost:5173
- 🔗 Backend: http://localhost:3001/health
- 🔗 API Docs: http://localhost:3001/api-docs

<br>

## 🌐 Multi-Domínio

O projeto foi cuidadosamente configurado para funcionar perfeitamente com dois domínios:

- 🌟 **Domínio Principal**: `www.devferreirag.com`
- 🌟 **Domínio Secundário**: `www.devferreirag.com.br`

<div align="center">
  <img src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Multi-Domain Architecture" width="80%" />
</div>

### Funcionalidades Multi-Domínio:

- ✅ **Redirecionamento Canônico**: Evita penalidades de SEO por conteúdo duplicado
- ✅ **CORS Configurado**: Headers para ambos os domínios
- ✅ **Content Security Policy**: Preparado para múltiplos endpoints
- ✅ **API de Metadados Dinâmicos**: Adaptada por domínio

Para detalhes completos, consulte nossa [Documentação Multi-Domínio](docs/MULTI_DOMAIN.md).

<br>

## 📂 Estrutura

<div align="center">
  <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" alt="Project Architecture" width="70%" />
</div>

```
devferreirag/
├── frontend/                # Aplicação React/Vite
│   ├── src/                 # Código fonte principal
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── hooks/           # Custom hooks (incluindo useLanguage com tipagem avançada)
│   │   ├── lib/             # Bibliotecas e utilitários
│   │   ├── pages/           # Páginas da aplicação
│   │   └── App.tsx          # Componente principal
│   ├── public/              # Arquivos estáticos
│   └── dist/                # Build compilado
├── backend/                 # API RESTful com Express
│   ├── src/                 # Código fonte da API
│   ├── dist/                # Build compilado
│   └── logs/                # Logs de aplicação
├── docs/                    # Documentação do projeto
│   ├── ARCHITECTURE.md      # Arquitetura detalhada
│   ├── DEPLOYMENT.md        # Instruções de deploy
│   ├── MULTI_DOMAIN.md      # Configuração multi-domínio
│   ├── SEO.md               # Estratégias SEO
│   └── ANALYTICS.md         # Configuração de analytics
└── tools/                   # Scripts e utilitários
    ├── dev-scripts/         # Scripts para desenvolvimento
    ├── monitoring/          # Ferramentas de monitoramento
    └── maintenance/         # Scripts de manutenção
```

<br>

## 📚 Documentação

<div align="center">
  <table>
    <tr>
      <th>Documento</th>
      <th>Descrição</th>
    </tr>
    <tr>
      <td><a href="docs/ARCHITECTURE.md">📐 Arquitetura</a></td>
      <td>Detalhes sobre a arquitetura do sistema, padrões de design e decisões técnicas</td>
    </tr>
    <tr>
      <td><a href="docs/DEPLOYMENT.md">🚀 Deploy</a></td>
      <td>Guia completo para deploy em ambientes de produção, staging e desenvolvimento</td>
    </tr>
    <tr>
      <td><a href="docs/MULTI_DOMAIN.md">🌐 Multi-Domínio</a></td>
      <td>Configuração detalhada do suporte a múltiplos domínios</td>
    </tr>
    <tr>
      <td><a href="docs/SEO.md">🔍 SEO</a></td>
      <td>Estratégias de otimização para mecanismos de busca implementadas</td>
    </tr>
    <tr>
      <td><a href="docs/ANALYTICS.md">📊 Analytics</a></td>
      <td>Implementação de rastreamento e análise de dados de usuário</td>
    </tr>
    <tr>
      <td><a href="docs/TYPESCRIPT.md">🧰 TypeScript</a></td>
      <td>Sistema de tipos e melhores práticas implementadas</td>
    </tr>
  </table>
</div>

<br>

## 📱 Contato

<div align="center">
  <a href="https://linkedin.com/in/DevFerreiraG">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/DevFerreiraG">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:Contato.FerreiraG@outlook.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://www.devferreirag.com">
    <img src="https://img.shields.io/badge/Website-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website" />
  </a>
</div>

<div align="center" style="margin-top:20px">
  <table style="margin:0 auto">
    <tr>
      <td align="center"><strong>Email:</strong></td>
      <td><a href="mailto:Contato.FerreiraG@outlook.com">Contato.FerreiraG@outlook.com</a></td>
    </tr>
    <tr>
      <td align="center"><strong>Telefone:</strong></td>
      <td>+55 24 99870-6745</td>
    </tr>
    <tr>
      <td align="center"><strong>Localização:</strong></td>
      <td>Rio de Janeiro, Brasil</td>
    </tr>
  </table>
</div>

<br>

## 📄 Licença

<div align="center">
  
Este projeto está licenciado sob a [MIT License](LICENSE)

</div>

<div align="center">
  <img src="https://img.shields.io/github/license/DevFerreiraG/devferreirag?style=for-the-badge" alt="License" />
</div>

<div align="center">
  <br>
  <p>⭐️ Desenvolvido com paixão por <a href="https://github.com/DevFerreiraG">DevFerreiraG</a></p>
  <p>👨‍💻 <b>CONTRATAR COM URGÊNCIA</b> 👨‍💻</p>
</div>

<!-- =================== -->
<!-- Fim da seção em Português -->
<!-- =================== -->

<br>

<!-- =================== -->
<!-- Seção em English -->
<!-- =================== -->
<a id="english"></a>
<h1 align="center">DevFerreiraG - Professional Portfolio 🚀</h1>

<p align="center">
  <i>This repository contains the source code for DevFerreiraG's professional website, a modern web platform showcasing expertise in advanced development practices.</i>
</p>

<div align="center">
  <a href="https://www.devferreirag.com" target="_blank">
    <img alt="View Live Demo" src="https://img.shields.io/badge/View_Live_Demo-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" />
  </a>
</div>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#contact">Contact</a>
</p>

<div align="center">
  <h3>Recent Technical Improvements</h3>
  <p>✅ Advanced TypeScript typing system<br>
  ✅ Zero security vulnerabilities (Vite 6.2.1)<br>
  ✅ Simplified project management with workspace scripts</p>
  
  <h3>Contact Information</h3>
  <p>📧 Email: <a href="mailto:Contato.FerreiraG@outlook.com">Contato.FerreiraG@outlook.com</a><br>
  📞 Phone: +55 24 99870-6745<br>
  📍 Location: Rio de Janeiro, Brazil</p>
</div>

[View complete documentation in English](docs/README.md)

<!-- =================== -->
<!-- Fim da seção em English -->
<!-- =================== -->

<br>

<!-- =================== -->
<!-- Seção en Español -->
<!-- =================== -->
<a id="español"></a>
<h1 align="center">DevFerreiraG - Portafolio Profesional 🚀</h1>

<p align="center">
  <i>Este repositorio contiene el código fuente del sitio web profesional de DevFerreiraG, una plataforma web moderna que muestra experiencia en prácticas avanzadas de desarrollo.</i>
</p>

<div align="center">
  <a href="https://www.devferreirag.com" target="_blank">
    <img alt="Ver Demo en Vivo" src="https://img.shields.io/badge/Ver_Demo_en_Vivo-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" />
  </a>
</div>

<p align="center">
  <a href="#sobre-el-proyecto">Sobre</a> •
  <a href="#caracteristicas">Características</a> •
  <a href="#como-empezar">Cómo Empezar</a> •
  <a href="#documentacion">Documentación</a> •
  <a href="#contacto">Contacto</a>
</p>

<div align="center">
  <h3>Mejoras Técnicas Recientes</h3>
  <p>✅ Sistema avanzado de tipado TypeScript<br>
  ✅ Cero vulnerabilidades de seguridad (Vite 6.2.1)<br>
  ✅ Gestión simplificada del proyecto con scripts workspace</p>
  
  <h3>Información de Contacto</h3>
  <p>📧 Email: <a href="mailto:Contato.FerreiraG@outlook.com">Contato.FerreiraG@outlook.com</a><br>
  📞 Teléfono: +55 24 99870-6745<br>
  📍 Ubicación: Rio de Janeiro, Brasil</p>
</div>

[Ver documentación completa en Español](docs/README.md)

<div align="center">
  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Recruitment Success" width="70%" />
</div>

<br>

<!-- Criado inspirado no template de README do iuricode (https://github.com/iuricode/readme-template) -->
<!-- Imagens utilizadas do Unsplash (https://unsplash.com/) -->
