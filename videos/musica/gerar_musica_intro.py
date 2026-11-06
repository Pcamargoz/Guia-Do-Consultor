"""Trilha dos vídeos de introdução (sem narração): chill house sintetizada, só com numpy. Sem samples, sem direitos de terceiros.

Adaptação do gerar_musica_vibes.py do Guia do Consultor (que usa scipy): os filtros Butterworth viram filtros de
magnitude no domínio da frequência (FFT) e o reverb é convolução por FFT. Estrutura pensada para o vídeo:
  0 .. entrada      intro só com pad e piano (abertura), chimbal no último compasso
  entrada .. final  groove: bumbo four-on-the-floor com sidechain, palmas no 2 e 4, chimbal, shaker, baixo, piano, melodia
  final .. fim      acorde final com bumbo + prato, e a cauda morre até o silêncio (fim limpo, sem corte)
Acentos (prato suave) nos tempos de --acentos, para casar com cortes importantes.
Uso: <python com numpy> -I gerar_musica_intro.py <saida.wav> <segundos> [--bpm 120] [--entrada 4] [--final 42] [--acentos 29]
"""
import sys
import wave

import numpy as np

args = sys.argv[1:]
saida, dur = args[0], float(args[1])


def opt(nome, padrao):
    return args[args.index(nome) + 1] if nome in args else padrao


BPM = float(opt('--bpm', 120))
ENTRADA = float(opt('--entrada', 4))
FINAL = float(opt('--final', dur - 5))
ACENTOS = [float(x) for x in str(opt('--acentos', '')).split(',') if x]

SR = 44100
n = int(SR * dur)
rng = np.random.default_rng(7)
BEAT = 60 / BPM
BAR = 4 * BEAT
n_bars = int(dur / BAR) + 2
EXTRA = SR * 4
L, R = np.zeros(n + EXTRA), np.zeros(n + EXTRA)
DL, DR = np.zeros(n + EXTRA), np.zeros(n + EXTRA)  # bateria e baixo: fora do sidechain
send = np.zeros((2, n + EXTRA))
duck = np.ones(n + EXTRA)


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def _filtro(x, resp):
    N = len(x)
    if N < 4:
        return x
    tam = 1 << int(np.ceil(np.log2(N + 1024)))  # folga para a cauda não dar a volta
    X = np.fft.rfft(x, tam)
    f = np.fft.rfftfreq(tam, 1 / SR)
    return np.fft.irfft(X * resp(f), tam)[:N]


def lp(x, fc, ordem=2):
    return _filtro(x, lambda f: 1 / np.sqrt(1 + (f / fc) ** (2 * ordem)))


def hp(x, fc, ordem=2):
    return _filtro(x, lambda f: 1 / np.sqrt(1 + (fc / np.maximum(f, 1e-6)) ** (2 * ordem)))


def bp(x, a, b):
    return hp(lp(x, b), a)


def poe(sinal, t, pan=0.5, rev=0.0, seco=False):
    a = int(t * SR)
    if a >= n or a < 0:
        return
    b = min(a + len(sinal), len(L))
    s = sinal[: b - a]
    (DL if seco else L)[a:b] += s * np.sqrt(1 - pan)
    (DR if seco else R)[a:b] += s * np.sqrt(pan)
    if rev:
        send[0, a:b] += s * rev * np.sqrt(1 - pan)
        send[1, a:b] += s * rev * np.sqrt(pan)


def bumbo():
    t = np.arange(int(0.42 * SR)) / SR
    f = 48 + 95 * np.exp(-t * 32)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7.5)
    clique = lp(rng.standard_normal(len(t)), 3500) * np.exp(-t * 160) * 0.25
    return np.tanh((s + clique) * 1.6) * 0.62


def palma():
    t = np.arange(int(0.35 * SR)) / SR
    ruido = bp(rng.standard_normal(len(t)), 900, 4200)
    env = np.zeros_like(t)
    for d in (0, 0.009, 0.019):
        env += np.where(t >= d, np.exp(-(t - d) * 90), 0)
    env += np.where(t >= 0.025, np.exp(-(t - 0.025) * 16) * 0.5, 0)
    return ruido * env * 0.16


