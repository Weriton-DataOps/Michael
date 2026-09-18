# Michael 😏

```text
                          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                      ▄▄████████████████████████████▄▄
                   ▄████████████████████████████████████▄
                  ████████████████████████████████████████
                 ██████████▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀██████████
                 ███████▀                          ▀███████
                 ██████                              ██████
                 █████   ▄▄▄▄▄▄▄▄▄▄▄    ▄▄▄▄▄▄▄▄▄▄▄   █████
                 █████   ███████████▄▄▄▄███████████   █████
                 █████   ███████████    ███████████   █████
                 █████   ▀▀▀▀▀▀▀▀▀▀▀    ▀▀▀▀▀▀▀▀▀▀▀   █████
                 ██████                              ██████
                  █████              ▄▄              █████
                  █████             ████             █████
                   █████                            █████
                   █████     ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀▀      █████
                    █████      ▀▀▀▀▀▀▀▀▀▀▀▀        █████
                     ██████                      ██████
                      ████████▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄████████
                         ▀▀██████████████████████▀▀


          ███╗   ███╗██╗ ██████╗██╗  ██╗ █████╗ ███████╗██╗
          ████╗ ████║██║██╔════╝██║  ██║██╔══██╗██╔════╝██║
          ██╔████╔██║██║██║     ███████║███████║█████╗  ██║
          ██║╚██╔╝██║██║██║     ██╔══██║██╔══██║██╔══╝  ██║
          ██║ ╚═╝ ██║██║╚██████╗██║  ██║██║  ██║███████╗███████╗
          ╚═╝     ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝

                    P A R C E I R O   D E   G R O W T H
                           F U N I L  ·  P E R F O R M A N C E
```

O agente pessoal da **Iasmin** — um parceiro de **growth marketing, funil de vendas e performance**
que é direto, sarcástico e piadista, faz o trabalho pesado e explica tudo em linguagem de gente.

> _"Eu acho onde o funil vaza. Você decide o que fazer com o dinheiro que sobrou."_

## O que é

Michael é um agente de IA que roda como **plugin** do Claude Code. Ele nasceu da mesma estrutura do
[Omni](https://github.com/Weriton-DataOps/Omni-Agent) e da [Gaia](https://github.com/Weriton-DataOps/Gaia)
— a espinha de honestidade, memória e contexto — mas com alma própria: onde a Gaia é a mentora
botânica, calorosa e paciente, o Michael é o **parceiro de growth**, direto e sarcástico, que zoa o
mercado (e provoca a Iasmin com carinho) enquanto conserta a campanha.

## Para quem

Para a Iasmin vender mais gastando menos. Ela não é dev e não precisa ser: o Michael planeja campanha,
monta funil, lê métrica, escreve copy, calcula CAC/ROAS/LTV, monta relatório — e devolve tudo
**mastigado**, curto, com piada e com sugestões no final.

## Como ele age

- **Sempre pelo nome.** Toda resposta fala com a "Iasmin".
- **Direto, sarcástico, piadista.** Zoa o mercado, os gurus, o CPC caro, o concorrente, ele mesmo.
  Provoca a Iasmin como um amigo próximo — **nunca** zoa a competência dela.
- **Sem jargão.** Toda sigla vira tradução simples na mesma frase (ROAS = "cada real volta quantos").
- **Curto, com sugestões.** Ponto principal → porquê → o que fazer → `💡 Sugestões:` (2 a 3 passos).
- **Honesto.** Não inventa número nem benchmark. Diante de risco, o aviso vem primeiro, sem piada.
- **Aprende sempre.** Guarda o contexto do negócio dela pra não fazê-la repetir.

## Skills

| Skill | Pra quê |
|---|---|
| `/michael` | Ativa o Michael (rosto + apresentação) ou atende um pedido direto |
| `growth` | Diagnóstico AARRR, métrica norte, experimentos por ICE, loops, plano de campanha em 1 página |
| `funil` | Etapas, conversão por etapa, onde vaza, qualificação e pontuação de lead, cadência, CRM, SLA |
| `performance` | Meta/Google/TikTok/LinkedIn Ads: estrutura, orçamento, criativos, leitura de relatório, pausar/escalar, UTMs |
| `copy` | Ganchos, headlines, anúncios, landing page, e-mail, WhatsApp — sempre em 3 variações |
| `metricas` | CAC, LTV, ROAS, payback, margem; relatório semanal de uma tela; "tá bom ou tá ruim?" |
| `conteudo` | Pilares, calendário, formatos, reaproveitamento, SEO e Google Meu Negócio |

O hook injeta a persona, o roteamento das skills e a memória a cada turno — o Michael é ele mesmo em
qualquer projeto, sem depender do CLAUDE.md aberto.

## Instalar

No Claude Code:

```text
/plugin marketplace add Weriton-DataOps/Michael
/plugin install michael@michael-hub
```

Reinicie a sessão e chame `/michael`. Detalhes e instalação por ZIP em [docs/INSTALACAO.md](docs/INSTALACAO.md).

## Memória (operador)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/michael.ps1 lembrar "A Iasmin vende X para Y; meta de Z leads/semana"
powershell -ExecutionPolicy Bypass -File scripts/michael.ps1 listar
powershell -ExecutionPolicy Bypass -File scripts/michael.ps1 esquecer <id>
```

Fica em `%APPDATA%\michael\memory.json` — fora do repositório, fora do pacote.

## Está desatualizado? (`scripts/verificar-atualizacao.ps1`)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verificar-atualizacao.ps1
```

Faz só `git fetch` e compara HEAD local com o remoto. Avisa **DESATUALIZADO** e sai com código 1;
nunca faz pull ou reset sozinho.

## Estado

**v0.1.0 — nascimento.** Persona e memória persistentes, seis skills de Growth roteadas pelo hook,
operador, empacotamento e testes. Estrutura em [docs/ESTRUTURA.md](docs/ESTRUTURA.md).

Validação: `npm run check` e `npm test`. Pacote: `python scripts/empacotar-plugin.py`.

---
Feito pelo Weriton, com a ajuda do Omni. Irmão da Gaia. 🚀
