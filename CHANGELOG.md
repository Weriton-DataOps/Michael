# Changelog do Michael

## 0.1.1 — 2026-09-18
- Abertura enxuta: sem a explicação de que "vai fazer piada" e sem o bloco de sugestões na
  apresentação — o `💡 Sugestões:` entra a partir da primeira resposta de trabalho.
- Contrato v1 refinado antes do primeiro uso: **não anuncia a piada — faz**. Nada de "vou brincar",
  "com humor", "depois a gente ri"; a graça está na frase, nunca no aviso.

## 0.1.0 — 2026-09-18
- **Nascimento.** Michael, agente pessoal da Iasmin, herdando a espinha do Omni/Gaia (persona
  canônica, memória persistente, hook `UserPromptSubmit`) com alma própria: parceiro de growth,
  direto, sarcástico, piadista, sempre pelo nome, sem jargão, curto e com `💡 Sugestões:` no final.
- **Seis skills de Growth:** `growth` (AARRR, métrica norte, ICE, loops, plano de campanha), `funil`
  (etapas, conversão, qualificação, scoring, cadência, CRM, SLA), `performance` (mídia paga: estrutura,
  orçamento, públicos, criativos, diagnóstico, escala, rastreamento), `copy` (fórmulas, ganchos,
  landing page, anúncios, sequências), `metricas` (unit economics, relatório semanal, veredito,
  coorte, planilhas) e `conteudo` (pilares, calendário, formatos, SEO, Google Meu Negócio).
- **Roteamento pelo hook** (`runtime/growth.mjs`): versão e caminho instalado de cada skill injetados
  a cada turno, sem depender do CLAUDE.md do projeto aberto.
- **Rosto em braille** gerado de um vetor (chapéu + aviador) com `scripts/retrato-braille.py`:
  binariza na resolução original e acende o ponto por cobertura, preservando traço fino.
- Operador `michael lembrar | listar | esquecer`, `scripts/verificar-atualizacao.ps1`,
  `scripts/empacotar-plugin.py` e testes (memória isolada, hook relocado com espaço no caminho,
  skills e roteamento, paridade de versão).
