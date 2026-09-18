import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import { lembrar, lerMemoria, esquecer, casaDoMichael } from '../runtime/memoria.mjs'

test('o Michael guarda, relembra, deduplica e esquece', async () => {
  const casa = await mkdtemp(join(tmpdir(), 'michael-mem-'))
  try {
    const r = lembrar(casa, 'A Iasmin vende consultoria B2B; meta de 20 leads/semana pelo Meta Ads.')
    assert.equal(r.result, 'saved')
    assert.match(r.id, /^michael-mem-/)

    const store = lerMemoria(casa)
    assert.equal(store.memories.length, 1)
    assert.match(store.memories[0].text, /20 leads\/semana/)

    const dup = lembrar(casa, 'A Iasmin vende consultoria B2B; meta de 20 leads/semana pelo Meta Ads.')
    assert.equal(dup.result, 'duplicate')
    assert.equal(dup.total, 1)

    const rem = esquecer(casa, store.memories[0].id)
    assert.equal(rem.result, 'removed')
    assert.equal(lerMemoria(casa).memories.length, 0)
  } finally {
    await rm(casa, { recursive: true, force: true })
  }
})

test('memoria vazia e recusada', async () => {
  const casa = await mkdtemp(join(tmpdir(), 'michael-vazia-'))
  try {
    assert.throws(() => lembrar(casa, '   '), /vazia|curta/i)
  } finally {
    await rm(casa, { recursive: true, force: true })
  }
})

test('a casa do Michael nao se mistura com a da Gaia nem a do Omni', () => {
  const casa = casaDoMichael({ APPDATA: join('C:', 'perfil', 'AppData', 'Roaming') })
  assert.match(casa, /[\\/]michael$/)
  assert.doesNotMatch(casa, /gaia|omni/i)
})
