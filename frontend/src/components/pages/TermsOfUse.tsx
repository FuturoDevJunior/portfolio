import React, { useEffect } from 'react';

import { useLanguage } from '../../hooks/useLanguage';
import LegalPage from '../templates/LegalPage';

export function TermsOfUse() {
    const { language } = useLanguage();

    // Textos traduzidos
    const texts = {
        title: language === 'pt' ? 'Termos de Uso' : 'Terms of Use',
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
            <section className="mb-8" id="section-aceitacao">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Aceitação dos Termos</h2>
                <p className="mb-4">
                    Bem-vindo ao site da <strong>DevFerreiraG</strong>. Ao acessar e utilizar este site, você concorda em cumprir
                    e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos,
                    por favor, não utilize nosso site.
                </p>
                <p>
                    Estes termos podem ser atualizados periodicamente, sendo sua responsabilidade verificá-los regularmente.
                </p>
            </section>

            <section className="mb-8" id="section-uso-site">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. Uso do Site</h2>
                <p className="mb-4">Ao utilizar o site DevFerreiraG, você concorda em:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Utilizar o site apenas para fins legítimos e em conformidade com todas as leis e regulamentos aplicáveis;</li>
                    <li>Não se envolver em qualquer atividade que possa comprometer a segurança ou funcionalidade do site;</li>
                    <li>Não tentar acessar áreas restritas ou protegidas do site sem autorização;</li>
                    <li>Não coletar ou colher informações de outros usuários sem consentimento;</li>
                    <li>Não utilizar técnicas de engenharia reversa no código-fonte do site.</li>
                </ul>
            </section>

            <section className="mb-8" id="section-contas-usuarios">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">3. Contas de Usuário</h2>
                <p className="mb-4">Para determinadas funcionalidades do nosso site, pode ser necessário criar uma conta. Ao criar uma conta, você concorda que:</p>
                <div className="space-y-4">
                    <div className="border-l-4 border-purple-500 pl-4 py-1">
                        <h3 className="font-medium text-purple-300 mb-2">3.1. Informações da Conta</h3>
                        <p className="text-sm mb-2">
                            Todas as informações fornecidas no registro devem ser precisas, completas e atualizadas.
                            A DevFerreiraG reserva-se o direito de recusar ou cancelar sua conta a seu critério.
                        </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-1">
                        <h3 className="font-medium text-purple-300 mb-2">3.2. Segurança da Conta</h3>
                        <p className="text-sm mb-2">
                            Você é responsável por manter a confidencialidade de sua senha e por todas as atividades
                            que ocorrem em sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado.
                        </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-1">
                        <h3 className="font-medium text-purple-300 mb-2">3.3. Encerramento da Conta</h3>
                        <p className="text-sm">
                            A DevFerreiraG reserva-se o direito de suspender ou encerrar sua conta e acesso ao site por
                            violação destes termos ou por qualquer outro motivo justificável.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8" id="section-propriedade-intelectual">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">4. Propriedade Intelectual</h2>
                <p className="mb-4">
                    Todo o conteúdo disponível neste site, incluindo, mas não se limitando a textos, gráficos, logotipos, ícones,
                    imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da DevFerreiraG ou de seus
                    licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
                </p>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30 mb-4">
                    <h3 className="font-medium text-purple-300 mb-2">Uso Permitido</h3>
                    <p className="mb-2">Você pode visualizar e usar o conteúdo do site para uso pessoal e não comercial, sujeito às seguintes restrições:</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Não modificar ou copiar materiais sem autorização expressa;</li>
                        <li>Não utilizar os materiais para qualquer finalidade comercial;</li>
                        <li>Não transferir os materiais para outra pessoa ou site;</li>
                        <li>Não remover avisos de direitos autorais dos materiais.</li>
                    </ul>
                </div>

                <p>
                    O uso não autorizado do conteúdo deste site pode violar leis de direitos autorais, marcas registradas
                    e outras leis de propriedade intelectual, e pode resultar em responsabilidade civil e/ou criminal.
                </p>
            </section>

            <section className="mb-8" id="section-links-terceiros">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">5. Links para Sites de Terceiros</h2>
                <p className="mb-4">
                    Nosso site pode conter links para sites de terceiros que não são de propriedade ou controlados pela DevFerreiraG.
                    Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de
                    quaisquer sites de terceiros.
                </p>
                <p>
                    O acesso a qualquer outro site vinculado ao nosso é por sua conta e risco, e recomendamos que você leia
                    os termos e condições e política de privacidade de qualquer site de terceiros que visite.
                </p>
            </section>

            <section className="mb-8" id="section-limitacao-responsabilidade">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">6. Limitação de Responsabilidade</h2>
                <p className="mb-4">
                    Na extensão máxima permitida pela lei aplicável, a DevFerreiraG não será responsável por quaisquer danos
                    diretos, indiretos, incidentais, consequenciais, especiais ou exemplares, incluindo, mas não se limitando a,
                    danos por perda de lucros, ágio, uso, dados ou outras perdas intangíveis, resultantes de:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Uso ou incapacidade de usar o site;</li>
                    <li>Qualquer acesso não autorizado ou alteração de suas transmissões ou dados;</li>
                    <li>Declarações ou conduta de terceiros no site;</li>
                    <li>Qualquer outro assunto relacionado ao site.</li>
                </ul>
            </section>

            <section className="mb-8" id="section-indenizacao">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">7. Indenização</h2>
                <p>
                    Você concorda em indenizar, defender e isentar a DevFerreiraG, seus funcionários, contratados, diretores
                    e agentes de quaisquer reclamações, danos, responsabilidades, custos e despesas (incluindo honorários
                    advocatícios razoáveis) decorrentes ou relacionados ao seu uso do site ou qualquer violação destes Termos de Uso.
                </p>
            </section>

            <section className="mb-8" id="section-lei-aplicavel">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">8. Lei Aplicável</h2>
                <p>
                    Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil, sem
                    consideração aos seus princípios de conflito de leis. Qualquer disputa decorrente ou relacionada
                    a estes termos será submetida à jurisdição exclusiva dos tribunais localizados no Brasil.
                </p>
            </section>

            <section className="mb-8" id="section-rescisao">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">9. Rescisão</h2>
                <p className="mb-4">
                    A DevFerreiraG pode encerrar ou suspender seu acesso a qualquer momento, sem aviso prévio, por qualquer
                    motivo, incluindo, mas não se limitando a, violação destes Termos de Uso.
                </p>
                <p>
                    Todas as disposições destes Termos de Uso que, por sua natureza, devem sobreviver ao término, sobreviverão,
                    incluindo, sem limitação, disposições de propriedade, renúncias de garantia, indenização e limitações de responsabilidade.
                </p>
            </section>

            <section id="section-contato">
                <h2 className="text-2xl font-semibold mb-4 text-purple-400">10. Contato</h2>
                <p className="mb-4">
                    Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail:
                </p>
                <p className="font-medium">
                    <a href="mailto:contato@devferreirag.com" className="text-purple-400 hover:underline">contato@devferreirag.com</a>
                </p>
            </section>
        </LegalPage>
    );
}

export default TermsOfUse; 