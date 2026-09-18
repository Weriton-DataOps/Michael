# Usar o Michael 0.1.0 em outro PC

A pasta do projeto, o repositório no GitHub e o plugin instalado são cópias diferentes.
Alterar a pasta local não atualiza automaticamente a instalação em outro computador.

## Instalação pelo GitHub (recomendada)

No Claude Code, em qualquer projeto:

```text
/plugin marketplace add Weriton-DataOps/Michael
/plugin install michael@michael-hub
```

Reinicie a sessão para carregar o hook. Depois, `/michael` (nome completo: `/michael:michael`) abre o
Michael com o rosto em braille e a apresentação — prova headless em `docs/validacao/`; as skills de área ficam disponíveis como `michael:growth`, `michael:funil`,
`michael:performance`, `michael:copy`, `michael:metricas` e `michael:conteudo` — mas não precisa
chamá-las pelo nome: o hook injeta o roteamento a cada turno e o Michael lê a skill certa sozinho.

Pré-requisito: **Node.js** disponível no PATH (o hook e o operador rodam em Node).

Para atualizar: `/plugin`, atualize `michael-hub` na aba Marketplaces e o Michael na aba Installed.
Reinicie a sessão. A versão exibida no manifesto instalado deve ser **0.1.0**; o hook também informa
essa versão no contexto.

## Pacote local (ZIP)

Execute `python scripts/empacotar-plugin.py`. O ZIP `artifacts/michael-0.1.0.zip` contém manifesto,
runtime, skills, scripts, testes e docs, sem `.git` nem memória pessoal. Extraia em uma pasta nova e
teste com:

```text
claude --plugin-dir "C:\caminho\Michael-0.1.0"
```

O caminho deve apontar à pasta que contém `.claude-plugin`. Use uma sessão de teste sem outra versão
do Michael habilitada, para evitar duas cópias concorrentes.

## Memória

A memória da Iasmin fica em `%APPDATA%\michael\memory.json` (ou `~/.michael/memory.json` fora do
Windows). Não vai no repositório nem no pacote; em outro PC o Michael começa do zero e reaprende.
Para levar a memória junto, copie esse arquivo.

## Teste de comportamento

Em sessão nova, `/michael` e depois:

> Michael, meu custo por lead subiu de 20 pra 35 reais essa semana. O que eu faço?

Esperado: chama a Iasmin pelo nome, faz piada, **não** solta "CPL" sem traduzir, pede um dado por vez
se faltar (o que mudou? criativo? público? orçamento?), dá um diagnóstico curto seguindo a árvore da
skill `performance`, e fecha com `💡 Sugestões:` com 2 a 3 passos. Resposta longa, com sigla crua ou
sem sugestões está fora do contrato.

Referências: [plugins locais](https://code.claude.com/docs/en/plugins) e
[gerenciar plugins](https://code.claude.com/docs/en/discover-plugins).
