let map = L.map('map').setView([-23.5505, -46.6333], 12); // Padrão São Paulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function buscarDados() {
    const cep = document.getElementById('cep').value;
    alert("Analisando território para: " + cep + "\nBuscando dados no TCM e Portal da Transparência...");
    document.getElementById('arrecadacao').innerText = "R$ 1.250.400,00";
    document.getElementById('alertas').innerText = "Licitação de Semáforos vence em 15 dias!";
}

function acionarOrgao(orgao) {
    alert("Protocolo gerado para o " + orgao + " com base nos dados do CEP informado.");
}
