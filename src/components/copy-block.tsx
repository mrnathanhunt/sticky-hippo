import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function CopyBlock({
  title,
  hint,
  value,
}: {
  title: string;
  hint?: string;
  value: string;
}) {
  return (
    <article className="rounded-xl bg-surface p-4 text-ink shadow-card sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base uppercase tracking-tight">{title}</h3>
          {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
        </div>
        <CopyButton value={value} className="text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-deep" />
      </div>
      <pre
        className={cn(
          "mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-paper p-3 font-sans text-sm leading-relaxed text-ink",
        )}
      >
        {value}
      </pre>
    </article>
  );
}
