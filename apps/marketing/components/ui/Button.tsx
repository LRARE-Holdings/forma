import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "md" | "lg";
/** Brand book only: render a state statically so it can be documented. */
export type ButtonState = "hover" | "focus";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-bold whitespace-nowrap " +
  "transition-[background-color,border-color,color] duration-(--dur) ease-brand " +
  "outline-offset-2 focus-visible:outline-2 " +
  "disabled:opacity-40 disabled:pointer-events-none aria-disabled:opacity-40 aria-disabled:pointer-events-none";

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-14 px-7 text-[17px]",
};

const variants: Record<ButtonVariant, { idle: string; hover: string; focus: string }> = {
  // Volt fill, ink text. One per viewport.
  primary: {
    idle: "bg-volt text-ink hover:bg-[color-mix(in_oklab,var(--volt),white_35%)] focus-visible:outline-volt",
    hover: "bg-[color-mix(in_oklab,var(--volt),white_35%)]",
    focus: "outline-2 outline-volt",
  },
  secondary: {
    idle: "border-2 border-border-strong text-text hover:border-text focus-visible:outline-volt",
    hover: "border-text",
    focus: "outline-2 outline-volt",
  },
  ghost: {
    idle: "px-2 text-text underline-offset-4 hover:text-volt hover:underline focus-visible:outline-volt",
    hover: "text-volt underline",
    focus: "outline-2 outline-volt",
  },
  // For use on volt surfaces (the featured plan card), where a volt button would vanish.
  inverse: {
    idle: "bg-ink text-text hover:bg-surface focus-visible:outline-ink",
    hover: "bg-surface",
    focus: "outline-2 outline-ink",
  },
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  state,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  className?: string;
}) {
  const v = variants[variant];
  return [base, sizes[size], v.idle, state ? v[state] : "", className].join(" ");
}

type Shared = { variant?: ButtonVariant; size?: ButtonSize; state?: ButtonState; children: ReactNode };

export function Button({
  variant,
  size,
  state,
  className,
  ...props
}: Shared & ComponentProps<"button">) {
  return <button className={buttonClasses({ variant, size, state, className })} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  state,
  className,
  ...props
}: Shared & ComponentProps<typeof Link>) {
  return <Link className={buttonClasses({ variant, size, state, className })} {...props} />;
}
