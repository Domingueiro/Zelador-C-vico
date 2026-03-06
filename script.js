// 
// Inicialização do Mapa
let map = L.map('map').setView([-23.5505, -46.6333], 12); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function buscarDados() {
    // Limpa o CEP para aceitar apenas números
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if(!cep || cep.length < 8) { 
        alert("Por favor, digite um CEP válido (8 dígitos) para análise."); 
        return; 
    }

    // Configuração inicial de dados (Cenário Padrão)
    let dados = {
        arrecadacao: 1250000,
        investimentoPerc: 0.15,
        alertas: `<p style="color: #666; font-size: 0.9rem;">Analizando contratos ativos para este território...</p>`
    };

    // --- LÓGICA DE CONTRASTE TERRITORIAL ---

    // CENÁRIO A: Alta Arrecadação / Baixo Retorno Local (Ex: Centro 01xxx ou Itaim 045xx)
    if(cep.startsWith('01') || cep.startsWith('045')) {
        dados.arrecadacao = 4850000;
        dados.investimentoPerc = 0.08; // Apenas 8% retorna em zeladoria direta
        dados.alertas = `
            <div style="border-left: 4px solid #dc3545; padding: 10px; background: #fff5f5; margin-bottom: 10px; border-radius: 4px;">
                <span style="color: #dc3545; font-weight: bold;">🔴 RADAR: FUGA DE RECURSO</span><br>
                <small>92% da arrecadação deste CEP está sendo direcionada ao Tesouro Central ou outras regiões.</small>
            </div>
            <div style="border-left: 4px solid #ffc107; padding: 10px; background: #fffdf2; border-radius: 4px;">
                <span style="color: #856404; font-weight: bold;">🟡 LICITAÇÃO: RECAPEAMENTO</span><br>
                <small>Contrato regional com sobrepreço de 30%. Fiscalização sugerida pelo TCM.</small>
            </div>`;
    } 
    // CENÁRIO B: Periferia / Déficit de Manutenção (Ex: Guaianases 08xxx ou Capão 058xx)
    else if(cep.startsWith('08') || cep.startsWith('058')) {
        dados.arrecadacao = 620000;
        dados.investimentoPerc = 0.05; // Investimento crítico (quase nulo)
        dados.alertas = `
            <div style="border-left: 4px solid #dc3545; padding: 10px; background: #fff5f5; margin-bottom: 10px; border-radius: 4px;">
                <span style="color: #dc3545; font-weight: bold;">🔴 ALERTA CRÍTICO: SEMÁFOROS</span><br>
                <small>Risco de descontinuidade em 10 dias. Contrato de manutenção local suspenso.</small>
            </div>
            <div style="border-left: 4px solid #dc3545; padding: 10px; background: #fff5f5; border-radius: 4px;">
                <span style="color: #dc3545; font-weight: bold;">🔴 DÉFICIT DE DIGNIDADE</span><br>
                <small>Investimento em zeladoria 60% abaixo do mínimo necessário para a região.</small>
            </div>`;
    }

    // --- CÁLCULO E EXIBIÇÃO ---
    const margemInvestimento = dados.arrecadacao * dados.investimentoPerc;

    // Atualiza Painel de Arrecadação
    document.getElementById('arrecadacao').innerHTML = `
        <div style="color: #004a80; font-weight: bold; font-size: 1.2rem;">
            Arrecadado: R$ ${dados.arrecadacao.toLocaleString('pt-BR')}
        </div>
        <div style="color: ${dados.investimentoPerc < 0.1 ? '#dc3545' : '#28a745'}; font-size: 1rem; margin-top: 5px; font-weight: bold;">
            Retorno Local: R$ ${margemInvestimento.toLocaleString('pt-BR')} (${(dados.investimentoPerc*100).toFixed(0)}%)
        </div>
        <small style="color: #666; font-size: 0.8rem;">*Baseado na Densidade Econômica Territorial</small>
    `;

    // Atualiza Painel do Radar
    document.getElementById('alertas').innerHTML = dados.alertas;

    alert("Tomografia Territorial concluída!");
}

function acionarOrgao(orgao) {
    const cep = document.getElementById('cep').value || "Não informado";
    alert(`Gerando Protocolo de Alerta para o ${orgao}...\nBaseado no risco de descontinuidade de serviço no CEP: ${cep}`);
}

function gerarRelatorio() {
    const cep = document.getElementById('cep').value || "Não informado";
    alert("Gerando PDF do Relatório Territorial para o CEP " + cep + "...\nPronto para compartilhar com a Associação de Bairro via WhatsApp.");
}
