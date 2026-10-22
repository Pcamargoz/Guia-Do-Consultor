"""Gera os efeitos sonoros dos vídeos (sintetizados, sem samples nem direitos autorais).

clique.wav: clique de trackpad (ruído curto filtrado + "tic" agudo).
whoosh.wav: passagem suave de tela (ruído com envelope e varredura de filtro).
Uso: python -I gerar_sfx.py <pasta_de_saida>
"""
import array
import math
import os
import random
import sys
import wave

SR = 48000
random.seed(5)
saida = sys.argv[1]
os.makedirs(saida, exist_ok=True)


def grava(nome, amostras):
    pico = max(abs(x) for x in amostras) or 1.0
    pcm = array.array('h', (int(max(-1, min(1, x / pico * 0.9)) * 32767) for x in amostras))
    with wave.open(os.path.join(saida, nome), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


# clique: 35 ms
n = int(SR * 0.035)
clique, ant = [], 0.0
for j in range(n):
    t = j / SR
    env = math.exp(-t * 260)
    ruido = random.uniform(-1, 1)
    ant = ant + 0.35 * (ruido - ant)          # passa-baixa simples
    tic = math.sin(2 * math.pi * 2900 * t) * math.exp(-t * 520)
    clique.append((ant * 0.7 + tic * 0.5) * env)
grava('clique.wav', clique)

# whoosh: 420 ms
n = int(SR * 0.42)
whoosh, lp, bp = [], 0.0, 0.0
for j in range(n):
    x = j / n
    env = math.sin(math.pi * x) ** 2
    corte = 0.02 + 0.25 * x                     # o filtro abre ao longo da passagem
    ruido = random.uniform(-1, 1)
    lp = lp + corte * (ruido - lp)
    bp = bp + 0.5 * (lp - bp)
    whoosh.append((lp - bp) * env)
grava('whoosh.wav', whoosh)
print('ok', saida)
