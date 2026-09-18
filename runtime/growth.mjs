// Roteamento das skills de Growth — precisa funcionar tambem fora do clone, na instalacao do plugin.
import { join } from 'node:path'
import { readFileSync, readdirSync, existsSync } from 'node:fs'

// Ordem em que as skills sao apresentadas ao modelo (a de entrada primeiro).
const ORDEM = ['michael', 'growth', 'funil', 'performance', 'copy', 'metricas', 'conteudo']

function lerFrontmatter(md) {
  const m = md.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!m) return {}
  const out = {}
  for (const linha of m[1].split('\n')) {
    const i = linha.indexOf(':')
    if (i > 0) out[linha.slice(0, i).trim()] = linha.slice(i + 1).trim()
  }
  return out
}

export function listarSkills(pluginRoot) {
  const base = join(pluginRoot, 'skills')
  if (!existsSync(base)) return []
  const pastas = readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(base, d.name, 'SKILL.md')))
    .map((d) => d.name)
  pastas.sort((a, b) => {
    const ia = ORDEM.indexOf(a), ib = ORDEM.indexOf(b)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b)
  })
  return pastas.map((nome) => {
    const caminho = join(base, nome, 'SKILL.md')
    const fm = lerFrontmatter(readFileSync(caminho, 'utf8'))
    return { nome, caminho, descricao: fm.description || '' }
  })
}

export function contextoGrowth(pluginRoot) {
  const manifest = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin', 'plugin.json'), 'utf8'))
  const skills = listarSkills(pluginRoot)
  const linhas = skills
    .filter((s) => s.nome !== 'michael')
    .map((s) => `- ${s.nome}: ${s.descricao} → ${JSON.stringify(s.caminho)}`)
  return [
    `Michael plugin ${manifest.version}.`,
    'Todo pedido de growth, funil, mídia paga, copy, métricas ou conteúdo tem uma skill própria neste plugin. Leia a skill instalada indicada abaixo e siga o método dela; resolva as referências a partir da instalação, não do projeto aberto.',
    ...linhas,
    'Se o pedido cruzar mais de uma área, comece pela skill do maior gargalo e chame as outras conforme precisar. Nunca invente número, benchmark ou resultado de teste que não aconteceu.'
  ].join('\n')
}
