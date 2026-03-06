let map = L.map('map').setView([-23.5505, -46.6333], 12); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Variável global para guardar o último dado consultado
let dadoAtual = null;

function buscarDados() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if(!cep || cep.length < 8) { 
        alert("Digite um CEP válido."); 
        return; 
    }

    // Cenários de Simulação
    let dados = {
        bairro: "Região Geral",
        arrecadacao: 1250000,
        investimentoPerc: 0.12,
        alertas: `<p>Analizando contratos locais...</p>`
    };

    if(cep.startsWith('01') || cep.startsWith('045')) {
        dados.bairro = "Centro/Itaim Bibi";
        dados.arrecadacao = 4850000;
        dados.investimentoPerc = 0.08;
        dados.alertas = `<div style="border-left:4px solid #ffc107; padding:10px; background:#fffdf2;"><b>🟡 ALERTA:</b> Retorno de 8% em base de alta densidade.</div>`;
    } else if(cep.startsWith('08') || cep.startsWith('058')) {
        dados.bairro = "Periferia/Extremo";
        dados.arrecadacao = 620000;
        dados.investimentoPerc = 0.05;
        dados.alertas = `<div style="border-left:4px solid #dc3545; padding:10px; background:#fff5f5;"><b>🔴 CRÍTICO:</b> Apenas 5% de retorno. Déficit de manutenção detectado.</div>`;
    }

    dadoAtual = dados; // Salva para a comparação
    const margem = dados.arrecadacao * dados.investimentoPerc;

    document.getElementById('arrecadacao').innerHTML = `
        <div style="color: #004a80; font-weight: bold; font-size: 1.1rem;">${dados.bairro}</div>
        <div style="font-size: 1.2rem; font-weight: bold;">Arrecadado: R$ ${dados.arrecadacao.toLocaleString('pt-BR')}</div>
        <div style="color: ${dados.investimentoPerc < 0.1 ? '#dc3545' : '#28a745'}; font-weight: bold;">
            Retorno Local: R$ ${margem.toLocaleString('pt-BR')} (${(dados.investimentoPerc*100).toFixed(0)}%)
        </div>
    `;

    document.getElementById('alertas').innerHTML = dados.alertas;
    document.getElementById('btn-comparar-container').style.display = 'block';
    alert("Tomografia concluída!");
}

function mostrarComparativo() {
    if(!dadoAtual) return;

    const centro = { arrecadacao: 4850000, investimento: 4850000 * 0.08 };
    const seuBairro = { arrecadacao: dadoAtual.arrecadacao, investimento: dadoAtual.arrecadacao * dadoAtual.investimentoPerc };

    const htmlTabela = `
        <table style="width:100%; border-collapse: collapse; font-size: 0.9rem;">
            <tr style="background:#eee;">
                <th style="padding:8px; text-align:left;">Indicador</th>
                <th style="padding:8px;">Seu CEP</th>
                <th style="padding:8px;">Centro</th>
            </tr>
            <tr>
                <td style="padding:8px; border-bottom:1px solid #eee;">Arrecadação</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">R$ ${seuBairro.arrecadacao.toLocaleString('pt-BR')}</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">R$ ${centro.arrecadacao.toLocaleString('pt-BR')}</td>
            </tr>
            <tr style="color: #dc3545; font-weight:bold;">
                <td style="padding:8px;">Inv. Local</td>
                <td style="padding:8px;">R$ ${seuBairro.investimento.toLocaleString('pt-BR')}</td>
                <td style="padding:8px;">R$ ${centro.investimento.toLocaleString('pt-BR')}</td>
            </tr>
        </table>
        <p style="margin-top:10px; font-size:0.8rem; color:#666;">
            <b>Análise:</b> O Centro recebe ${(centro.investimento / seuBairro.investimento).toFixed(1)}x mais investimento direto que o seu território.
        </p>
    `;

    document.getElementById('tabela-comparativa').innerHTML = htmlTabela;
    document.getElementById('modal-comparativo').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

function acionarOrgao(orgao) { alert("Protocolo enviado ao " + orgao); }
function gerarRelatorio() { alert("Relatório formatado para WhatsApp!"); }
