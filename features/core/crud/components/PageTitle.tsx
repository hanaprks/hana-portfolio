import React from "react";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        "text-3xl md:text-4xl font-black tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h1>
  );
}