def chimbal(aberto=False):
    t = np.arange(int((0.22 if aberto else 0.06) * SR)) / SR
    return hp(rng.standard_normal(len(t)), 7000, 3) * np.exp(-t * (14 if aberto else 75)) * (0.07 if aberto else 0.045)


def shaker():
    t = np.arange(int(0.07 * SR)) / SR
    return bp(rng.standard_normal(len(t)), 5000, 11000) * np.sin(np.pi * np.clip(t / 0.07, 0, 1)) ** 2 * 0.03


def prato(dura=2.6):
    t = np.arange(int(dura * SR)) / SR
    s = hp(rng.standard_normal(len(t)), 5000, 2)
    return s * (1 - np.exp(-t * 200)) * np.exp(-t * 2.2) * 0.05


def piano(notas, dura):
    t = np.arange(int((dura + 0.6) * SR)) / SR
    env = (1 - np.exp(-t * 300)) * np.exp(-t * 1.8) * np.where(t < dura, 1, np.exp(-(t - dura) * 9))
    s = np.zeros_like(t)
    for m in notas:
        f = hz(m)
        s += np.sin(2 * np.pi * f * t) + 0.32 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 5) + 0.12 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 9)
    return lp(s * env * (1 + 0.12 * np.sin(2 * np.pi * 4.6 * t)), 3200) * 0.045


def baixo(m, dura):
    t = np.arange(int((dura + 0.05) * SR)) / SR
    env = (1 - np.exp(-t * 400)) * np.where(t < dura, np.exp(-t * 2.2), np.exp(-dura * 2.2) * np.exp(-(t - dura) * 60))
    f = hz(m)
    return np.tanh(lp(np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t), 900) * 1.3) * env * 0.2


def pad(notas, dura, rel=0.25):
    t = np.arange(int((dura + 1.2) * SR)) / SR
    s = np.zeros_like(t)
    for m in notas:
        for dt in (-0.07, 0.07):
            f = hz(m) * 2 ** (dt / 12)
            s += 2 * ((f * t + rng.random()) % 1) - 1
    env = np.clip(t / 0.5, 0, 1) * np.where(t < dura, 1, np.exp(-(t - dura) / rel))
    return lp(s, 1400) * env * 0.012


def pluck(m):
    t = np.arange(int(0.9 * SR)) / SR
    f = hz(m)
    s = np.sin(2 * np.pi * f * t + 0.8 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 12))
    return s * (1 - np.exp(-t * 500)) * np.exp(-t * 4.2) * 0.05


def riser(dura):
    t = np.arange(int(dura * SR)) / SR
    s = bp(rng.standard_normal(len(t)), 1500, 9000)
    return s * (t / dura) ** 2.2 * 0.05


# harmonia: Dm9 – G13 – Cmaj9 – Am9 (um acorde por compasso: o vídeo é curto)
ACORDES = [[50, 53, 57, 60, 64], [43, 53, 57, 59, 64], [48, 52, 55, 59, 62], [45, 48, 52, 55, 59]]
VOZ_PIANO = [[62, 65, 69, 72, 76], [59, 65, 69, 71, 76], [60, 64, 67, 71, 74], [57, 60, 64, 67, 71]]
RAIZES = [38, 43, 36, 45]
PENTA = [69, 72, 74, 76, 79, 81]
BAIXO_RITMO = [(0, 0.75, 0), (1.5, 0.4, 12), (2.5, 0.4, 0), (3.5, 0.4, 7)]
PIANO_RITMO = [(0, 0.9), (1.5, 0.45), (2.75, 0.6)]

kick, clap = bumbo(), palma()
hat_f, hat_a = chimbal(), chimbal(True)


def sidechain(t):
    a = int(t * SR)
    k = np.arange(int(0.32 * SR))
    if a < len(duck):
        seg = 1 - 0.55 * np.exp(-k / SR * 9)
        duck[a:a + len(seg)] = np.minimum(duck[a:a + len(seg)], seg[: len(duck) - a])


