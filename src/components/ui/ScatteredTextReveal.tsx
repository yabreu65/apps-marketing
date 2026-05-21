'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type ScatteredTextRevealProps = {
  text?: string;
  lines?: string[][];
  className?: string;
  durationMs?: number;
  startDelayMs?: number;
};

type CharacterMotion = {
  x: number;
  y: number;
  rotate: number;
  delay: number;
};

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function getCharacterMotion(index: number, length: number): CharacterMotion {
  const spreadFactor = Math.max(0.85, Math.min(1.35, length / 52));

  const x = (pseudoRandom(index + 1) * 2 - 1) * 320 * spreadFactor;
  const y = (pseudoRandom((index + 1) * 1.7) * 2 - 1) * 200 * spreadFactor;
  const rotate = (pseudoRandom((index + 1) * 2.3) * 2 - 1) * 20;
  const delay = pseudoRandom((index + 1) * 2.9) * 260;

  return { x, y, rotate, delay };
}

function normalizeLines(text: string | undefined, lines: string[][] | undefined): string[][] {
  if (lines && lines.length > 0) {
    return lines;
  }

  if (!text) {
    return [];
  }

  return text
    .split('\n')
    .map((line) => line.split(' ').filter(Boolean))
    .filter((line) => line.length > 0);
}

export function ScatteredTextReveal({
  text,
  lines,
  className,
  durationMs = 1800,
  startDelayMs = 0,
}: ScatteredTextRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const hiddenAtRef = useRef<number | null>(null);
  const replayArmedRef = useRef(false);
  const lastReplayAtRef = useRef(0);

  const resolvedLines = useMemo(() => normalizeLines(text, lines), [lines, text]);
  const label = useMemo(() => resolvedLines.flat().join(' '), [resolvedLines]);

  const characterMotions = useMemo(() => {
    const words = resolvedLines.flat();
    const totalChars = words.join('').length || 1;
    let currentIndex = 0;

    return words.map((word) => {
      const wordMotions = word.split('').map(() => {
        const motion = getCharacterMotion(currentIndex, totalChars);
        currentIndex += 1;
        return motion;
      });

      return wordMotions;
    });
  }, [resolvedLines]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setReduceMotion(true);
      setIsRevealed(true);
      return;
    }

    setIsRevealed(false);

    let timeoutId: number | null = null;
    let frameId: number | null = null;
    const transitionDuration = Math.max(900, durationMs);
    const cycleStartDelayMs =
      animationCycle === 0 ? Math.max(0, startDelayMs) : 140;

    timeoutId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(() => {
        setIsRevealed(true);
      });
    }, cycleStartDelayMs);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [animationCycle, durationMs, startDelayMs]);

  useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) {
      return;
    }

    const minHiddenMsForReplay = 2000;
    const replayThrottleMs = 1200;

    const tryReplay = () => {
      const now = Date.now();
      const hiddenAt = hiddenAtRef.current;

      if (!replayArmedRef.current || hiddenAt === null) {
        return;
      }

      if (now - hiddenAt < minHiddenMsForReplay) {
        return;
      }

      if (now - lastReplayAtRef.current < replayThrottleMs) {
        return;
      }

      replayArmedRef.current = false;
      hiddenAtRef.current = null;
      lastReplayAtRef.current = now;
      setAnimationCycle((cycle) => cycle + 1);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAtRef.current = Date.now();
        replayArmedRef.current = true;
        return;
      }

      if (document.visibilityState === 'visible') {
        tryReplay();
      }
    };

    const onWindowBlur = () => {
      hiddenAtRef.current = Date.now();
      replayArmedRef.current = true;
    };

    const onWindowFocus = () => {
      tryReplay();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('focus', onWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('focus', onWindowFocus);
    };
  }, [reduceMotion]);

  let wordIndex = 0;

  return (
    <span aria-label={label} className={`${className ?? ''} relative inline-block`.trim()}>
      <span className="sr-only">{label}</span>

      <span aria-hidden="true" className="pointer-events-none">
        {resolvedLines.map((line, lineIndex) => (
          <span
            key={`line-${animationCycle}-${lineIndex}`}
            className="flex flex-nowrap justify-center gap-x-[0.28em] gap-y-[0.12em]"
          >
            {line.map((word, localWordIndex) => {
              const motions = characterMotions[wordIndex] ?? [];
              wordIndex += 1;
              const transitionDuration = `${Math.max(900, durationMs)}ms`;

              return (
                <span
                  key={`word-${animationCycle}-${lineIndex}-${localWordIndex}-${word}`}
                  className="inline-block whitespace-nowrap"
                >
                  {word.split('').map((character, charIndex) => {
                    const motion = motions[charIndex] ?? { x: 0, y: 0, rotate: 0, delay: 0 };

                    return (
                      <span
                        key={`char-${animationCycle}-${lineIndex}-${localWordIndex}-${charIndex}-${character}`}
                        className="inline-block will-change-transform"
                        style={{
                          opacity: isRevealed || reduceMotion ? 1 : 0.16,
                          transform:
                            isRevealed || reduceMotion
                              ? 'translate3d(0, 0, 0) rotate(0deg)'
                              : `translate3d(${motion.x}px, ${motion.y}px, 0) rotate(${motion.rotate}deg)`,
                          transition: reduceMotion
                            ? 'none'
                            : `transform ${transitionDuration} cubic-bezier(0.22, 1, 0.36, 1) ${motion.delay}ms, opacity 700ms ease ${Math.min(240, motion.delay)}ms`,
                        }}
                      >
                        {character}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </span>
  );
}
