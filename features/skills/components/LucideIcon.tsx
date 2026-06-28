import React from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface LucideIconProps {
  name: string;
  className?: string;
}

export function LucideIcon({ name, className }: LucideIconProps) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  
  if (!IconComponent) {
    return <Icons.HelpCircle className={cn("h-4 w-4", className)} />;
  }

  return <IconComponent className={cn("h-4 w-4", className)} />;
}
