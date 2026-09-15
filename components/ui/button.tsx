import type { ComponentProps, ReactNode } from "react";

type Variant = "signal" | "ink" | "outline" | "outline-invert";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  signal: "bg-signal text-white hover:bg-ink",
  ink: "bg-ink text-white hover:bg-signal",
  outline:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-invert":
    "border border-line-invert text-white hover:border-white hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3",
  lg: "px-6 py-4",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<"a">, "className">;

/** The one pill. Every call-to-action on the site is an instance of this. */
export function Button({
  children,
  variant = "signal",
  size = "lg",
  className = "",
  href,
  ...rest
}: Props) {
  const classes = `type-label inline-block rounded-full whitespace-nowrap transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (!href) {
    return (
      <button type="button" className={classes}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
