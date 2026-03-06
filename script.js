var map = L.map('map').setView([-23.5505, -46.6333], 12); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var dadoAtual = null;

function buscarDados() {
    var campoCep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if(campoCep.length < 8) {
        alert("Digite o CEP completo.");
        return;
    }

    // Dados Simulados
    var info = { bairro: "Geral", valor: 1200000, perc: 0.12, msg: "Analizando..." };

    if(campoCep.startsWith('01') || campoCep.startsWith('045')) {
        info = { bairro: "Centro/Itaim", valor: 4800000, perc: 0.08, msg: "🔴 Radar: Fuga de Recurso." };
    } else if(campoCep.startsWith('08') || campoCep.startsWith('058')) {
        info = { bairro: "Periferia/Extremo", valor: 650000, perc: 0.05, msg: "🔴 Crítico: Déficit de Dignidade." };
    }

    dadoAtual = info;
    var invLocal = info.valor * info.perc;

    document.getElementById('arrecadacao').innerHTML = "<b>" + info.bairro + "</b><br>Arrecadado: R$ " + info.valor.toLocaleString('pt-BR') + "<br><span style='color:red'>Investimento Local: R$ " + invLocal.toLocaleString('pt-BR') + "</span>";
    document.getElementById('alertas').innerHTML = info.msg;
    document.getElementById('btn-comparar-container').style.display = 'block';
    
    alert("Análise Concluída!");
}

function mostrarComparativo() {
    if(!dadoAtual) return;
    var centroInv = 4800000 * 0.08;
    var localInv = dadoAtual.valor * dadoAtual.perc;
    var vezes = (centroInv / localInv).toFixed(1);

    document.getElementById('tabela-comparativa').innerHTML = "<p>O Centro recebe <b>" + vezes + "x mais</b> investimento que o seu CEP.</p>";
    document.getElementById('modal-comparativo').style.display = 'block';
}
