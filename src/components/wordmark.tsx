import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-lg",
  md: "text-3xl",
  lg: "text-5xl sm:text-6xl",
} as const;

export function Wordmark({
  size = "md",
  inverse = false,
  className,
}: {
  size?: keyof typeof sizes;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("font-display uppercase leading-none tracking-tight", sizes[size], className)}
    >
      <span className={inverse ? "text-paper" : "text-gold"}>sticky</span>
      <span className="text-red"> hippo</span>
      <span className="text-red max-sm:hidden">.com</span>
    </span>
  );
}
