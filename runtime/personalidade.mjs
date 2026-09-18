// Le o nucleo textual da personalidade do Michael do contrato canonico.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function lerNucleo(pluginRoot) {
  const p = join(pluginRoot, 'contratos', 'personalidade', 'michael-persona-v1.md')
  const md = readFileSync(p, 'utf8')
  const m = md.match(/## N[uú]cleo textual\s+```text\s*([\s\S]*?)```/i)
  return m ? m[1].trim() : ''
}
