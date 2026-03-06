// 1. Inicialização do Mapa
var map = L.map('map').setView([-23.5505, -46.6333], 12); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 2. Variável Global para Comparação
var dadoAtual = null;

// 3. Função Principal: Buscar e Analisar Dados
function buscarDados() {
    var campoCep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if(campoCep.length < 8) {
        alert("Por favor, digite o CEP completo (8 dígitos).");
        return;
    }

    // Configuração Inicial (Cenário Padrão)
    var info = { 
        bairro: "Região Geral", 
        valor: 1200000, 
        perc: 0.12, 
        msg: "<p style='color: #666;'>Analizando contratos locais de zeladoria...</p>" 
    };

    // CENÁRIO A: Centro/Itaim (Alta Arrecadação / Baixo Retorno)
    if(campoCep.startsWith('01') || campoCep.startsWith('045')) {
        info = { 
            bairro: "Centro/Itaim Bibi", 
            valor: 4850000, 
            perc: 0.08, 
            msg: `
                <div style="border-left: 4px solid #ffc107; padding: 10px; background: #fffdf2; margin-bottom: 10px;">
                    <b style="color: #856404;">🟡 LICITAÇÃO: RECAPEAMENTO</b><br>
                    <small>Sobrepreço de 30% detectado em relação à média regional.</small>
                </div>
                <div style="border-left: 4px solid #dc3545; padding: 10px; background: #fff5f5;">
                    <b style="color: #dc3545;">🔴 RADAR: FUGA DE RECURSO</b><br>
                    <small>92% da arrecadação local flui para o Tesouro Central.</small>
                </div>` 
        };
    } 
    // CENÁRIO B: Periferia/Extremo (Baixa Arrecadação / Alertas Críticos)
    else if(campoCep.startsWith('08') || campoCep.startsWith('058')) {
        info = { 
            bairro: "Periferia/Extremo", 
            valor: 620000, 
            perc: 0.05, 
            msg: `
                <div style="border-left: 4px solid #dc3545; padding: 10px; background: #fff5f5; margin-bottom: 10px;">
                    <b style="color: #dc3545;">🔴 ALERTA CRÍTICO: SEMÁFOROS</b><br>
                    <small>Risco de apagão em 10 dias por suspensão de manutenção local.</small>
                </div>
                <div style="border-left: 4px solid #dc3545; padding: 10px; background: #fff5f5;">
                    <b style="color: #dc3545;">🔴 DÉFICIT DE DIGNIDADE</b><br>
                    <small>Investimento 60% abaixo da meta de equilíbrio territorial.</small>
                </div>` 
        };
    }

    dadoAtual = info;
    var invLocal = info.valor * info.perc;

    // Atualiza Painel de Arrecadação
    document.getElementById('arrecadacao').innerHTML = `
        <div style="color: #004a80; font-weight: bold; font-size: 1.1rem;">${info.bairro}</div>
        <div style="font-size: 1.2rem; font-weight: bold;">Arrecadado: R$ ${info.valor.toLocaleString('pt-BR')}</div>
        <div style="color: ${info.perc < 0.1 ? '#dc3545' : '#28a745'}; font-weight: bold;">
            Retorno Local: R$ ${invLocal.toLocaleString('pt-BR')} (${(info.perc*100).toFixed(0)}%)
        </div>
    `;

    // Atualiza Painel de Alertas
    document.getElementById('alertas').innerHTML = info.msg;
    
    // Mostra o botão de comparação
    document.getElementById('btn-comparar-container').style.display = 'block';
    
    alert("Tomografia Territorial concluída!");
}

// 4. Função de Comparação de Disparidade
function mostrarComparativo() {
    if(!dadoAtual) return;
    
    var centroInv = 4850000 * 0.08;
    var localInv = dadoAtual.valor * dadoAtual.perc;
    var vezes = (centroInv / localInv).toFixed(1);

    document.getElementById('tabela-comparativa').innerHTML = `
        <div style="padding: 10px; background: #eee; border-radius: 5px; margin-bottom: 10px;">
            <p>O Centro recebe <b>${vezes}x mais</b> investimento direto que o seu território.</p>
        </div>
        <table style="width:100%; font-size: 0.85rem; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ccc;">
                <th style="text-align:left;">Item</th>
                <th>Seu CEP</th>
                <th>Centro</th>
            </tr>
            <tr>
                <td>Investimento</td>
                <td>R$ ${localInv.toLocaleString('pt-BR')}</td>
                <td>R$ ${centroInv.toLocaleString('pt-BR')}</td>
            </tr>
        </table>
    `;
    document.getElementById('modal-comparativo').style.display = 'block';
}

// 5. Funções de Ação
function acionarOrgao(orgao) { alert("Protocolo enviado ao " + orgao); }
function gerarRelatorio() { alert("Relatório formatado para WhatsApp!"); }

function mostrarComparativo() {
    if(!dadoAtual) return;
    var centroInv = 4800000 * 0.08;
    var localInv = dadoAtual.valor * dadoAtual.perc;
    var vezes = (centroInv / localInv).toFixed(1);

    document.getElementById('tabela-comparativa').innerHTML = "<p>O Centro recebe <b>" + vezes + "x mais</b> investimento que o seu CEP.</p>";
    document.getElementById('modal-comparativo').style.display = 'block';
}
