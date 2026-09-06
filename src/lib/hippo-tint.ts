export const HIPPO_SWATCHES = [
  { id: "sky", hex: "#4EB6EA", label: "sky" },
  { id: "navy", hex: "#17324A", label: "navy" },
  { id: "mint", hex: "#2FA88A", label: "mint" },
  { id: "lime", hex: "#6B9A14", label: "lime" },
  { id: "coral", hex: "#D4654A", label: "coral" },
  { id: "sand", hex: "#C49A4A", label: "sand" },
  { id: "ink", hex: "#1C2430", label: "ink" },
] as const;

export const HIPPO_ORIGINAL = HIPPO_SWATCHES[0].hex;

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = ((h % 360) + 360) % 360 / 360;
  return [
    Math.round(hue2rgb(p, q, hk + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, hk) * 255),
    Math.round(hue2rgb(p, q, hk - 1 / 3) * 255),
  ];
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16),
  ];
}

export function tintHippoPixels(source: ImageData, hex: string): ImageData {
  const [th] = rgbToHsl(...parseHex(hex));
  const out = new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);
  const d = out.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const [h, s, l] = rgbToHsl(r, g, b);
    if (l > 0.9 && s < 0.22) continue;
    if (l < 0.16) continue;
    if (s < 0.14 && l > 0.62) continue;
    const bluish = (h > 168 && h < 232 && s > 0.16 && l < 0.9) || (b > r + 12 && b >= g - 8 && s > 0.18);
    if (!bluish) continue;
    const [nr, ng, nb] = hslToRgb(th, s, l);
    d[i] = nr;
    d[i + 1] = ng;
    d[i + 2] = nb;
  }
  return out;
}

export async function loadImageData(src: string): Promise<ImageData> {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("no 2d");
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
