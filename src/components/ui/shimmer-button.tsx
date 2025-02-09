import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "9999px",
      background = "hsl(var(--primary))",
      className,
      variant = 'default',
      size = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    // Helper function to determine text color based on background
    const getTextColor = (bg: string) => {
      if (variant === 'destructive') return "text-destructive-foreground";
      if (variant === 'outline') return "text-foreground hover:text-primary-foreground";
      if (bg.includes("var(--primary)")) return "text-primary-foreground";
      if (bg.includes("var(--secondary)")) return "text-secondary-foreground";
      if (bg.includes("var(--muted)")) return "text-muted-foreground";
      return "text-foreground";
    };

    const getBackground = () => {
      switch (variant) {
        case 'destructive':
          return 'hsl(var(--destructive))';
        case 'secondary':
          return 'hsl(var(--secondary))';
        case 'outline':
          return 'transparent';
        default:
          return background;
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'h-9 px-3 text-sm';
        case 'lg':
          return 'h-11 px-8 text-base';
        default:
          return 'h-10 px-4 text-sm';
      }
    };

    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": getBackground(),
          } as CSSProperties
        }
        className={cn(
          "group relative inline-flex items-center justify-center whitespace-nowrap rounded-full",
          "font-medium ring-offset-background transition-colors focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          getSizeClasses(),
          {
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === 'outline',
            "bg-secondary hover:bg-secondary/80": variant === 'secondary',
            "bg-destructive hover:bg-destructive/90": variant === 'destructive',
            "bg-primary hover:bg-primary/90": variant === 'default',
          },
          getTextColor(getBackground()),
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 [mask-image:linear-gradient(white,transparent)]">
            <div className="animate-shimmer relative h-[100%] w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton }; 