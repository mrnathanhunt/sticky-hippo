import { useCoin } from "@/lib/coin";
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
  coinId,
}: {
  size?: keyof typeof sizes;
  inverse?: boolean;
  className?: string;
  coinId?: "alig" | "booya" | "hippo";
}) {
  const ctx = useCoin();
  const id = coinId ?? ctx.id;
  const loud = id === "booya";
  const hippo = id === "hippo";

  return (
    <span
      className={cn(
        "font-display uppercase leading-none tracking-tight",
        sizes[size],
        className,
      )}
    >
      {hippo ? (
        <>
          <span className={inverse ? "text-paper" : "text-gold"}>sticky</span>
          <span className="text-red"> hippo</span>
          <span className="text-red max-sm:hidden">.com</span>
        </>
      ) : loud ? (
        <>
          <span className={inverse ? "text-gold" : "text-ink"}>booya</span>
          <span className="text-red max-sm:hidden">kasha</span>
        </>
      ) : (
        <>
          <span className={inverse ? "text-ink" : "text-gold"}>ali</span>
          <span className="text-red"> g</span>
        </>
      )}
    </span>
  );
}