for bar in range(n_bars):
    t0 = bar * BAR
    if t0 >= FINAL - 1e-6:
        break
    ac = bar % 4
    intro = t0 < ENTRADA - 1e-6
    ganho = 2.6 if intro else 1.0  # sem bateria, o pad e o piano sobem para a abertura não ficar fraca demais
    poe(pad(ACORDES[ac], BAR) * ganho, t0, 0.5, 0.35)
    for b, d in (PIANO_RITMO[:2] if intro else PIANO_RITMO):
        poe(piano(VOZ_PIANO[ac], d * BEAT) * ganho, t0 + b * BEAT, 0.42, 0.45)
    if intro:
        if t0 + BAR >= ENTRADA - 1e-6:  # último compasso da intro: chimbal e subida
            for b in range(4):
                poe(hat_f, t0 + (b + 0.5) * BEAT, 0.62, seco=True)
            poe(riser(BAR), t0, 0.5, 0.2)
        continue
    for b in range(4):
        poe(kick, t0 + b * BEAT, seco=True)
        sidechain(t0 + b * BEAT)
        poe(hat_a, t0 + (b + 0.5) * BEAT, 0.62, seco=True)
        for s16 in (0.25, 0.75):
            poe(shaker(), t0 + (b + s16) * BEAT + rng.normal(0, 0.004), 0.35, seco=True)
    for b in (1, 3):
        poe(clap, t0 + b * BEAT, 0.52, 0.25, seco=True)
    for b, d, intv in BAIXO_RITMO:
        poe(baixo(RAIZES[ac] + intv, d * BEAT), t0 + b * BEAT, seco=True)
    if t0 >= ENTRADA + 4 * BAR - 1e-6 and bar % 2 == 1 and rng.random() < 0.8:
        for b in sorted(rng.choice([0, 0.5, 1.5, 2, 2.5, 3], 3, replace=False)):
            poe(pluck(int(rng.choice(PENTA))), t0 + b * BEAT, float(rng.uniform(0.3, 0.7)), 0.6)

# entrada do groove e acentos: prato suave
poe(prato(), ENTRADA, 0.55, 0.3, seco=True)
for a in ACENTOS:
    poe(prato(1.8), a, 0.45, 0.3, seco=True)

# acorde final (Cmaj9): bumbo, prato e cauda longa que morre antes do fim
cauda = max(dur - FINAL, 1.0)
poe(kick, FINAL, seco=True)
poe(prato(cauda), FINAL, 0.5, 0.4, seco=True)
poe(pad([48, 52, 55, 59, 62], cauda * 0.45, rel=cauda * 0.18) * 2.2, FINAL, 0.5, 0.5)
poe(piano([60, 64, 67, 71, 74, 79], cauda * 0.5) * 2.2, FINAL, 0.42, 0.6)
poe(baixo(36, cauda * 0.4), FINAL, seco=True)

L *= duck
R *= duck
ir_t = np.arange(int(1.8 * SR)) / SR
ir = rng.standard_normal((2, len(ir_t))) * np.exp(-ir_t * 3.6)
ir = np.array([lp(c, 6000) for c in ir])
ir /= np.abs(ir).sum(axis=1, keepdims=True) / 6


def conv(x, h):
    tam = 1 << int(np.ceil(np.log2(len(x) + len(h))))
    return np.fft.irfft(np.fft.rfft(x, tam) * np.fft.rfft(h, tam), tam)[: len(x)]


rev = np.array([conv(send[i], ir[i]) for i in range(2)])
L += rev[0] * duck
R += rev[1] * duck

mix = np.stack([L[:n] + DL[:n], R[:n] + DR[:n]])
mix = np.array([hp(c, 30) for c in mix])
fade_in, fade_out = int(0.6 * SR), int(1.5 * SR)
idx = np.arange(n)
g = np.minimum(1, idx / fade_in) * np.clip((n - idx) / fade_out, 0, 1) ** 1.5
mix *= g
mix = np.tanh(mix / (np.abs(mix).max() or 1) * 1.4) / np.tanh(1.4) * 0.89
pcm = (mix.T * 32767).astype('<i2')
with wave.open(saida, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print('ok', saida, round(dur, 2), 's', BPM, 'BPM', 'entrada', ENTRADA, 'final', FINAL)
