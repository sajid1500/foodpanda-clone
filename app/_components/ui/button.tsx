"use client";

import * as React from "react";
import { cn } from "@/app/_lib/utils/utils";

type ButtonVariant = "default" | "outline" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const baseClasses =
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button };
