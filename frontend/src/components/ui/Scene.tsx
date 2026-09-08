import type { PropsWithChildren } from "react";

interface SceneProps extends PropsWithChildren {
  id: string;
  className?: string;
  background?: string;
}

export function Scene({ id, className = "", background, children }: SceneProps) {
  return (
    <section
      id={id}
      className={`relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-24 sm:px-10 ${className}`}
      style={{ background: background ?? "var(--color-void)" }}
    >
      {children}
    </section>
  );
}
