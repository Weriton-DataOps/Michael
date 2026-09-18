// Operador do Michael — CLI minimo: guardar, listar e esquecer memoria.
import { casaDoMichael, lerMemoria, lembrar, esquecer } from './memoria.mjs'

const [acao, ...resto] = process.argv.slice(2)
const casa = casaDoMichael()

if (acao === 'lembrar') {
  console.log(JSON.stringify(lembrar(casa, resto.join(' ')), null, 2))
} else if (acao === 'esquecer') {
  console.log(JSON.stringify(esquecer(casa, resto[0]), null, 2))
} else if (acao === 'listar' || acao === 'estado') {
  const s = lerMemoria(casa)
  console.log(JSON.stringify({ total: s.memories.length, memories: s.memories }, null, 2))
} else {
  console.log('uso: michael <lembrar "<fato>" | listar | estado | esquecer <id>>')
}
