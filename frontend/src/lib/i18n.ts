export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    nav: {
      services: 'Serviços',
      expertise: 'Expertise',
      cases: 'Cases',
      contact: 'Contato',
      connect: 'Conectar',
      backToTop: 'Voltar ao topo',
      connectLinkedIn: 'Conectar no LinkedIn',
      mainNavigation: 'Navegação principal'
    },
    language: {
      selectLanguage: 'Selecionar idioma'
    },
    hero: {
      title: 'Transformação Digital com Engenharia de Ponta',
      subtitle: 'Consultoria técnica especializada em Engenharia de Dados, Desenvolvimento Full-Stack e Arquitetura de Sistemas com foco em soluções escaláveis e inovadoras.',
      cta: {
        start: 'Iniciar Projeto',
        portfolio: 'Ver Portfolio'
      }
    },
    techStack: {
      title: 'Stack Tecnológico'
    },
    services: {
      title: 'Nossos Serviços',
      subtitle: 'Soluções especializadas para suas necessidades tecnológicas',
      skills: 'Habilidades',
      dataEngineering: {
        title: 'Engenharia de Dados',
        description: 'Arquitetura e implementação de pipelines de dados escaláveis, ETL/ELT, e data lakes com as melhores práticas do mercado.'
      },
      fullstack: {
        title: 'Desenvolvimento Full-Stack',
        description: 'Aplicações web modernas e APIs robustas utilizando as tecnologias mais atuais do mercado.'
      },
      architecture: {
        title: 'Arquitetura de Sistemas',
        description: 'Design e implementação de arquiteturas escaláveis, microsserviços e sistemas distribuídos.'
      }
    },
    expertise: {
      title: 'Áreas de Expertise',
      subtitle: 'Conhecimento especializado em áreas estratégicas',
      technologies: 'Tecnologias relacionadas',
      ai: {
        title: 'Inteligência Artificial',
        description: 'Desenvolvimento e implementação de soluções de IA e ML para otimização de processos e tomada de decisão.'
      },
      cloud: {
        title: 'Cloud Computing',
        description: 'Arquitetura e gerenciamento de infraestrutura em nuvem com foco em escalabilidade e segurança.'
      },
      devops: {
        title: 'DevOps & SRE',
        description: 'Implementação de práticas DevOps e SRE para automação e confiabilidade de sistemas.'
      }
    },
    caseStudy: {
      results: 'Resultados',
      technologies: 'Tecnologias utilizadas',
      metrics: 'Métricas de desempenho',
      learnMore: 'Saiba mais sobre'
    },
    cases: {
      title: 'Cases de Sucesso',
      subtitle: 'Projetos que transformaram negócios',
      dataWarehouse: {
        title: 'Data Warehouse Enterprise',
        description: 'Implementação de data warehouse moderno para empresa do setor financeiro.',
        results: 'Redução de 60% no tempo de processamento e economia de 40% em custos de infraestrutura.'
      },
      ecommerce: {
        title: 'Plataforma E-commerce',
        description: 'Desenvolvimento de plataforma e-commerce escalável com microsserviços.',
        results: 'Aumento de 45% na taxa de conversão e redução de 30% no tempo de carregamento.'
      },
      metrics: {
        processing: 'Dados Processados',
        performance: 'Melhoria Performance',
        conversion: 'Taxa Conversão'
      }
    },
    stats: {
      projects: 'Projetos Entregues',
      data: 'Dados Processados',
      uptime: 'Uptime',
      support: 'Suporte'
    },
    contact: {
      title: 'Entre em Contato',
      subtitle: 'Vamos transformar sua ideia em realidade',
      info: {
        title: 'Informações de Contato'
      },
      email: 'E-mail',
      emailAriaLabel: 'Enviar e-mail para contact@devferreirag.com',
      phone: 'Telefone',
      phoneAriaLabel: 'Ligar para +55 11 91234-5678',
      location: 'Localização',
      form: {
        title: 'Formulário de Contato',
        name: 'Nome',
        namePlaceholder: 'Seu nome completo',
        email: 'E-mail',
        emailPlaceholder: 'seu@email.com',
        message: 'Mensagem',
        messagePlaceholder: 'Descreva seu projeto ou necessidade...',
        submit: 'Enviar Mensagem',
        sending: 'Enviando...',
        retry: 'Tentar Novamente',
        errorTitle: 'Ops! Algo deu errado',
        errorMessage: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
        successTitle: 'Mensagem Enviada!',
        successMessage: 'Obrigado pelo seu contato. Retornarei em breve!',
        sendAnother: 'Enviar outra mensagem',
        errors: {
          nameRequired: 'Por favor, informe seu nome',
          emailRequired: 'Por favor, informe seu e-mail',
          emailInvalid: 'Por favor, informe um e-mail válido',
          messageRequired: 'Por favor, escreva sua mensagem'
        }
      }
    },
    footer: {
      copyright: '© 2025 DevFerreiraG. Transformando ideias em soluções tecnológicas.',
      navigation: 'Links de navegação do rodapé',
      rights: 'Todos os direitos reservados',
      privacy: 'Política de Privacidade',
      privacyPolicy: 'Ver política de privacidade',
      terms: 'Termos de Uso',
      termsOfService: 'Ver termos de uso'
    },
    termsPage: {
      title: 'Termos de Uso',
      rights: 'Todos os direitos reservados',
      backToHome: 'Voltar para a página inicial',
      section1: {
        title: '1. Aceitação dos Termos',
        content: 'Bem-vindo ao site DevFerreiraG. Ao acessar ou utilizar nosso site, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nosso site.'
      },
      section2: {
        title: '2. Alterações nos Termos',
        content: 'Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. É sua responsabilidade verificar periodicamente alterações. O uso contínuo do site após a publicação de quaisquer modificações constitui aceitação dessas modificações.'
      },
      section3: {
        title: '3. Uso do Site',
        content: 'Ao utilizar nosso site, você concorda em:',
        list: [
          'Não violar quaisquer leis aplicáveis;',
          'Não publicar ou transmitir conteúdo que seja ilegal, fraudulento, enganoso, difamatório, obsceno ou prejudicial;',
          'Não interferir no funcionamento normal do site;',
          'Não tentar acessar áreas do site que não sejam intencionalmente disponibilizadas ao público;',
          'Não utilizar o site para distribuir material publicitário ou promocional não solicitado;',
          'Não coletar ou armazenar dados pessoais de outros usuários.'
        ]
      },
      section4: {
        title: '4. Propriedade Intelectual',
        content1: 'O site e todo o seu conteúdo, recursos e funcionalidades (incluindo, mas não limitado a, informações, textos, gráficos, logotipos, imagens, código e design) são de propriedade da DevFerreiraG e estão protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.',
        content2: 'Você não pode reproduzir, distribuir, modificar, criar obras derivadas, exibir publicamente, executar publicamente, republicar, baixar, armazenar ou transmitir qualquer material do nosso site, exceto conforme permitido por estes Termos.'
      },
      section5: {
        title: '5. Links para Outros Sites',
        content: 'Nosso site pode conter links para sites de terceiros que não são de propriedade ou controlados pela DevFerreiraG. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros. Você reconhece e concorda que a DevFerreiraG não será responsável, direta ou indiretamente, por qualquer dano ou perda causada ou alegadamente causada por ou em conexão com o uso ou a confiança em qualquer conteúdo, bens ou serviços disponíveis em ou através de tais sites ou serviços.'
      },
      section6: {
        title: '6. Rescisão',
        content: 'Podemos encerrar ou suspender seu acesso ao site imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos. Após a rescisão, seu direito de utilizar o site cessará imediatamente.'
      },
      section7: {
        title: '7. Limitação de Responsabilidade',
        content: 'Em nenhuma circunstância a DevFerreiraG, seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes de:',
        list: [
          'Seu acesso ou uso ou incapacidade de acessar ou usar o site;',
          'Qualquer conduta ou conteúdo de terceiros no site;',
          'Conteúdo obtido do site; e',
          'Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo.'
        ]
      },
      section8: {
        title: '8. Isenção de Garantias',
        content: 'O site é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou implícitas. A DevFerreiraG não garante que o site seja livre de erros, seguro ou ininterrupto, ou que cumpra seus requisitos específicos.'
      },
      section9: {
        title: '9. Lei Aplicável',
        content: 'Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem consideração a seus conflitos de princípios legais. Nossa falha em fazer cumprir qualquer direito ou disposição destes Termos não será considerada uma renúncia a esses direitos.'
      },
      section10: {
        title: '10. Contato',
        content: 'Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail:'
      },
      lastUpdate: 'Última atualização:'
    },
    privacyPage: {
      title: 'Política de Privacidade',
      rights: 'Todos os direitos reservados',
      backToHome: 'Voltar para a página inicial',
      section1: {
        title: '1. Introdução',
        content1: 'A DevFerreiraG está comprometida em proteger a privacidade e os dados pessoais dos usuários que visitam nosso site. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.',
        content2: 'Ao utilizar nosso site, você concorda com as práticas descritas nesta política.'
      },
      section2: {
        title: '2. Dados que Coletamos',
        content: 'Podemos coletar os seguintes tipos de informações:',
        list: [
          '<strong>Informações de identificação pessoal</strong>: Nome, e-mail e telefone quando você os fornece voluntariamente através de formulários de contato.',
          '<strong>Informações técnicas</strong>: Endereço IP, tipo de navegador, provedor de serviços de internet, páginas de referência/saída, sistema operacional, data/hora e dados de navegação.',
          '<strong>Cookies e tecnologias semelhantes</strong>: Utilizamos cookies para melhorar a experiência do usuário, analisar tendências e administrar o site.'
        ]
      },
      section3: {
        title: '3. Como Utilizamos seus Dados',
        content: 'Utilizamos as informações coletadas para os seguintes fins:',
        list: [
          'Fornecer e manter nossos serviços;',
          'Melhorar, personalizar e expandir nossa plataforma;',
          'Entender como os usuários utilizam nossos serviços;',
          'Desenvolver novos produtos, serviços e funcionalidades;',
          'Comunicar-se com você, respondendo a solicitações ou fornecendo informações solicitadas;',
          'Enviar atualizações, alertas de segurança e mensagens de suporte;',
          'Detectar, prevenir e resolver problemas técnicos ou de segurança.'
        ]
      },
      section4: {
        title: '4. Compartilhamento de Dados',
        content: 'Não vendemos, comercializamos ou transferimos suas informações pessoais identificáveis para terceiros, exceto nas seguintes circunstâncias:',
        list: [
          'Com prestadores de serviços que nos auxiliam na operação do site e na prestação de serviços (sob contratos que protegem suas informações);',
          'Para cumprir obrigações legais;',
          'Para proteger nossos direitos, propriedade ou segurança;',
          'Com seu consentimento explícito para fins específicos.'
        ]
      },
      section5: {
        title: '5. Seus Direitos',
        content: 'De acordo com as leis de proteção de dados aplicáveis (LGPD no Brasil e GDPR na UE), você tem os seguintes direitos:',
        list: [
          '<strong>Acesso</strong>: Solicitar acesso aos seus dados pessoais;',
          '<strong>Correção</strong>: Solicitar a correção de dados imprecisos;',
          '<strong>Exclusão</strong>: Solicitar a exclusão de seus dados;',
          '<strong>Restrição</strong>: Solicitar a restrição do processamento de seus dados;',
          '<strong>Portabilidade</strong>: Receber seus dados em formato estruturado;',
          '<strong>Oposição</strong>: Opor-se ao processamento de seus dados;',
          '<strong>Retirada de consentimento</strong>: Retirar seu consentimento a qualquer momento.'
        ]
      },
      section6: {
        title: '6. Segurança de Dados',
        content: 'Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra perda acidental, uso indevido, acesso não autorizado, alteração ou divulgação. No entanto, nenhuma transmissão pela internet ou método de armazenamento eletrônico é 100% seguro, portanto, não podemos garantir segurança absoluta.'
      },
      section7: {
        title: '7. Retenção de Dados',
        content: 'Mantemos seus dados pessoais apenas pelo tempo necessário para os fins descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.'
      },
      section8: {
        title: '8. Alterações nesta Política',
        content: 'Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e, se as alterações forem significativas, enviaremos uma notificação.'
      },
      section9: {
        title: '9. Contato',
        content: 'Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail:'
      },
      lastUpdate: 'Última atualização:'
    },
    accessibility: {
      skipToContent: 'Pular para o conteúdo principal',
      highContrastMode: 'Modo de alto contraste',
      readingMode: 'Modo de leitura',
      defaultMode: 'Modo padrão',
      toggleHighContrast: 'Alternar modo de alto contraste',
      toggleReadingMode: 'Alternar modo de leitura',
      resetModes: 'Voltar ao modo padrão',
      navigationSections: 'Navegação de Seções',
      backToTop: 'Voltar ao topo',
      acessibilidade: {
        titulo: 'Acessibilidade',
        contraste: 'Contraste',
        contrasteAlto: 'Alto contraste',
        contrasteNormal: 'Contraste normal',
        toggleMenu: 'Abrir menu de acessibilidade',
        ocultar: 'Ocultar controles',
        atalhoAltA: 'Pressione Alt+A para exibir os controles de acessibilidade',
        opcoesAcessibilidade: 'Opções de acessibilidade'
      }
    }
  },
  en: {
    nav: {
      services: 'Services',
      expertise: 'Expertise',
      cases: 'Cases',
      contact: 'Contact',
      connect: 'Connect',
      backToTop: 'Back to top',
      connectLinkedIn: 'Connect on LinkedIn',
      mainNavigation: 'Main navigation'
    },
    language: {
      selectLanguage: 'Select language'
    },
    hero: {
      title: 'Digital Transformation with Cutting-Edge Engineering',
      subtitle: 'Specialized technical consulting in Data Engineering, Full-Stack Development, and Systems Architecture focused on scalable and innovative solutions.',
      cta: {
        start: 'Start Project',
        portfolio: 'View Portfolio'
      }
    },
    techStack: {
      title: 'Tech Stack'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Specialized solutions for your technological needs',
      skills: 'Skills',
      dataEngineering: {
        title: 'Data Engineering',
        description: 'Architecture and implementation of scalable data pipelines, ETL/ELT, and data lakes using market best practices.'
      },
      fullstack: {
        title: 'Full-Stack Development',
        description: 'Modern web applications and robust APIs using the latest market technologies.'
      },
      architecture: {
        title: 'Systems Architecture',
        description: 'Design and implementation of scalable architectures, microservices, and distributed systems.'
      }
    },
    expertise: {
      title: 'Areas of Expertise',
      subtitle: 'Specialized knowledge in strategic areas',
      technologies: 'Related technologies',
      ai: {
        title: 'Artificial Intelligence',
        description: 'Development and implementation of AI and ML solutions for process optimization and decision making.'
      },
      cloud: {
        title: 'Cloud Computing',
        description: 'Cloud infrastructure architecture and management focused on scalability and security.'
      },
      devops: {
        title: 'DevOps & SRE',
        description: 'Implementation of DevOps and SRE practices for system automation and reliability.'
      }
    },
    caseStudy: {
      results: 'Results',
      technologies: 'Technologies used',
      metrics: 'Performance metrics',
      learnMore: 'Learn more about'
    },
    cases: {
      title: 'Success Cases',
      subtitle: 'Projects that transformed businesses',
      dataWarehouse: {
        title: 'Enterprise Data Warehouse',
        description: 'Implementation of modern data warehouse for financial sector company.',
        results: '60% reduction in processing time and 40% savings in infrastructure costs.'
      },
      ecommerce: {
        title: 'E-commerce Platform',
        description: 'Development of scalable e-commerce platform with microservices.',
        results: '45% increase in conversion rate and 30% reduction in loading time.'
      },
      metrics: {
        processing: 'Data Processed',
        performance: 'Performance Improvement',
        conversion: 'Conversion Rate'
      }
    },
    stats: {
      projects: 'Delivered Projects',
      data: 'Data Processed',
      uptime: 'Uptime',
      support: 'Support'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Let\'s turn your idea into reality',
      info: {
        title: 'Contact Information'
      },
      email: 'Email',
      emailAriaLabel: 'Send email to contact@devferreirag.com',
      phone: 'Phone',
      phoneAriaLabel: 'Call +55 11 91234-5678',
      location: 'Location',
      form: {
        title: 'Contact Form',
        name: 'Name',
        namePlaceholder: 'Your full name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Describe your project or needs...',
        submit: 'Send Message',
        sending: 'Sending...',
        retry: 'Try Again',
        errorTitle: 'Oops! Something went wrong',
        errorMessage: 'An error occurred while sending the form. Please try again.',
        successTitle: 'Message Sent!',
        successMessage: 'Thank you for your message. I will get back to you soon!',
        sendAnother: 'Send another message',
        errors: {
          nameRequired: 'Please enter your name',
          emailRequired: 'Please enter your email',
          emailInvalid: 'Please enter a valid email',
          messageRequired: 'Please enter your message'
        }
      }
    },
    footer: {
      copyright: '© 2025 DevFerreiraG. Transforming ideas into technological solutions.',
      navigation: 'Footer navigation links',
      rights: 'All rights reserved',
      privacy: 'Privacy Policy',
      privacyPolicy: 'View privacy policy',
      terms: 'Terms of Service',
      termsOfService: 'View terms of service'
    },
    termsPage: {
      title: 'Terms of Use',
      rights: 'All rights reserved',
      backToHome: 'Back to home',
      section1: {
        title: '1. Acceptance of Terms',
        content: 'Welcome to the DevFerreiraG website. By accessing or using our site, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, you may not access or use our site.'
      },
      section2: {
        title: '2. Changes to Terms',
        content: 'We reserve the right to modify or replace these Terms at any time. It is your responsibility to periodically check for changes. Continued use of the site after the posting of any modifications constitutes acceptance of those modifications.'
      },
      section3: {
        title: '3. Use of the Site',
        content: 'When using our site, you agree to:',
        list: [
          'Not violate any applicable laws;',
          'Not post or transmit content that is illegal, fraudulent, deceptive, defamatory, obscene, or harmful;',
          'Not interfere with the normal operation of the site;',
          'Not attempt to access areas of the site that are not intentionally made available to the public;',
          'Not use the site to distribute unsolicited advertising or promotional material;',
          'Not collect or store personal data of other users.'
        ]
      },
      section4: {
        title: '4. Intellectual Property',
        content1: 'The site and all of its content, features, and functionality (including but not limited to information, text, graphics, logos, images, code, and design) are the property of DevFerreiraG and are protected by copyright, trademark, and other intellectual property laws.',
        content2: 'You may not reproduce, distribute, modify, create derivative works, publicly display, publicly perform, republish, download, store, or transmit any material from our site, except as permitted by these Terms.'
      },
      section5: {
        title: '5. Links to Other Sites',
        content: 'Our site may contain links to third-party websites that are not owned or controlled by DevFerreiraG. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that DevFerreiraG shall not be responsible, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any content, goods, or services available on or through such websites or services.'
      },
      section6: {
        title: '6. Termination',
        content: 'We may terminate or suspend your access to the site immediately, without prior notice or liability, for any reason, including, without limitation, if you breach the Terms. Upon termination, your right to use the site will cease immediately.'
      },
      section7: {
        title: '7. Limitation of Liability',
        content: 'In no event shall DevFerreiraG, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including, without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:',
        list: [
          'Your access to or use of or inability to access or use the site;',
          'Any conduct or content of any third party on the site;',
          'Any content obtained from the site; and',
          'Unauthorized access, use, or alteration of your transmissions or content.'
        ]
      },
      section8: {
        title: '8. Disclaimer of Warranties',
        content: 'The site is provided "as is" and "as available," without any warranties of any kind, express or implied. DevFerreiraG does not warrant that the site will be error-free, secure, or uninterrupted, or that it will meet your specific requirements.'
      },
      section9: {
        title: '9. Governing Law',
        content: 'These Terms shall be governed and construed in accordance with the laws of Brazil, without regard to its conflict of law principles. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.'
      },
      section10: {
        title: '10. Contact',
        content: 'If you have any questions about these Terms, please contact us at:'
      },
      lastUpdate: 'Last updated:'
    },
    privacyPage: {
      title: 'Privacy Policy',
      rights: 'All rights reserved',
      backToHome: 'Back to home',
      section1: {
        title: '1. Introduction',
        content1: 'DevFerreiraG is committed to protecting the privacy and personal data of users who visit our site. This Privacy Policy explains how we collect, use, store, and protect your information.',
        content2: 'By using our site, you agree to the practices described in this policy.'
      },
      section2: {
        title: '2. Data We Collect',
        content: 'We may collect the following types of information:',
        list: [
          '<strong>Personal identification information</strong>: Name, email, and phone when you voluntarily provide them through contact forms.',
          '<strong>Technical information</strong>: IP address, browser type, internet service provider, referring/exit pages, operating system, date/time stamp, and browsing data.',
          '<strong>Cookies and similar technologies</strong>: We use cookies to improve user experience, analyze trends, and administer the site.'
        ]
      },
      section3: {
        title: '3. How We Use Your Data',
        content: 'We use the collected information for the following purposes:',
        list: [
          'To provide and maintain our services;',
          'To improve, personalize, and expand our platform;',
          'To understand how users utilize our services;',
          'To develop new products, services, and features;',
          'To communicate with you, responding to requests or providing requested information;',
          'To send updates, security alerts, and support messages;',
          'To detect, prevent, and address technical or security issues.'
        ]
      },
      section4: {
        title: '4. Data Sharing',
        content: 'We do not sell, trade, or transfer your personally identifiable information to third parties, except in the following circumstances:',
        list: [
          'With service providers who assist us in operating the site and providing services (under contracts that protect your information);',
          'To comply with legal obligations;',
          'To protect our rights, property, or safety;',
          'With your explicit consent for specific purposes.'
        ]
      },
      section5: {
        title: '5. Your Rights',
        content: 'In accordance with applicable data protection laws (LGPD in Brazil and GDPR in the EU), you have the following rights:',
        list: [
          '<strong>Access</strong>: Request access to your personal data;',
          '<strong>Rectification</strong>: Request correction of inaccurate data;',
          '<strong>Erasure</strong>: Request deletion of your data;',
          '<strong>Restriction</strong>: Request restriction of processing of your data;',
          '<strong>Portability</strong>: Receive your data in a structured format;',
          '<strong>Objection</strong>: Object to the processing of your data;',
          '<strong>Withdrawal of consent</strong>: Withdraw your consent at any time.'
        ]
      },
      section6: {
        title: '6. Data Security',
        content: 'We implement appropriate technical and organizational security measures to protect your personal information against accidental loss, misuse, unauthorized access, alteration, or disclosure. However, no transmission over the internet or electronic storage method is 100% secure, so we cannot guarantee absolute security.'
      },
      section7: {
        title: '7. Data Retention',
        content: 'We retain your personal data only for as long as necessary for the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.'
      },
      section8: {
        title: '8. Changes to This Policy',
        content: 'We may update our Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on this page and, if the changes are significant, we will send a notification.'
      },
      section9: {
        title: '9. Contact',
        content: 'If you have questions about this Privacy Policy, please contact us at:'
      },
      lastUpdate: 'Last updated:'
    },
    accessibility: {
      skipToContent: 'Skip to main content',
      highContrastMode: 'High contrast mode',
      defaultMode: 'Default mode',
      toggleHighContrast: 'Toggle high contrast mode',
      acessibilidade: {
        titulo: 'Accessibility',
        contraste: 'Contrast',
        contrasteAlto: 'High contrast',
        contrasteNormal: 'Normal contrast',
        toggleMenu: 'Open accessibility menu',
        ocultar: 'Hide controls',
        atalhoAltA: 'Press Alt+A to display accessibility controls',
        opcoesAcessibilidade: 'Accessibility options'
      }
    }
  },
  es: {
    nav: {
      services: 'Servicios',
      expertise: 'Experiencia',
      cases: 'Casos',
      contact: 'Contacto',
      connect: 'Conectar',
      backToTop: 'Volver arriba',
      connectLinkedIn: 'Conectar en LinkedIn',
      mainNavigation: 'Navegación principal'
    },
    language: {
      selectLanguage: 'Seleccionar idioma'
    },
    hero: {
      title: 'Transformación Digital con Ingeniería de Vanguardia',
      subtitle: 'Consultoría técnica especializada en Ingeniería de Datos, Desarrollo Full-Stack y Arquitectura de Sistemas enfocada en soluciones escalables e innovadoras.',
      cta: {
        start: 'Iniciar Proyecto',
        portfolio: 'Ver Portfolio'
      }
    },
    techStack: {
      title: 'Stack Tecnológico'
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones especializadas para sus necesidades tecnológicas',
      skills: 'Habilidades',
      dataEngineering: {
        title: 'Ingeniería de Datos',
        description: 'Arquitectura e implementación de pipelines de datos escalables, ETL/ELT y data lakes utilizando las mejores prácticas del mercado.'
      },
      fullstack: {
        title: 'Desarrollo Full-Stack',
        description: 'Aplicaciones web modernas y APIs robustas utilizando las últimas tecnologías del mercado.'
      },
      architecture: {
        title: 'Arquitectura de Sistemas',
        description: 'Diseño e implementación de arquitecturas escalables, microservicios y sistemas distribuidos.'
      }
    },
    expertise: {
      title: 'Áreas de Experiencia',
      subtitle: 'Conocimiento especializado en áreas estratégicas',
      technologies: 'Tecnologías relacionadas',
      ai: {
        title: 'Inteligencia Artificial',
        description: 'Desarrollo e implementación de soluciones de IA y ML para optimización de procesos y toma de decisiones.'
      },
      cloud: {
        title: 'Cloud Computing',
        description: 'Arquitectura y gestión de infraestructura en la nube enfocada en escalabilidad y seguridad.'
      },
      devops: {
        title: 'DevOps & SRE',
        description: 'Implementación de prácticas DevOps y SRE para automatización y confiabilidad de sistemas.'
      }
    },
    caseStudy: {
      results: 'Resultados',
      technologies: 'Tecnologías utilizadas',
      metrics: 'Métricas de rendimiento',
      learnMore: 'Saber más sobre'
    },
    cases: {
      title: 'Casos de Éxito',
      subtitle: 'Proyectos que transformaron negocios',
      dataWarehouse: {
        title: 'Data Warehouse Empresarial',
        description: 'Implementación de data warehouse moderno para empresa del sector financiero.',
        results: '60% de reducción en el tiempo de procesamiento y 40% de ahorro en costos de infraestructura.'
      },
      ecommerce: {
        title: 'Plataforma de E-commerce',
        description: 'Desarrollo de plataforma de e-commerce escalable con microservicios.',
        results: '45% de aumento en la tasa de conversión y 30% de reducción en el tiempo de carga.'
      },
      metrics: {
        processing: 'Datos Procesados',
        performance: 'Mejora de Rendimiento',
        conversion: 'Tasa de Conversión'
      }
    },
    stats: {
      projects: 'Proyectos Entregados',
      data: 'Datos Procesados',
      uptime: 'Uptime',
      support: 'Soporte'
    },
    contact: {
      title: 'Póngase en Contacto',
      subtitle: 'Vamos a convertir su idea en realidad',
      info: {
        title: 'Información de Contacto'
      },
      email: 'Correo',
      emailAriaLabel: 'Enviar correo a contact@devferreirag.com',
      phone: 'Teléfono',
      phoneAriaLabel: 'Llamar a +55 11 91234-5678',
      location: 'Ubicación',
      form: {
        title: 'Formulario de Contacto',
        name: 'Nombre',
        namePlaceholder: 'Su nombre completo',
        email: 'Correo',
        emailPlaceholder: 'su@email.com',
        message: 'Mensaje',
        messagePlaceholder: 'Describa su proyecto o necesidad...',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        retry: 'Intentar de Nuevo',
        errorTitle: '¡Ups! Algo salió mal',
        errorMessage: 'Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo.',
        successTitle: '¡Mensaje Enviado!',
        successMessage: 'Gracias por su mensaje. Me pondré en contacto con usted pronto.',
        sendAnother: 'Enviar otro mensaje',
        errors: {
          nameRequired: 'Por favor, ingrese su nombre',
          emailRequired: 'Por favor, ingrese su correo',
          emailInvalid: 'Por favor, ingrese un correo válido',
          messageRequired: 'Por favor, escriba su mensaje'
        }
      }
    },
    footer: {
      copyright: '© 2025 DevFerreiraG. Transformando ideas en soluciones tecnológicas.',
      navigation: 'Enlaces de navegación del pie de página',
      rights: 'Todos los derechos reservados',
      privacy: 'Política de Privacidad',
      privacyPolicy: 'Ver política de privacidad',
      terms: 'Términos de Uso',
      termsOfService: 'Ver términos de uso'
    },
    termsPage: {
      title: 'Términos de Uso',
      rights: 'Todos los derechos reservados',
      backToHome: 'Volver a la página de inicio',
      section1: {
        title: '1. Aceptación de los Términos',
        content: 'Bienvenido al sitio web DevFerreiraG. Al acceder o utilizar nuestro sitio, usted acepta cumplir y estar sujeto a estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder o utilizar nuestro sitio.'
      },
      section2: {
        title: '2. Cambios en los Términos',
        content: 'Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento. Es su responsabilidad verificar periódicamente los cambios. El uso continuado del sitio después de la publicación de cualquier modificación constituye la aceptación de esas modificaciones.'
      },
      section3: {
        title: '3. Uso del Sitio',
        content: 'Al utilizar nuestro sitio, usted acepta:',
        list: [
          'No violar ninguna ley aplicable;',
          'No publicar o transmitir contenido que sea ilegal, fraudulento, engañoso, difamatorio, obsceno o dañino;',
          'No interferir con el funcionamiento normal del sitio;',
          'No intentar acceder a áreas del sitio que no estén intencionalmente disponibles para el público;',
          'No utilizar el sitio para distribuir material publicitario o promocional no solicitado;',
          'No recopilar o almacenar datos personales de otros usuarios.'
        ]
      },
      section4: {
        title: '4. Propiedad Intelectual',
        content1: 'El sitio y todo su contenido, características y funcionalidades (incluidos, entre otros, información, textos, gráficos, logotipos, imágenes, código y diseño) son propiedad de DevFerreiraG y están protegidos por derechos de autor, marcas registradas y otras leyes de propiedad intelectual.',
        content2: 'No puede reproducir, distribuir, modificar, crear obras derivadas, mostrar públicamente, ejecutar públicamente, republicar, descargar, almacenar o transmitir ningún material de nuestro sitio, excepto según lo permitido por estos Términos.'
      },
      section5: {
        title: '5. Enlaces a Otros Sitios',
        content: 'Nuestro sitio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por DevFerreiraG. No tenemos control y no asumimos responsabilidad por el contenido, las políticas de privacidad o las prácticas de cualquier sitio web o servicio de terceros. Usted reconoce y acepta que DevFerreiraG no será responsable, directa o indirectamente, de ningún daño o pérdida causada o supuestamente causada por o en relación con el uso o la confianza en cualquier contenido, bienes o servicios disponibles en o a través de dichos sitios web o servicios.'
      },
      section6: {
        title: '6. Terminación',
        content: 'Podemos terminar o suspender su acceso al sitio inmediatamente, sin previo aviso o responsabilidad, por cualquier motivo, incluyendo, sin limitación, si usted incumple los Términos. Tras la terminación, su derecho a utilizar el sitio cesará inmediatamente.'
      },
      section7: {
        title: '7. Limitación de Responsabilidad',
        content: 'En ningún caso DevFerreiraG, sus directores, empleados, socios, agentes, proveedores o afiliados serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo, incluyendo, sin limitación, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de:',
        list: [
          'Su acceso o uso o incapacidad para acceder o usar el sitio;',
          'Cualquier conducta o contenido de terceros en el sitio;',
          'Cualquier contenido obtenido del sitio; y',
          'Acceso no autorizado, uso o alteración de sus transmisiones o contenido.'
        ]
      },
      section8: {
        title: '8. Descargo de Garantías',
        content: 'El sitio se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo, expresas o implícitas. DevFerreiraG no garantiza que el sitio esté libre de errores, sea seguro o ininterrumpido, o que cumpla con sus requisitos específicos.'
      },
      section9: {
        title: '9. Ley Aplicable',
        content: 'Estos Términos se regirán e interpretarán de acuerdo con las leyes de Brasil, sin tener en cuenta sus principios de conflicto de leyes. Nuestra falla en hacer cumplir cualquier derecho o disposición de estos Términos no se considerará una renuncia a esos derechos.'
      },
      section10: {
        title: '10. Contacto',
        content: 'Si tiene alguna pregunta sobre estos Términos, por favor contáctenos al correo electrónico:'
      },
      lastUpdate: 'Última actualización:'
    },
    privacyPage: {
      title: 'Política de Privacidad',
      rights: 'Todos los derechos reservados',
      backToHome: 'Volver a la página de inicio',
      section1: {
        title: '1. Introducción',
        content1: 'DevFerreiraG está comprometida a proteger la privacidad y los datos personales de los usuarios que visitan nuestro sitio. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos su información.',
        content2: 'Al utilizar nuestro sitio, usted acepta las prácticas descritas en esta política.'
      },
      section2: {
        title: '2. Datos que Recopilamos',
        content: 'Podemos recopilar los siguientes tipos de información:',
        list: [
          '<strong>Información de identificación personal</strong>: Nombre, correo electrónico y teléfono cuando los proporciona voluntariamente a través de formularios de contacto.',
          '<strong>Información técnica</strong>: Dirección IP, tipo de navegador, proveedor de servicios de Internet, páginas de referencia/salida, sistema operativo, fecha/hora y datos de navegación.',
          '<strong>Cookies y tecnologías similares</strong>: Utilizamos cookies para mejorar la experiencia del usuario, analizar tendencias y administrar el sitio.'
        ]
      },
      section3: {
        title: '3. Cómo Utilizamos sus Datos',
        content: 'Utilizamos la información recopilada para los siguientes fines:',
        list: [
          'Proporcionar y mantener nuestros servicios;',
          'Mejorar, personalizar y expandir nuestra plataforma;',
          'Entender cómo los usuarios utilizan nuestros servicios;',
          'Desarrollar nuevos productos, servicios y funcionalidades;',
          'Comunicarnos con usted, respondiendo a solicitudes o proporcionando información solicitada;',
          'Enviar actualizaciones, alertas de seguridad y mensajes de soporte;',
          'Detectar, prevenir y resolver problemas técnicos o de seguridad.'
        ]
      },
      section4: {
        title: '4. Compartir de Datos',
        content: 'No vendemos, comercializamos ni transferimos su información personal identificable a terceros, excepto en las siguientes circunstancias:',
        list: [
          'Con proveedores de servicios que nos ayudan a operar el sitio y prestar servicios (bajo contratos que protegen su información);',
          'Para cumplir con obligaciones legales;',
          'Para proteger nuestros derechos, propiedad o seguridad;',
          'Con su consentimiento explícito para fines específicos.'
        ]
      },
      section5: {
        title: '5. Sus Derechos',
        content: 'De acuerdo con las leyes de protección de datos aplicables (LGPD en Brasil y GDPR en la UE), usted tiene los siguientes derechos:',
        list: [
          '<strong>Acceso</strong>: Solicitar acceso a sus datos personales;',
          '<strong>Rectificación</strong>: Solicitar corrección de datos inexactos;',
          '<strong>Eliminación</strong>: Solicitar la eliminación de sus datos;',
          '<strong>Restricción</strong>: Solicitar la restricción del procesamiento de sus datos;',
          '<strong>Portabilidad</strong>: Recibir sus datos en un formato estructurado;',
          '<strong>Oposición</strong>: Oponerse al procesamiento de sus datos;',
          '<strong>Retirada del consentimiento</strong>: Retirar su consentimiento en cualquier momento.'
        ]
      },
      section6: {
        title: '6. Seguridad de Datos',
        content: 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra pérdida accidental, uso indebido, acceso no autorizado, alteración o divulgación. Sin embargo, ninguna transmisión por Internet o método de almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar una seguridad absoluta.'
      },
      section7: {
        title: '7. Retención de Datos',
        content: 'Conservamos sus datos personales solo durante el tiempo necesario para los fines descritos en esta Política de Privacidad, a menos que un período de retención más largo sea requerido o permitido por la ley.'
      },
      section8: {
        title: '8. Cambios en esta Política',
        content: 'Podemos actualizar nuestra Política de Privacidad periódicamente. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y, si los cambios son significativos, enviaremos una notificación.'
      },
      section9: {
        title: '9. Contacto',
        content: 'Si tiene preguntas sobre esta Política de Privacidad, contáctenos al correo electrónico:'
      },
      lastUpdate: 'Última actualización:'
    },
    accessibility: {
      skipToContent: 'Saltar al contenido principal',
      highContrastMode: 'Modo de alto contraste',
      readingMode: 'Modo de lectura',
      defaultMode: 'Modo predeterminado',
      toggleHighContrast: 'Alternar modo de alto contraste',
      toggleReadingMode: 'Alternar modo de lectura',
      resetModes: 'Volver al modo predeterminado',
      navigationSections: 'Navegación de Secciones',
      backToTop: 'Volver arriba',
      acessibilidade: {
        titulo: 'Accesibilidad',
        contraste: 'Contraste',
        contrasteAlto: 'Alto contraste',
        contrasteNormal: 'Contraste normal',
        toggleMenu: 'Abrir menú de accesibilidad',
        ocultar: 'Ocultar controles',
        atalhoAltA: 'Presione Alt+A para mostrar los controles de accesibilidad',
        opcoesAcessibilidade: 'Opciones de accesibilidad'
      }
    }
  }
} as const;

export type TranslationKey = keyof typeof translations.en;