"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 select-none font-sans text-center">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase font-mono text-destructive">Critical Error</h1>
          <p className="text-xs text-muted-foreground font-medium">
            A fatal exception occurred in the root layout of the application.
          </p>
          <div className="pt-2">
            <Button
              onClick={() => reset()}
              size="lg"
              className="rounded-xl font-bold text-xs uppercase tracking-wider px-6 animate-none"
            >
              Reset Application
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
