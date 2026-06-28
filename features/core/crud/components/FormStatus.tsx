import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormStatusProps {
  type: "success" | "error" | null;
  message?: string;
  className?: string;
}

export function FormStatus({ type, message, className }: FormStatusProps) {
  if (!type || !message) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 p-4 rounded-xl border text-sm font-medium transition-all duration-200",
        type === "success"
          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300"
          : "bg-destructive/10 border-destructive/20 text-destructive",
        className
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
      )}
      <span className="leading-tight">{message}</span>
    </div>
  );
}
