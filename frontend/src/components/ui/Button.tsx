import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center rounded-full px-9 py-3.5 font-sans text-sm tracking-[0.08em] transition-all duration-500 focus-visible:outline-offset-4";

  const styles =
    variant === "primary"
      ? "border border-violet-glow/30 bg-white/[0.03] text-ivory backdrop-blur-sm hover:border-violet-glow/70 hover:bg-violet/10"
      : "border border-white/10 text-ivory-dim hover:border-white/30 hover:text-ivory";

  return (
    <button data-cursor-interactive className={`${base} ${styles} ${className}`} {...props}>
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "0 0 30px 4px rgba(124,92,255,0.25)" }}
      />
      <span className="relative">{children}</span>
    </button>
  );
}
