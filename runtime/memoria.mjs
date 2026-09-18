// Memoria do Michael — enxuta e honesta: um arquivo por usuario, guarda o que importa da Iasmin.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { randomUUID } from 'node:crypto'

export function casaDoMichael(env = process.env) {
  return env.APPDATA ? join(env.APPDATA, 'michael') : join(homedir(), '.michael')
}

export function caminhoMemoria(casa) {
  return join(casa, 'memory.json')
}

export function lerMemoria(casa) {
  const p = caminhoMemoria(casa)
  if (!existsSync(p)) return { schemaVersion: 1, memories: [] }
  try {
    const j = JSON.parse(readFileSync(p, 'utf8'))
    return Array.isArray(j.memories) ? j : { schemaVersion: 1, memories: [] }
  } catch {
    return { schemaVersion: 1, memories: [] }
  }
}

export function salvarMemoria(casa, store) {
  const p = caminhoMemoria(casa)
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, JSON.stringify(store, null, 2), 'utf8')
}

export function lembrar(casa, texto) {
  const t = String(texto ?? '').replace(/\s+/g, ' ').trim()
  if (t.length < 2) throw new Error('memoria vazia ou curta demais')
  const store = lerMemoria(casa)
  if (store.memories.some((m) => m.text.trim() === t)) {
    return { result: 'duplicate', total: store.memories.length }
  }
  const mem = { id: `michael-mem-${randomUUID()}`, text: t, createdAt: new Date().toISOString() }
  store.memories.push(mem)
  salvarMemoria(casa, store)
  return { result: 'saved', id: mem.id, total: store.memories.length }
}

export function esquecer(casa, id) {
  const store = lerMemoria(casa)
  const antes = store.memories.length
  store.memories = store.memories.filter((m) => m.id !== id)
  salvarMemoria(casa, store)
  return { result: antes === store.memories.length ? 'not-found' : 'removed', total: store.memories.length }
}
