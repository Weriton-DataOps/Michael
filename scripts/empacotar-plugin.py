"""Empacota somente os componentes distribuíveis do Michael, sem memória pessoal nem arquivos de trabalho."""
from pathlib import Path
import hashlib
import json
import zipfile


def empacotar(root):
    root = Path(root).resolve()
    manifest = json.loads((root / '.claude-plugin/plugin.json').read_text(encoding='utf-8'))
    package = json.loads((root / 'package.json').read_text(encoding='utf-8'))
    if manifest['name'] != 'michael' or manifest['version'] != package['version']:
        raise ValueError('Nome ou versão do plugin inconsistente')
    version = manifest['version']
    if not all(part.isdigit() for part in version.split('.')) or len(version.split('.')) != 3:
        raise ValueError('Versão deve ser major.minor.patch')
    output = root / 'artifacts' / f'michael-{version}.zip'
    output.parent.mkdir(exist_ok=True)
    files = []
    for folder in ['.claude-plugin', 'contratos', 'hooks', 'runtime', 'skills', 'scripts', 'testes']:
        files.extend(p for p in (root / folder).rglob('*') if p.is_file()
                     and '__pycache__' not in p.parts and not p.is_symlink())
    for name in ['package.json', 'README.md', 'CLAUDE.md', 'CHANGELOG.md',
                 'docs/ESTRUTURA.md', 'docs/INSTALACAO.md']:
        files.append(root / name)
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for p in sorted(files):
            p.resolve().relative_to(root)
            archive.write(p, p.relative_to(root).as_posix())
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_suffix('.zip.sha256').write_text(f'{digest}  {output.name}\n', encoding='utf-8')
    return output


if __name__ == '__main__':
    print(empacotar(Path(__file__).resolve().parents[1]))
