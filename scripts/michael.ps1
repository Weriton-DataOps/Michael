$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot
$cli = Join-Path $raiz 'runtime/michael.mjs'
node $cli @args
if ($LASTEXITCODE -ne 0) { throw "O operador do Michael falhou com codigo $LASTEXITCODE." }
