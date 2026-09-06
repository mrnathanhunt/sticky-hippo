import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display text-sm tracking-tight uppercase transition-[transform,background-color,color] duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gold text-ink hover:bg-gold/90",
        red: "bg-red text-paper hover:bg-red/90",
        invert: "bg-ink text-gold hover:bg-ink/90",
        outline:
          "bg-transparent text-current shadow-[inset_0_0_0_1px_color-mix(in_oklab,currentColor_28%,transparent)] hover:bg-current/8",
        ghost: "bg-transparent text-current hover:bg-current/8",
      },
      size: {
        default: "h-11 rounded-md px-5",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-12 rounded-md px-6 text-base",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        "active:not-disabled:scale-[0.97]",
        className,
      )}
      {...props}
    />
  );
}
