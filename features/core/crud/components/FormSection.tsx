import React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn("space-y-6 pt-6 first:pt-0 border-t border-border first:border-0", className)}>
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 font-medium">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
