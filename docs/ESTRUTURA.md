# Michael — estrutura atual (0.1.1)

Plugin Claude do Michael: persona e memória próprias; seis skills de Growth roteadas pelo hook.
Não depende do Omni, da Gaia, do Overcore Studio nem do agent-skills-hub.

| Caminho | Função |
|---|---|
| `.claude-plugin/` | Manifesto michael 0.1.1 e marketplace michael-hub |
| `contratos/personalidade/` | Persona canônica do Michael (`michael-persona-v1.md` + manifesto) |
| `runtime/` | Memória, operador, persona e roteamento das skills (`growth.mjs`) |
| `hooks/hooks.json` | UserPromptSubmit injeta persona, roteamento com caminhos instalados e memória |
| `skills/michael/` | Entrada: rosto, apresentação, roteamento para as irmãs |
| `skills/growth/` | AARRR, métrica norte, experimentos, ICE, loops, plano de campanha |
| `skills/funil/` | Etapas, conversão, vazamento, qualificação, scoring, cadência, CRM, SLA |
| `skills/performance/` | Mídia paga: estrutura, orçamento, públicos, criativos, diagnóstico, escala, rastreamento |
| `skills/copy/` | Fórmulas, ganchos, headline/CTA, landing page, anúncios, sequências |
| `skills/metricas/` | Unit economics, relatório semanal, árvore de veredito, coorte, planilhas |
| `skills/conteudo/` | Pilares, calendário, formatos, reaproveitamento, SEO, métricas de conteúdo |
| `docs/validacao/` | Provas datadas (abertura headless com rosto, diff de fidelidade) |
| `assets/` | Capa do README (`capa.png`) |
| `testes/` | Memória isolada, hook relocado, skills e roteamento, paridade de versão |
| `scripts/` | Operador, comparação com remoto, empacotamento e `retrato-braille.py` (imagem P&B → rosto em braille) |

Validação: `npm run check` e `npm test` (PowerShell com bloqueio de scripts: `npm.cmd`).
Distribuição: `python scripts/empacotar-plugin.py` (gera `artifacts/michael-<versão>.zip` + sha256).
Atualização/uso em outro PC: `docs/INSTALACAO.md`.
A memória da Iasmin fica em `%APPDATA%\michael\memory.json`, fora do repositório e do pacote.

## Como o Michael responde (o contrato em uma linha)

Nome dela → ponto principal → porquê em uma frase → o que fazer → piada no caminho → `💡 Sugestões:`.
Sigla sem tradução, código cru, texto longo ou resposta sem sugestões = fora do contrato.
