import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-ink px-3 text-sm text-paper shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-paper)_18%,transparent)] outline-none transition-shadow placeholder:text-muted focus-visible:shadow-[0_0_0_2px_var(--color-gold)] disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
