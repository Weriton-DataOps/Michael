# Prova: `/michael` abre com o rosto em braille (headless, plugin carregado)

Data: 2026-09-18 · Claude Code 2.1.270 · plugin michael 0.1.0 (commit `9952756`).

## Comando

De uma pasta **vazia** (sem CLAUDE.md, sem outro plugin do Michael), com o plugin carregado pela pasta
do clone:

```text
claude --plugin-dir "C:\Users\wp.santos\Documents\Michael" -p "/michael" --max-turns 2 --output-format text
```

## Resultado

70 linhas. A saída começa em ` ```text ` seguido das 40 linhas do rosto em braille, o banner MICHAEL,
os dois subtítulos, e só então a apresentação — chamando a Iasmin pelo nome, com emojis e fechando em
`💡 Sugestões pra começar:` com três passos. Nenhuma palavra antes do desenho.

## Fidelidade do desenho (diff contra `skills/michael/SKILL.md`)

51 linhas esperadas, 51 obtidas, **2 diferentes**, ambas um glifo a mais numa sequência repetida:

| Linha | Arquivo | Saída |
|---|---|---|
| 24 | `…⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⣛⣿…` (12 × `⠛`) | 13 × `⠛` |
| 48 | `╚═╝     ╚═╝╚═╝ ╚═════╝…` | um `╚═╝` a mais |

Causa: o modelo **redesenha** o bloco a partir da skill (não há caminho para exibir um arquivo
literalmente na conversa), e sequências longas do mesmo glifo são onde a contagem escorrega. É a mesma
fragilidade do mecanismo da Gaia. Visualmente, um deslocamento de uma coluna em uma linha de 80 não é
perceptível; o rosto, o chapéu, o aviador, o nariz e a boca saíram íntegros.

## Nome da skill quando instalado pelo marketplace

Com `--plugin-dir`, `/michael` resolve direto. Instalado por `michael-hub`, o nome completo é
`/michael:michael` (plugin `michael`, skill `michael`); o cliente costuma aceitar a forma curta quando
não há ambiguidade.
