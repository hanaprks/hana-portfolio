import React from "react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl border border-border bg-card/45 backdrop-blur-md shadow-sm mb-6",
        className
      )}
    >
      {children}
    </div>
  );
}
