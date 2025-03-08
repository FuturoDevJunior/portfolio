import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export function PrivacyPolicy() {
    const { language } = useLanguage();

    // Textos traduzidos
    const texts = {
        title: language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy',
        rights: language === 'pt' ? 'Todos os direitos reservados' : 'All rights reserved',
        backToHome: language === 'pt' ? 'Voltar para a página inicial' : 'Back to home'
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header simplificado */}
            <header className="border-b border-gray-800 bg-black/90 backdrop-blur-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                        <span className="text-xl font-bold">DevFerreiraG</span>
                    </a>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{texts.title}</h1>

                <div className="max-w-4xl mx-auto bg-gray-900/50 p-6 md:p-8 rounded-lg shadow-lg">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Introdução</h2>
                        <p className="mb-4">
                            A DevFerreiraG está comprometida em proteger a privacidade e os dados pessoais dos usuários que visitam nosso site.
                            Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.
                        </p>
                        <p>
                            Ao utilizar nosso site, você concorda com as práticas descritas nesta política.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. Dados que Coletamos</h2>
                        <p className="mb-4">Podemos coletar os seguintes tipos de informações:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Informações de identificação pessoal</strong>: Nome, e-mail e telefone quando você os fornece voluntariamente através de formulários de contato.</li>
                            <li><strong>Informações técnicas</strong>: Endereço IP, tipo de navegador, provedor de serviços de internet, páginas de referência/saída, sistema operacional, data/hora e dados de navegação.</li>
                            <li><strong>Cookies e tecnologias semelhantes</strong>: Utilizamos cookies para melhorar a experiência do usuário, analisar tendências e administrar o site.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">3. Como Utilizamos seus Dados</h2>
                        <p className="mb-4">Utilizamos as informações coletadas para os seguintes fins:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Fornecer e manter nossos serviços;</li>
                            <li>Melhorar, personalizar e expandir nossa plataforma;</li>
                            <li>Entender como os usuários utilizam nossos serviços;</li>
                            <li>Desenvolver novos produtos, serviços e funcionalidades;</li>
                            <li>Comunicar-se com você, respondendo a solicitações ou fornecendo informações solicitadas;</li>
                            <li>Enviar atualizações, alertas de segurança e mensagens de suporte;</li>
                            <li>Detectar, prevenir e resolver problemas técnicos ou de segurança.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">4. Compartilhamento de Dados</h2>
                        <p className="mb-4">
                            Não vendemos, comercializamos ou transferimos suas informações pessoais identificáveis para terceiros, exceto nas seguintes circunstâncias:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Com prestadores de serviços que nos auxiliam na operação do site e na prestação de serviços (sob contratos que protegem suas informações);</li>
                            <li>Para cumprir obrigações legais;</li>
                            <li>Para proteger nossos direitos, propriedade ou segurança;</li>
                            <li>Com seu consentimento explícito para fins específicos.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">5. Seus Direitos</h2>
                        <p className="mb-4">De acordo com as leis de proteção de dados aplicáveis (LGPD no Brasil e GDPR na UE), você tem os seguintes direitos:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Acesso</strong>: Solicitar acesso aos seus dados pessoais;</li>
                            <li><strong>Correção</strong>: Solicitar a correção de dados imprecisos;</li>
                            <li><strong>Exclusão</strong>: Solicitar a exclusão de seus dados;</li>
                            <li><strong>Restrição</strong>: Solicitar a restrição do processamento de seus dados;</li>
                            <li><strong>Portabilidade</strong>: Receber seus dados em formato estruturado;</li>
                            <li><strong>Oposição</strong>: Opor-se ao processamento de seus dados;</li>
                            <li><strong>Retirada de consentimento</strong>: Retirar seu consentimento a qualquer momento.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">6. Segurança de Dados</h2>
                        <p>
                            Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra perda acidental, uso indevido, acesso não autorizado, alteração ou divulgação. No entanto, nenhuma transmissão pela internet ou método de armazenamento eletrônico é 100% seguro, portanto, não podemos garantir segurança absoluta.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">7. Retenção de Dados</h2>
                        <p>
                            Mantemos seus dados pessoais apenas pelo tempo necessário para os fins descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">8. Alterações nesta Política</h2>
                        <p>
                            Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e, se as alterações forem significativas, enviaremos uma notificação.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">9. Contato</h2>
                        <p>
                            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail:
                            <a href="mailto:Contato.FerreiraG@outlook.com" className="text-purple-400 hover:underline ml-1">Contato.FerreiraG@outlook.com</a>
                        </p>
                    </section>

                    <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
                        <p>Última atualização: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </main>

            {/* Footer simplificado */}
            <footer className="bg-black border-t border-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} DevFerreiraG. {texts.rights}</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="/" className="hover:text-purple-400 transition-colors">
                                {texts.backToHome}
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default PrivacyPolicy; 