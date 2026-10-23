import React, { useLayoutEffect, useRef, useState } from "react";
import { continueRender, delayRender } from "remotion";

/**
 * Finds the largest scale in [min, max] at which the element is at most `maxHeight` tall,
 * by measuring the real layout once fonts are loaded. Size the element's text with
 * `calc(<px> * var(--fit))` and spread the returned `style` onto it.
 */
export const useFitScale = (maxHeight: number, min = 0.6, max = 1.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [handle] = useState(() => delayRender("Fitting text to the panel"));

  useLayoutEffect(() => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        continueRender(handle);
      }
    };
    document.fonts.ready.then(() => {
      const el = ref.current;
      if (done || !el) return finish();
      // Measure by trying scales on the element, then hand the result back to React.
      const before = el.style.getPropertyValue("--fit");
      let lo = min;
      let hi = max;
      for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        el.style.setProperty("--fit", String(mid));
        if (el.offsetHeight <= maxHeight) lo = mid;
        else hi = mid;
      }
      el.style.setProperty("--fit", before);
      setScale(lo);
      finish();
    });
    return finish;
  }, [handle, maxHeight, min, max]);

  return { ref, scale, style: { "--fit": scale } as React.CSSProperties };
};
