import React from "react";
import { cn } from "@/lib/utils";

interface PageDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageDescription({ children, className }: PageDescriptionProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground mt-1 text-sm md:text-base font-medium max-w-2xl leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}
