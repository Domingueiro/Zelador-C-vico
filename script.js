// Inicialização do Mapa
let map = L.map('map').setView([-23.5505, -46.6333], 12); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function buscarDados() {
    const cep = document.getElementById('cep').value;
    if(!cep) { 
        alert("Por favor, digite um CEP para análise."); 
        return; 
    }

    // --- Lógica: Arrecadação vs. Investimento ---
    // Simulando valores baseados na média territorial
    const arrecadacaoEstimada = 1250400.00;
    const custeioOperacional = 1062840.00; // 85% para manutenção e folha
    const margemInvestimento = arrecadacaoEstimada - custeioOperacional;

    document.getElementById('arrecadacao').innerHTML = `
        <div style="color: #004a80; font-weight: bold; font-size: 1.2rem;">
            R$ ${arrecadacaoEstimada.toLocaleString('pt-BR')}
        </div>
        <div style="color: #28a745; font-size: 0.9rem; margin-top: 5px;">
            Margem para Investimento: R$ ${margemInvestimento.toLocaleString('pt-BR')} (15%)
        </div>
        <small style="color: #666;">Estimativa de arrecadação por densidade territorial</small>
    `;

    // --- Lógica: Radar de Licitações ---
    const radarConteudo = `
        <div style="border-left: 4px solid #dc3545; padding: 10px; background: #fff5f5; margin-bottom: 10px; border-radius: 4px;">
            <span style="color: #dc3545; font-weight: bold;">🔴 ALERTA CRÍTICO: MANUTENÇÃO SEMAFÓRICA</span><br>
            <small>Vencimento em 12 dias. Nenhum edital de renovação localizado no TCM.</small>
        </div>
        <div style="border-left: 4px solid #ffc107; padding: 10px; background: #fffdf2; margin-bottom: 10px; border-radius: 4px;">
            <span style="color: #856404; font-weight: bold;">🟡 ATENÇÃO: COLETA DE RESÍDUOS</span><br>
            <small>Contrato vence em 45 dias. Edital em fase de análise técnica.</small>
        </div>
        <div style="border-left: 4px solid #28a745; padding: 10px; background: #f2fff5; border-radius: 4px;">
            <span style="color: #28a745; font-weight: bold;">🟢 CONCLUÍDO: REFORMA DE PRAÇA</span><br>
            <small>Licitação finalizada. Obra com início previsto para 15 dias.</small>
        </div>
    `;
    
    document.getElementById('alertas').innerHTML = radarConteudo;

    // Simula movimento no mapa para o local do CEP
    alert("Tomografia Territorial concluída para o CEP: " + cep);
}

function acionarOrgao(orgao) {
    const cep = document.getElementById('cep').value || "Não informado";
    alert(`Gerando Protocolo de Alerta para o ${orgao}...\nBaseado no risco de descontinuidade de serviço no CEP: ${cep}`);
}
