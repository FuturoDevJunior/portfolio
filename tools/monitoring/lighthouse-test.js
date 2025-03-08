/**
 * Script para testar a performance com Lighthouse em diferentes domínios
 * Requer: npm install -g lighthouse
 * 
 * Uso: node lighthouse-test.js
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Domínios para testar
const domains = [
  'https://www.devferreirag.com',
  'https://www.devferreirag.com.br'
];

// Criar pasta para relatórios se não existir
const reportsDir = path.join(__dirname, 'lighthouse-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

// Data e hora para o nome do arquivo
const now = new Date();
const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;

// Executar testes para cada domínio
domains.forEach((domain) => {
  const domainName = domain.replace(/^https?:\/\//, '').replace(/\./g, '-');
  const outputFile = path.join(reportsDir, `${domainName}_${timestamp}.html`);
  
  console.log(`\nExecutando teste Lighthouse para ${domain}...`);
  
  const command = `lighthouse ${domain} --output=html --output-path=${outputFile} --quiet --chrome-flags="--headless --no-sandbox --disable-gpu"`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar Lighthouse para ${domain}:`, error);
      return;
    }
    
    if (stderr) {
      console.error(`Erro no Lighthouse:`, stderr);
      return;
    }
    
    console.log(`\n✅ Teste para ${domain} concluído!`);
    console.log(`Relatório salvo em: ${outputFile}`);
    
    // Extrair as métricas principais do stdout
    const scores = {};
    
    const metrics = [
      { name: 'Performance', regex: /Performance: (\d+)/i },
      { name: 'Accessibility', regex: /Accessibility: (\d+)/i },
      { name: 'Best Practices', regex: /Best Practices: (\d+)/i },
      { name: 'SEO', regex: /SEO: (\d+)/i },
      { name: 'PWA', regex: /PWA: (\d+)/i }
    ];
    
    metrics.forEach(metric => {
      const match = stdout.match(metric.regex);
      if (match && match[1]) {
        scores[metric.name] = parseInt(match[1]);
      }
    });
    
    console.log('\nPontuações:');
    Object.entries(scores).forEach(([metric, score]) => {
      let color = '\x1b[32m'; // Verde
      if (score < 90) color = '\x1b[33m'; // Amarelo
      if (score < 70) color = '\x1b[31m'; // Vermelho
      
      console.log(`${color}${metric}: ${score}\x1b[0m`);
    });
  });
});

console.log('\n🔍 Testes Lighthouse iniciados. Os relatórios serão salvos em:', reportsDir); 