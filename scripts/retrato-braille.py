"""Converte uma imagem P&B em arte braille (2x4 pontos por caractere), como o retrato da Gaia.

Binariza na resolucao original (a marca d'agua clara fica acima do limiar e some), depois reduz a
mascara por media (BOX) e acende o ponto quando a cobertura de tinta na celula passa de `cobertura`.
Assim traco fino (labios, contorno do nariz) sobrevive ao downsample em vez de virar cinza e sumir.
"""
import sys
from PIL import Image, ImageOps
import numpy as np

# bit de cada ponto da célula braille (coluna, linha)
BITS = {(0, 0): 1, (0, 1): 2, (0, 2): 4, (1, 0): 8, (1, 1): 16, (1, 2): 32, (0, 3): 64, (1, 3): 128}


def braille(path, largura=80, limiar=110, cobertura=0.3, margem=2):
    im = ImageOps.grayscale(Image.open(path))
    a = np.asarray(im)
    escuro = a < limiar
    ys, xs = np.where(escuro)
    y0, y1 = max(ys.min() - margem, 0), min(ys.max() + margem + 1, a.shape[0])
    x0, x1 = max(xs.min() - margem, 0), min(xs.max() + margem + 1, a.shape[1])
    mascara = Image.fromarray((escuro[y0:y1, x0:x1] * 255).astype('uint8'))
    w_px = largura * 2
    h_px = round(mascara.height * w_px / mascara.width / 4) * 4
    cob = np.asarray(mascara.resize((w_px, h_px), Image.BOX)) / 255.0
    pontos = cob >= cobertura
    linhas = []
    for y in range(0, h_px, 4):
        s = ''
        for x in range(0, w_px, 2):
            cod = 0x2800
            for (dx, dy), bit in BITS.items():
                if pontos[y + dy, x + dx]:
                    cod |= bit
            s += chr(cod)
        linhas.append(s)
    # centro de massa horizontal dos pontos, em colunas de caractere (para centrar o banner)
    cx = np.where(pontos)[1].mean() / 2
    return linhas, cx


if __name__ == '__main__':
    path = sys.argv[1]
    largura = int(sys.argv[2]) if len(sys.argv) > 2 else 80
    limiar = int(sys.argv[3]) if len(sys.argv) > 3 else 110
    cobertura = float(sys.argv[4]) if len(sys.argv) > 4 else 0.3
    sys.stdout.reconfigure(encoding='utf-8')
    linhas, cx = braille(path, largura, limiar, cobertura)
    print('\n'.join(linhas))
    print(f'# {len(linhas)} linhas x {largura} colunas; centro de massa na coluna {cx:.1f}', file=sys.stderr)
