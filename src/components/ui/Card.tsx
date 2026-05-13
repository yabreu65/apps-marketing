import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <article className={`rounded-2xl border border-[#26324A] bg-[#151B2E] p-5 shadow-[0_10px_30px_rgba(11,16,32,0.35)] ${className}`.trim()}>
      {children}
    </article>
  );
}
