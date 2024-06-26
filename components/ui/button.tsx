import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-cyan-950 dark:focus-visible:ring-cyan-300",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-600 text-white hover:bg-cyan-600/90 dark:bg-white dark:text-cyan-600 dark:hover:bg-white/90",
        destructive:
          "bg-red-500 text-cyan-50 hover:bg-red-500/90 dark:bg-red-600 dark:text-cyan-50 dark:hover:bg-red-600/90",
        outline:
          "border border-cyan-600 bg-white hover:bg-cyan-100 text-cyan-600 hover:text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950 dark:hover:bg-cyan-800 dark:hover:text-cyan-50",
        secondary:
          "bg-cyan-100 text-cyan-600 hover:bg-cyan-100/80 dark:bg-cyan-800 dark:text-cyan-50 dark:hover:bg-cyan-800/80",
        ghost:
          "hover:bg-cyan-100 hover:text-cyan-600 dark:hover:bg-cyan-800 dark:hover:text-cyan-50",
        link: "text-cyan-600 underline-offset-4 hover:underline dark:text-cyan-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
