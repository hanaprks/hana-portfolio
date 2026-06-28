import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

interface ActionButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  icon?: LucideIcon;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function ActionButton({
  icon: Icon,
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("rounded-xl font-medium flex items-center gap-1.5", className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        Icon && <Icon className="h-4 w-4 text-current" />
      )}
      {children}
    </Button>
  );
}
