"""Generate the quiz sound effects: a soft clock tick/tock and a reveal chime.

Everything is synthesized here, so the sounds can be used without any licence concerns.

Usage: python scripts/generate_sfx.py OUTPUT_DIR
"""

import os
import sys

import numpy as np
import soundfile as sf

SR = 48000


def tick(pitch: float) -> np.ndarray:
    t = np.arange(int(0.09 * SR)) / SR
    rng = np.random.default_rng(int(pitch))
    click = np.sin(2 * np.pi * pitch * t) * np.exp(-t * 90)
    click += 0.35 * rng.standard_normal(len(t)) * np.exp(-t * 400)
    return click / np.abs(click).max() * 0.8


def chime() -> np.ndarray:
    t = np.arange(int(1.6 * SR)) / SR
    out = np.zeros_like(t)
    # A bright major-sixth "ting": E6 and C#7 with inharmonic overtones, as on a small bell.
    for f, gain, decay in ((1318.5, 1.0, 2.6), (2217.5, 0.6, 3.2), (3520.0, 0.25, 5.0), (5274.0, 0.12, 7.0)):
        out += gain * np.sin(2 * np.pi * f * t) * np.exp(-t * decay)
    out *= np.minimum(1, t / 0.004)  # soften the attack
    return out / np.abs(out).max() * 0.8


def main(out_dir: str) -> None:
    os.makedirs(out_dir, exist_ok=True)
    sf.write(os.path.join(out_dir, "tick.wav"), tick(2100).astype(np.float32), SR)
    sf.write(os.path.join(out_dir, "tock.wav"), tick(1500).astype(np.float32), SR)
    sf.write(os.path.join(out_dir, "chime.wav"), chime().astype(np.float32), SR)


if __name__ == "__main__":
    main(sys.argv[1])
