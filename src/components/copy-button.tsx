import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function writeClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

export function CopyButton({
  value,
  label = "copy",
  disabled,
  className,
  size = "sm",
}: {
  value: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "default";
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!value || disabled) return;
    try {
      await writeClipboard(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      disabled={disabled || !value}
      onClick={onCopy}
      className={cn("min-w-24", className)}
      aria-label={copied ? "copied" : label}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? "copied" : label}
    </Button>
  );
}
