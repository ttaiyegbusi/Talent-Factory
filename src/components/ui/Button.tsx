import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#f6b51e] text-[#624c18]",
  secondary: "bg-white text-[#2b2b2b]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-[50px] px-[30px] text-sm tracking-[-0.28px]",
  md: "h-[50px] px-[30px] text-base tracking-[-0.32px]",
};

/** Class builder so links (`next/link`) can render as buttons too. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-medium transition-opacity hover:opacity-90",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
