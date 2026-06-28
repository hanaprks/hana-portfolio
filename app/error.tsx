"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Route boundary error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 select-none font-sans text-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Visual Icon */}
        <div className="mx-auto h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
          <AlertCircle className="h-6 w-6" />
        </div>

        {/* Error Content */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase font-mono">System Error</h1>
          <h2 className="text-sm font-bold tracking-tight text-muted-foreground uppercase">Something went wrong</h2>
          <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium">
            An unexpected error occurred while rendering this route.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            onClick={() => reset()}
            size="lg"
            className="rounded-xl font-bold text-xs uppercase tracking-wider gap-2 px-6 w-full sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-xl font-bold text-xs uppercase tracking-wider bg-card border-border px-6 w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
