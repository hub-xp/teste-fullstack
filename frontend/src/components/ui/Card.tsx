import { ReactNode } from "react";

type Variant = "default" | "elevated" | "outline";

interface CardProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const base =
  "rounded-2xl p-6 transition-colors bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100";

const variants: Record<Variant, string> = {
  default: "border border-zinc-300 dark:border-zinc-800",
  elevated: "shadow-md hover:shadow-lg",
  outline: "border-2 border-blue-500",
};

export const Card = ({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) => {
  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
