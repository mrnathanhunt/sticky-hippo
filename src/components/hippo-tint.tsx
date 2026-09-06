import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HIPPO_ORIGINAL,
  HIPPO_SWATCHES,
  loadImageData,
  tintHippoPixels,
} from "@/lib/hippo-tint";
import { cn } from "@/lib/utils";

const KEY = "hippo-client-color";

function readSaved() {
  try {
    return localStorage.getItem(KEY) || HIPPO_ORIGINAL;
  } catch {
    return HIPPO_ORIGINAL;
  }
}

export function HippoTint({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<ImageData | null>(null);
  const [hex, setHex] = useState<string>(HIPPO_ORIGINAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setHex(readSaved());
  }, []);

  useEffect(() => {
    let gone = false;
    loadImageData(src).then((data) => {
      if (gone) return;
      baseRef.current = data;
      setReady(true);
    });
    return () => {
      gone = true;
    };
  }, [src]);

  useEffect(() => {
    const base = baseRef.current;
    const canvas = canvasRef.current;
    if (!base || !canvas) return;
    const tinted = hex.toUpperCase() === HIPPO_ORIGINAL ? base : tintHippoPixels(base, hex);
    canvas.width = tinted.width;
    canvas.height = tinted.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(tinted, 0, 0);
  }, [hex, ready]);

  function choose(next: string) {
    setHex(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `hippo-${hex.replace("#", "")}.jpg`;
        a.click();
        URL.revokeObjectURL(a.href);
      },
      "image/jpeg",
      0.92,
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative">
        {!ready ? (
          <img
            src={src}
            alt={alt}
            width={1408}
            height={1408}
            className="w-full rounded-xl outline outline-1 -outline-offset-1 outline-current/15"
          />
        ) : null}
        <canvas
          ref={canvasRef}
          width={1408}
          height={1408}
          className={cn(
            "w-full rounded-xl outline outline-1 -outline-offset-1 outline-current/15",
            !ready && "hidden",
          )}
          aria-label={alt}
        />
      </div>
      <div className="mt-4 rounded-xl bg-surface p-4 shadow-card sm:p-5">
        <p className="font-display text-sm uppercase tracking-tight">choose your colour</p>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
          pick a colour. download to your phone. take your hippo everywhere.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {HIPPO_SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              aria-label={swatch.label}
              aria-pressed={hex.toUpperCase() === swatch.hex}
              onClick={() => choose(swatch.hex)}
              className={cn(
                "size-11 rounded-md outline outline-1 -outline-offset-1 outline-ink/15",
                hex.toUpperCase() === swatch.hex && "outline-2 outline-gold",
              )}
              style={{ backgroundColor: swatch.hex }}
            />
          ))}
          <label className="flex h-11 items-center gap-2 rounded-md px-2 outline outline-1 -outline-offset-1 outline-ink/15">
            <span className="font-display text-xs uppercase text-muted">custom</span>
            <input
              type="color"
              value={hex}
              onChange={(e) => choose(e.target.value.toUpperCase())}
              className="size-8 cursor-pointer rounded-sm border-0 bg-transparent p-0"
              aria-label="custom hippo colour"
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button size="sm" className="text-paper" onClick={download}>
            save to phone
          </Button>
          <Button size="sm" variant="outline" onClick={() => choose(HIPPO_ORIGINAL)}>
            reset sky
          </Button>
          <span className="font-mono text-xs uppercase text-muted">{hex}</span>
        </div>
      </div>
    </div>
  );
}
