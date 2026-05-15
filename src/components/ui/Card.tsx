import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return <article className={`glass-card rounded-2xl p-5 ${className}`.trim()}>{children}</article>;
}
