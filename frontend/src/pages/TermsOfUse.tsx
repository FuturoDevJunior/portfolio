import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export function TermsOfUse() {
    const { language } = useLanguage();

    // Textos traduzidos
    const texts = {
        title: language === 'pt' ? 'Termos de Uso' : 'Terms of Use',
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
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Aceitação dos Termos</h2>
                        <p className="mb-4">
                            Bem-vindo ao site DevFerreiraG. Ao acessar ou utilizar nosso site, você concorda em cumprir e estar vinculado a estes Termos de Uso.
                            Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nosso site.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. Alterações nos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. É sua responsabilidade verificar periodicamente alterações.
                            O uso contínuo do site após a publicação de quaisquer modificações constitui aceitação dessas modificações.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">3. Uso do Site</h2>
                        <p className="mb-4">Ao utilizar nosso site, você concorda em:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Não violar quaisquer leis aplicáveis;</li>
                            <li>Não publicar ou transmitir conteúdo que seja ilegal, fraudulento, enganoso, difamatório, obsceno ou prejudicial;</li>
                            <li>Não interferir no funcionamento normal do site;</li>
                            <li>Não tentar acessar áreas do site que não sejam intencionalmente disponibilizadas ao público;</li>
                            <li>Não utilizar o site para distribuir material publicitário ou promocional não solicitado;</li>
                            <li>Não coletar ou armazenar dados pessoais de outros usuários.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">4. Propriedade Intelectual</h2>
                        <p className="mb-4">
                            O site e todo o seu conteúdo, recursos e funcionalidades (incluindo, mas não limitado a, informações, textos, gráficos, logotipos, imagens,
                            código e design) são de propriedade da DevFerreiraG e estão protegidos por leis de direitos autorais, marcas registradas
                            e outras leis de propriedade intelectual.
                        </p>
                        <p>
                            Você não pode reproduzir, distribuir, modificar, criar obras derivadas, exibir publicamente, executar publicamente, republicar, baixar,
                            armazenar ou transmitir qualquer material do nosso site, exceto conforme permitido por estes Termos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">5. Links para Outros Sites</h2>
                        <p>
                            Nosso site pode conter links para sites de terceiros que não são de propriedade ou controlados pela DevFerreiraG.
                            Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou
                            serviços de terceiros. Você reconhece e concorda que a DevFerreiraG não será responsável, direta ou indiretamente, por qualquer dano
                            ou perda causada ou alegadamente causada por ou em conexão com o uso ou a confiança em qualquer conteúdo, bens ou serviços disponíveis
                            em ou através de tais sites ou serviços.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">6. Rescisão</h2>
                        <p>
                            Podemos encerrar ou suspender seu acesso ao site imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo,
                            incluindo, sem limitação, se você violar os Termos. Após a rescisão, seu direito de utilizar o site cessará imediatamente.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">7. Limitação de Responsabilidade</h2>
                        <p className="mb-4">
                            Em nenhuma circunstância a DevFerreiraG, seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados serão
                            responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de
                            lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes de:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Seu acesso ou uso ou incapacidade de acessar ou usar o site;</li>
                            <li>Qualquer conduta ou conteúdo de terceiros no site;</li>
                            <li>Conteúdo obtido do site; e</li>
                            <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">8. Isenção de Garantias</h2>
                        <p>
                            O site é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou implícitas.
                            A DevFerreiraG não garante que o site seja livre de erros, seguro ou ininterrupto, ou que cumpra seus requisitos específicos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">9. Lei Aplicável</h2>
                        <p>
                            Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem consideração a seus conflitos de
                            princípios legais. Nossa falha em fazer cumprir qualquer direito ou disposição destes Termos não será considerada uma
                            renúncia a esses direitos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">10. Contato</h2>
                        <p>
                            Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail:
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

export default TermsOfUse; 