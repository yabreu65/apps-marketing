import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary";

type CommonProps = {
	children: ReactNode;
	className?: string;
	variant?: ButtonVariant;
};

type ButtonAsButton = CommonProps &
	ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = CommonProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<ButtonVariant, string> = {
	primary:
		"bg-[var(--orange-cta)] text-[var(--warm-white)] hover:bg-[var(--orange-hover)] focus-visible:outline-[var(--orange-soft)] shadow-[0_14px_40px_rgba(79,70,229,0.3)]",
	secondary:
		"border border-[var(--purple-primary)]/60 bg-[var(--purple-primary)]/8 text-[var(--text-primary)] hover:bg-[var(--purple-primary)]/18 hover:text-[var(--warm-white)] focus-visible:outline-[var(--purple-soft)]",
};

const baseClass =
	"inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button(props: ButtonProps) {
	const variant = props.variant ?? "primary";

	if ("href" in props && props.href) {
		const {
			children,
			className = "",
			href,
			variant: _variant,
			...rest
		} = props;

		return (
			<a
				href={href}
				className={`${baseClass} ${variantClass[variant]} ${className}`.trim()}
				{...rest}
			>
				{children}
			</a>
		);
	}

	const {
		children,
		className = "",
		type,
		variant: _variant,
		...rest
	} = props as ButtonAsButton;
	const buttonType: "button" | "submit" | "reset" = type ?? "button";

	return (
		<button
			type={buttonType}
			className={`${baseClass} ${variantClass[variant]} ${className}`.trim()}
			{...rest}
		>
			{children}
		</button>
	);
}
