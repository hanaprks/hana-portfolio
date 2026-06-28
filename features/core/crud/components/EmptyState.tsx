import React from "react";
import { FolderOpen, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No data available",
  description = "Get started by creating a new entry.",
  icon: Icon = FolderOpen,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-2xl bg-card/40 border-border min-h-[300px] backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
      <div className="rounded-full p-4 bg-muted/60 text-muted-foreground/80 mb-4">
        <Icon className="h-8 w-8 text-primary/70" />
      </div>
      <h3 className="text-lg font-bold tracking-tight text-foreground mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-sm font-medium mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="default" className="rounded-xl px-5 shadow-sm font-semibold">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
