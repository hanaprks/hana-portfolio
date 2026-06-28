import React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadPlaceholderProps {
  label?: string;
  subLabel?: string;
  isDragActive?: boolean;
  className?: string;
}

export function UploadPlaceholder({
  label = "Click to upload or drag & drop",
  subLabel = "Max file size: 4MB",
  isDragActive = false,
  className,
}: UploadPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 bg-muted/20 text-center cursor-pointer transition-all duration-200 hover:bg-muted/40 hover:border-primary/40",
        isDragActive && "border-primary bg-primary/5",
        className
      )}
    >
      <UploadCloud className={cn("h-8 w-8 text-muted-foreground/80 mb-2 transition-transform duration-200", isDragActive && "scale-110 text-primary")} />
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground mt-1 font-medium">{subLabel}</span>
    </div>
  );
}
