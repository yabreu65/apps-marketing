import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-[#F97316] text-[#FFFBF5] hover:bg-[#EA580C] focus-visible:outline-[#FDBA74] shadow-[0_10px_24px_rgba(249,115,22,0.28)]',
  secondary:
    'border border-[#7C3AED]/50 bg-transparent text-[#CBD5E1] hover:bg-[#7C3AED]/15 hover:text-[#F8FAFC] focus-visible:outline-[#A78BFA]',
};

const baseClass =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary';

  if ('href' in props && props.href) {
    const { children, className = '', href, variant: _variant, ...rest } = props;

    return (
      <a href={href} className={`${baseClass} ${variantClass[variant]} ${className}`.trim()} {...rest}>
        {children}
      </a>
    );
  }

  const { children, className = '', type, variant: _variant, ...rest } = props as ButtonAsButton;
  const buttonType: 'button' | 'submit' | 'reset' = type ?? 'button';

  return (
    <button type={buttonType} className={`${baseClass} ${variantClass[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
