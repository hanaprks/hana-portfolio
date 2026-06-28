"use client";

import React from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface SaveIndicatorProps {
  status: SaveStatus;
  errorMessage?: string;
  className?: string;
}

export function SaveIndicator({ status, errorMessage, className }: SaveIndicatorProps) {
  if (status === "idle") return null;

  return (
    <div className={cn("inline-flex items-center text-xs font-medium gap-1.5 px-2.5 py-1 rounded-full border bg-muted/50", className)}>
      <AnimatePresence mode="wait">
        {status === "saving" && (
          <motion.span
            key="saving"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-muted-foreground"
          >
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span>Saving...</span>
          </motion.span>
        )}
        {status === "saved" && (
          <motion.span
            key="saved"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
          >
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span>Saved ✓</span>
          </motion.span>
        )}
        {status === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-destructive"
            title={errorMessage}
          >
            <AlertCircle className="h-3.5 w-3.5 text-destructive" />
            <span>Error</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
