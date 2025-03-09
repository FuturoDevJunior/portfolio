import React, { useEffect } from 'react';

import { useLanguage } from '../../hooks/useLanguage';
import LegalPage from '../templates/LegalPage';

export function PrivacyPolicy() {
    const { language } = useLanguage();

    // Textos traduzidos
    const texts = {
        title: language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy',
    };

    // Data da última atualização: 05 de novembro de 2023
    const lastUpdated = '2023-11-05';

    // Garantir que as seções são reconhecidas após o componente ser montado
    useEffect(() => {
        // Dispara um evento customizado para notificar que o conteúdo foi carregado
        const event = new CustomEvent('contentLoaded');
        window.dispatchEvent(event);
    }, []);

    return (
        <LegalPage title={texts.title} lastUpdated={lastUpdated}>
            <section className="mb-8" id="section-introducao">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Introdução</h2>
                <p className="mb-4">
                    A <strong>DevFerreiraG</strong> está comprometida em proteger a privacidade e os dados pessoais dos usuários que visitam nosso site.
                    Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.
                </p>
                <p className="mb-4">
                    Nosso compromisso é com a transparência e a segurança dos seus dados, em conformidade com:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Lei Geral de Proteção de Dados (LGPD) no Brasil;</li>
                    <li>Regulamento Geral de Proteção de Dados (GDPR) na União Europeia;</li>
                    <li>Melhores práticas globais de privacidade digital.</li>
                </ul>
                <p>
                    Ao utilizar nosso site, você concorda com as práticas descritas nesta política.
                </p>
            </section>

            <section className="mb-8" id="section-dados-coletados">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. Dados que Coletamos</h2>
                <p className="mb-4">Podemos coletar os seguintes tipos de informações:</p>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium mb-2 text-purple-300">2.1. Informações de identificação pessoal</h3>
                        <p className="mb-2">Coletamos estes dados apenas quando você os fornece voluntariamente:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Nome completo</li>
                            <li>Endereço de e-mail</li>
                            <li>Número de telefone (opcional)</li>
                            <li>Informações do formulário de contato</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium mb-2 text-purple-300">2.2. Informações técnicas e de uso</h3>
                        <p className="mb-2">Coletamos automaticamente para melhorar a experiência:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Endereço IP</li>
                            <li>Tipo de navegador e configurações</li>
                            <li>Informações do dispositivo</li>
                            <li>Páginas visitadas e interações</li>
                            <li>Data e hora das visitas</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium mb-2 text-purple-300">2.3. Cookies e tecnologias semelhantes</h3>
                        <p className="mb-2">Utilizamos cookies e tecnologias similares para:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Lembrar suas preferências</li>
                            <li>Entender como você utiliza nosso site</li>
                            <li>Melhorar a navegação e experiência</li>
                            <li>Analisar o desempenho do site</li>
                        </ul>
                        <p className="mt-2 text-gray-400 text-sm">
                            Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8" id="section-uso-dados">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">3. Como Utilizamos seus Dados</h2>
                <p className="mb-4">Utilizamos as informações coletadas para os seguintes fins:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer, manter e melhorar nossos serviços;</li>
                    <li>Processar solicitações de contato e fornecer suporte;</li>
                    <li>Personalizar e aprimorar sua experiência;</li>
                    <li>Analisar tendências de uso e otimizar o site;</li>
                    <li>Garantir a segurança e proteger contra atividades fraudulentas;</li>
                    <li>Cumprir obrigações legais.</li>
                </ul>
            </section>

            <section className="mb-8" id="section-compartilhamento">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">4. Compartilhamento de Dados</h2>
                <p className="mb-4">A DevFerreiraG não vende, aluga ou compartilha suas informações pessoais com terceiros para fins de marketing, exceto nas seguintes circunstâncias:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Prestadores de serviços</strong>: Parceiros que nos auxiliam na operação do site (ex: processamento de pagamentos, análise de dados);</li>
                    <li><strong>Requisitos legais</strong>: Quando exigido por lei ou para proteger nossos direitos;</li>
                    <li><strong>Consentimento explícito</strong>: Quando você autorizar expressamente.</li>
                </ul>
                <p className="mt-4">
                    Todos os terceiros com quem compartilhamos dados estão sujeitos a rigorosas políticas de segurança e confidencialidade.
                </p>
            </section>

            <section className="mb-8" id="section-seus-direitos">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">5. Seus Direitos</h2>
                <p className="mb-4">Como titular dos dados, você tem os seguintes direitos:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-purple-800/30 p-3 rounded-lg">
                        <h3 className="font-medium text-purple-300 mb-2">Acesso</h3>
                        <p className="text-sm">Solicitar uma cópia dos dados que temos sobre você</p>
                    </div>
                    <div className="border border-purple-800/30 p-3 rounded-lg">
                        <h3 className="font-medium text-purple-300 mb-2">Retificação</h3>
                        <p className="text-sm">Corrigir dados incompletos ou imprecisos</p>
                    </div>
                    <div className="border border-purple-800/30 p-3 rounded-lg">
                        <h3 className="font-medium text-purple-300 mb-2">Exclusão</h3>
                        <p className="text-sm">Solicitar a remoção dos seus dados pessoais</p>
                    </div>
                    <div className="border border-purple-800/30 p-3 rounded-lg">
                        <h3 className="font-medium text-purple-300 mb-2">Restrição</h3>
                        <p className="text-sm">Limitar o processamento dos seus dados</p>
                    </div>
                    <div className="border border-purple-800/30 p-3 rounded-lg">
                        <h3 className="font-medium text-purple-300 mb-2">Portabilidade</h3>
                        <p className="text-sm">Receber seus dados em formato estruturado</p>
                    </div>
                    <div className="border border-purple-800/30 p-3 rounded-lg">
                        <h3 className="font-medium text-purple-300 mb-2">Oposição</h3>
                        <p className="text-sm">Opor-se ao processamento dos seus dados</p>
                    </div>
                </div>
                <p className="mt-4">
                    Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail:
                    <a href="mailto:privacy@devferreirag.com" className="text-purple-400 hover:underline ml-1">privacy@devferreirag.com</a>
                </p>
            </section>

            <section className="mb-8" id="section-seguranca">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">6. Segurança de Dados</h2>
                <p className="mb-4">
                    Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra perda acidental,
                    acesso não autorizado, alteração ou divulgação. Nossas medidas de segurança incluem:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Criptografia de dados sensíveis;</li>
                    <li>Firewalls e sistemas de detecção de intrusão;</li>
                    <li>Protocolos de acesso restrito a dados pessoais;</li>
                    <li>Avaliações regulares de segurança;</li>
                    <li>Treinamento de equipe em práticas de segurança de dados.</li>
                </ul>
            </section>

            <section className="mb-8" id="section-alteracoes">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">7. Alterações nesta Política</h2>
                <p className="mb-4">
                    Podemos atualizar nossa Política de Privacidade periodicamente para refletir alterações em nossas práticas ou
                    por outros motivos operacionais, legais ou regulatórios.
                </p>
                <p>
                    Encorajamos que você revise esta política regularmente para garantir que está ciente de quaisquer alterações.
                    Alterações significativas serão notificadas através de aviso em nosso site.
                </p>
            </section>

            <section id="section-contato">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">8. Contato</h2>
                <p className="mb-4">
                    Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais,
                    entre em contato através do e-mail:
                </p>
                <p className="font-medium">
                    <a href="mailto:contato@devferreirag.com" className="text-purple-400 hover:underline">contato@devferreirag.com</a>
                </p>
            </section>
        </LegalPage>
    );
}

export default PrivacyPolicy; 