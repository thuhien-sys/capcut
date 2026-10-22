"""Generate a calm, royalty-free background loop for the news briefs.

Soft pads, a slow electric-piano arpeggio and a gentle bass over
Cmaj9 - Am9 - Fmaj7 - G6, with a light reverb. Everything is synthesized
here, so the result can be used without any licence concerns.

Usage: python scripts/generate_music.py OUTPUT.wav SECONDS
"""

import sys

import numpy as np
import soundfile as sf
from scipy.signal import lfilter

SR = 48000
BPM = 72
BEAT = 60 / BPM
BAR = 4 * BEAT

# MIDI notes per chord: (bass, chord tones)
PROGRESSION = [
    (36, [60, 64, 67, 71, 74]),  # Cmaj9
    (45, [57, 60, 64, 67, 71]),  # Am9
    (41, [57, 60, 64, 65, 69]),  # Fmaj7
    (43, [55, 59, 62, 64, 67]),  # G6
]
BARS_PER_CHORD = 2


def freq(midi: float) -> float:
    return 440.0 * 2 ** ((midi - 69) / 12)


def envelope(n: int, attack: float, release: float) -> np.ndarray:
    env = np.ones(n)
    a, r = int(attack * SR), int(release * SR)
    env[:a] = np.linspace(0, 1, a) ** 2
    env[n - r :] *= np.linspace(1, 0, r) ** 2
    return env


def pad(midi_notes: list[int], seconds: float) -> np.ndarray:
    n = int(seconds * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for m in midi_notes:
        f = freq(m)
        for detune in (-0.12, 0.12):  # slight chorus
            fd = f * 2 ** (detune / 12)
            out += np.sin(2 * np.pi * fd * t) + 0.15 * np.sin(2 * np.pi * 2 * fd * t)
    return out * envelope(n, 1.6, 1.8) / (len(midi_notes) * 2)


def piano_note(midi: int, seconds: float) -> np.ndarray:
    n = int(seconds * SR)
    t = np.arange(n) / SR
    f = freq(midi)
    tone = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 3)
    tone += 0.08 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 6)
    return tone * np.exp(-t * 1.6) * envelope(n, 0.005, 0.2)


def bass_note(midi: int, seconds: float) -> np.ndarray:
    n = int(seconds * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * freq(midi) * t) * np.exp(-t * 0.9) * envelope(n, 0.02, 0.4)


def reverb(x: np.ndarray) -> np.ndarray:
    """Small Schroeder reverb: parallel combs then series all-passes."""
    wet = np.zeros_like(x)
    for delay_ms, gain in ((29.7, 0.78), (37.1, 0.76), (41.1, 0.74), (43.7, 0.72)):
        d = int(delay_ms * SR / 1000)
        a = np.zeros(d + 1)
        a[0], a[d] = 1, -gain
        wet += lfilter([1], a, x)
    for delay_ms, gain in ((5.0, 0.7), (1.7, 0.7)):
        d = int(delay_ms * SR / 1000)
        b = np.zeros(d + 1)
        b[0], b[d] = -gain, 1
        a = np.zeros(d + 1)
        a[0], a[d] = 1, -gain
        wet = lfilter(b, a, wet)
    return wet / 4


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    alpha = 1 - np.exp(-2 * np.pi * cutoff / SR)
    return lfilter([alpha], [1, alpha - 1], x)


def main(path: str, seconds: float) -> None:
    rng = np.random.default_rng(7)
    total = int((seconds + 4) * SR)
    left, right = np.zeros(total), np.zeros(total)
    chord_len = BARS_PER_CHORD * BAR
    t0, i = 0.0, 0
    while t0 < seconds + 2:
        bass, tones = PROGRESSION[i % len(PROGRESSION)]
        start = int(t0 * SR)

        p = pad(tones, chord_len + 1.8)
        end = min(total, start + len(p))
        left[start:end] += 0.5 * p[: end - start]
        right[start:end] += 0.5 * p[: end - start]

        for bar in range(BARS_PER_CHORD):
            b = bass_note(bass, BAR)
            s = start + int(bar * BAR * SR)
            e = min(total, s + len(b))
            left[s:e] += 0.35 * b[: e - s]
            right[s:e] += 0.35 * b[: e - s]

        # Gentle arpeggio on eighth notes, alternating up and down, a few notes skipped.
        pattern = tones + tones[-2:0:-1]
        for k in range(int(chord_len / (BEAT / 2))):
            if rng.random() < 0.25:
                continue
            note = piano_note(pattern[k % len(pattern)] + 12, 2.5)
            s = start + int(k * BEAT / 2 * SR)
            e = min(total, s + len(note))
            pan = 0.5 + 0.3 * np.sin(k * 0.9)
            vel = 0.16 * (0.75 + 0.25 * rng.random())
            left[s:e] += vel * (1 - pan) * note[: e - s]
            right[s:e] += vel * pan * note[: e - s]

        t0 += chord_len
        i += 1

    left, right = lowpass(left, 3200), lowpass(right, 3200)
    left += 0.35 * reverb(left)
    right += 0.35 * reverb(np.roll(right, int(0.011 * SR)))

    stereo = np.stack([left, right], axis=1)[: int(seconds * SR)]
    n = len(stereo)
    fade = np.ones(n)
    fade[: 2 * SR] = np.linspace(0, 1, 2 * SR)
    fade[n - 3 * SR :] = np.linspace(1, 0, 3 * SR)
    stereo *= fade[:, None]
    stereo /= np.sqrt((stereo**2).mean()) / 0.1  # RMS 0.1
    stereo = np.clip(stereo, -0.98, 0.98)
    sf.write(path, stereo.astype(np.float32), SR)


if __name__ == "__main__":
    main(sys.argv[1], float(sys.argv[2]))
