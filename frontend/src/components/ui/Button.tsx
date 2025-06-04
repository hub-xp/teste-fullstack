type Variant = "primary" | "secondary" | "text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base =
  "px-4 py-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 focus:ring-zinc-400",
  text: "bg-transparent text-black dark:text-white underline underline-offset-4 hover:text-zinc-500 dark:hover:text-blue-300 focus:ring-blue-400",
};

export const Button = ({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};
