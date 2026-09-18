# Michael — verificar se o clone local está desatualizado em relação ao repositório remoto.
# Somente leitura: faz `git fetch`, compara HEAD local com origin/<branch> e a versão do package.json.
# Nunca faz pull, reset ou checkout. Sai com 0 = atualizado, 1 = desatualizado, 2 = erro.
param([string]$Branch = "main", [string]$Remote = "origin")
$ErrorActionPreference = "Stop"
$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz
try { git fetch $Remote --quiet 2>$null } catch { Write-Host "[Michael] Nao consegui consultar o remoto ($Remote)."; exit 2 }
if ($LASTEXITCODE -ne 0) { Write-Host "[Michael] Nao consegui consultar o remoto ($Remote)."; exit 2 }
$local  = (git rev-parse HEAD).Trim()
$remoto = (git rev-parse "$Remote/$Branch").Trim()
$atras  = [int](git rev-list --count "HEAD..$Remote/$Branch")
$frente = [int](git rev-list --count "$Remote/$Branch..HEAD")
$vLocal = (Get-Content package.json -Raw | ConvertFrom-Json).version
$vRemota = try { (git show "${Remote}/${Branch}:package.json" | ConvertFrom-Json).version } catch { "?" }
Write-Host "[Michael] versao local $vLocal ($($local.Substring(0,7))) | $Remote/$Branch $vRemota ($($remoto.Substring(0,7)))"
if ($atras -gt 0) {
  Write-Host "[Michael] DESATUALIZADO: $atras commit(s) atras de $Remote/$Branch. Atualize com 'git pull' quando quiser (nao faco isso sozinho)."
  exit 1
}
if ($frente -gt 0) { Write-Host "[Michael] Atualizado e com $frente commit(s) locais ainda nao publicados." } else { Write-Host "[Michael] Atualizado." }
exit 0
