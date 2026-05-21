'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type ScrambleTextProps = {
  text: string;
  className?: string;
  durationMs?: number;
  characters?: string;
  spreadDuringScramble?: boolean;
  spreadClassName?: string;
};

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function isScrambleCandidate(char: string) {
  return /[\p{L}\p{N}]/u.test(char);
}

function buildSeedText(text: string, characters: string) {
  if (!characters) {
    return text;
  }

  return text
    .split('')
    .map((char, index) => {
      if (!isScrambleCandidate(char)) {
        return char;
      }

      return characters[index % characters.length] ?? char;
    })
    .join('');
}

export function ScrambleText({
  text,
  className,
  durationMs = 1600,
  characters = DEFAULT_CHARACTERS,
  spreadDuringScramble = false,
  spreadClassName = 'scramble-spread-active',
}: ScrambleTextProps) {
  const safeCharacters = useMemo(() => characters || DEFAULT_CHARACTERS, [characters]);
  const [displayText, setDisplayText] = useState(() => buildSeedText(text, safeCharacters));
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setDisplayText(text);
      setIsScrambling(false);
      return;
    }

    setIsScrambling(true);
    const totalChars = text.length;
    const animationDuration = Math.max(600, durationMs);
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / animationDuration);
      const revealCount = Math.floor(progress * totalChars);

      const nextText = text
        .split('')
        .map((char, index) => {
          if (!isScrambleCandidate(char) || index < revealCount) {
            return char;
          }

          const offset = Math.floor(elapsed / 48) + index * 3;
          return safeCharacters[offset % safeCharacters.length] ?? char;
        })
        .join('');

      setDisplayText(nextText);

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(step);
        return;
      }

      setDisplayText(text);
      setIsScrambling(false);
      frameRef.current = null;
    };

    frameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [durationMs, safeCharacters, text]);

  const animatedClassName =
    spreadDuringScramble && isScrambling
      ? ` ${spreadClassName}`.trim()
      : '';

  return (
    <span aria-label={text} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={animatedClassName}>
        {displayText}
      </span>
    </span>
  );
}
