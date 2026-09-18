import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { mkdtemp, cp, mkdir, readFile, rm, access } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

import { listarSkills, contextoGrowth } from '../runtime/growth.mjs'
import { lerNucleo } from '../runtime/personalidade.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const SKILLS_ESPERADAS = ['michael', 'growth', 'funil', 'performance', 'copy', 'metricas', 'conteudo']

test('hook instalado funciona fora do clone com caminho contendo espaços', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'michael-plugin-'))
  try {
    const installed = join(temp, 'cache do plugin')
    const project = join(temp, 'projeto cliente')
    await mkdir(project)
    for (const dir of ['runtime', 'contratos', 'skills', 'hooks', '.claude-plugin']) {
      await cp(join(root, dir), join(installed, dir), { recursive: true })
    }
    const config = JSON.parse(await readFile(join(installed, 'hooks/hooks.json'), 'utf8'))
    const hook = config.hooks.UserPromptSubmit[0].hooks[0]
    const args = hook.args.map(arg => arg.replace('${CLAUDE_PLUGIN_ROOT}', installed))
    const result = spawnSync(hook.command, args, {
      cwd: project, encoding: 'utf8', timeout: 10000,
      env: { ...process.env, CLAUDE_PLUGIN_ROOT: installed, APPDATA: join(temp, 'profile') },
      input: JSON.stringify({ prompt: 'Michael, meu custo por lead subiu. O que eu faço?' })
    })
    assert.ifError(result.error)
    assert.equal(result.status, 0, result.stderr)
    const output = JSON.parse(result.stdout).hookSpecificOutput
    assert.equal(output.hookEventName, 'UserPromptSubmit')
    const ctx = output.additionalContext
    const manifest = JSON.parse(await readFile(join(installed, '.claude-plugin/plugin.json'), 'utf8'))
    assert.ok(ctx.includes(manifest.version))
    assert.ok(ctx.includes('Iasmin'))
    assert.ok(ctx.includes('michael-persona-v1'))
    assert.ok(ctx.includes('Sugestões'))
    assert.ok(!ctx.includes(root))
    // Cada skill de dominio precisa ser roteada pelo caminho instalado, e existir la.
    for (const nome of SKILLS_ESPERADAS.filter(n => n !== 'michael')) {
      const caminho = join(installed, 'skills', nome, 'SKILL.md')
      assert.ok(ctx.includes(JSON.stringify(caminho)), `roteamento de ${nome}`)
      await access(caminho)
    }
    // Links relativos da skill de entrada precisam resolver depois da relocacao.
    const entry = await readFile(join(installed, 'skills/michael/SKILL.md'), 'utf8')
    for (const link of entry.matchAll(/`\.\.\/([a-z]+)\/SKILL\.md`/g)) {
      await access(resolve(installed, 'skills/michael', `../${link[1]}/SKILL.md`))
    }
  } finally {
    await rm(temp, { recursive: true, force: true })
  }
})

test('todas as skills existem, tem frontmatter valido e nome igual a pasta', () => {
  const skills = listarSkills(root)
  assert.deepEqual(skills.map(s => s.nome), SKILLS_ESPERADAS)
  for (const s of skills) {
    assert.ok(s.descricao.length > 40, `descricao curta demais em ${s.nome}`)
    const md = readFileSync(s.caminho, 'utf8')
    assert.match(md, new RegExp(`^---\\s*\\nname: ${s.nome}\\n`), `frontmatter de ${s.nome}`)
    assert.ok(md.includes('Sugestões'), `${s.nome} precisa fechar com sugestoes`)
    assert.ok(md.includes('Iasmin'), `${s.nome} precisa falar com a Iasmin`)
  }
})

test('o roteamento lista as skills de dominio e a persona carrega as regras que nao se quebram', () => {
  const ctx = contextoGrowth(root)
  for (const nome of SKILLS_ESPERADAS.filter(n => n !== 'michael')) assert.ok(ctx.includes(`- ${nome}:`))
  assert.ok(!ctx.includes('- michael:'))

  const nucleo = lerNucleo(root)
  assert.ok(nucleo.startsWith('PERSONALIDADE michael-persona-v1'))
  for (const regra of ['NOME.', 'VOZ.', 'REGRA DE OURO: A IASMIN NÃO É DEV', 'FORMATO.', 'VERDADE ANTES DA PIADA', 'APRENDE SEMPRE']) {
    assert.ok(nucleo.includes(regra), `nucleo sem "${regra}"`)
  }
  assert.ok(nucleo.includes('💡 Sugestões:'))
})

test('a abertura nao anuncia a piada nem carrega bloco de sugestoes', () => {
  const skill = readFileSync(join(root, 'skills/michael/SKILL.md'), 'utf8')
  const abertura = skill.slice(skill.indexOf('## Abertura'), skill.indexOf('## Como você é'))
  const apresentacao = abertura.split('\n').filter(l => l.startsWith('>')).join('\n')
  for (const proibido of ['relatório triste', 'depois a gente ri', 'Sugestões pra começar', 'com piada']) {
    assert.ok(!apresentacao.includes(proibido), `abertura ainda diz "${proibido}"`)
  }
  assert.match(apresentacao, /E aí, Iasmin/)
  assert.ok(lerNucleo(root).includes('NÃO ANUNCIA A PIADA'))
})

test('versão do pacote e do manifesto distribuído concordam', async () => {
  const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  const manifest = JSON.parse(await readFile(join(root, '.claude-plugin/plugin.json'), 'utf8'))
  const marketplace = JSON.parse(await readFile(join(root, '.claude-plugin/marketplace.json'), 'utf8'))
  assert.equal(manifest.version, packageJson.version)
  assert.equal(manifest.name, 'michael')
  assert.equal(marketplace.plugins[0].name, 'michael')
})
