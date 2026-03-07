export default async function handler(req, res) {
  // Permite CORS para qualquer origem (GitHub Pages incluso)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde ao preflight do browser
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  const { cep, logradouro, bairro, localidade, uf } = req.body;

  if (!cep || cep.replace(/\D/g, '').length !== 8) {
    return res.status(400).json({ erro: 'CEP inválido.' });
  }

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) {
    return res.status(500).json({ erro: 'Chave da API não configurada no servidor.' });
  }

  const prompt = `Você é um especialista em transparência pública e dados abertos da Prefeitura de São Paulo.

CEP consultado: ${cep}
Logradouro: ${logradouro || 'N/D'}
Bairro: ${bairro || 'N/D'}
Localidade: ${localidade}
UF: ${uf}

Gere uma análise territorial realista baseada em padrões históricos de investimento da PMSP, dados do Portal Obras Abertas, SIURB, GeoSampa, Plano Plurianual (PPA) e Subprefeituras.

Responda SOMENTE em JSON válido, sem markdown, sem texto extra:
{
  "bairro": "Nome do bairro",
  "subprefeitura": "Nome da Subprefeitura responsável",
  "total_obras": <número inteiro>,
  "investimento_total": "R$ X mi",
  "retorno_percentual": <número de 0 a 100>,
  "disparidade_label": "X,Xx mais/menos que a média SP",
  "nivel_alerta": "baixo|medio|alto",
  "analise": "3 parágrafos curtos sobre perfil territorial, investimentos em andamento e desafios/oportunidades da região. Seja específico ao bairro.",
  "alertas": [
    { "tipo": "critico|aviso", "titulo": "Título", "descricao": "Detalhe breve" }
  ],
  "obras": [
    {
      "nome": "Nome da obra ou projeto",
      "tipo": "Pavimentação|Saúde|Educação|Mobilidade|Habitação|Saneamento|Urbanismo|Iluminação|Outro",
      "status": "Em andamento|Prevista|Concluída|Contratada",
      "valor": "R$ X mi ou N/D",
      "detalhe": "Logradouro ou escopo resumido"
    }
  ],
  "comparativo": {
    "seu_cep_perc": <percentual 0-100 relativo ao máximo>,
    "media_sp_perc": <percentual 0-100>,
    "melhor_bairro_perc": 100,
    "melhor_bairro": "Nome do bairro mais investido de SP",
    "conclusao": "Frase comparativa sobre a disparidade territorial"
  },
  "whatsapp_msg": "Mensagem de 3 linhas para WhatsApp informando sobre a situação do bairro"
}

Liste 5 a 8 obras. Seja realista e específico para o CEP informado.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ erro: data.error.message });
    }

    // Extrai texto de todos os blocos
    const fullText = (data.content || [])
      .map(b => b.type === 'text' ? b.text : '')
      .filter(Boolean)
      .join('\n');

    // Extrai JSON da resposta
    let jsonStr = fullText;
    const fence = fullText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fence) jsonStr = fence[1];
    else {
      const curly = fullText.match(/\{[\s\S]*\}/);
      if (curly) jsonStr = curly[0];
    }

    const resultado = JSON.parse(jsonStr.trim());
    return res.status(200).json(resultado);

  } catch (err) {
    console.error('Erro:', err);
    return res.status(500).json({ erro: 'Falha ao processar análise: ' + err.message });
  }
}
