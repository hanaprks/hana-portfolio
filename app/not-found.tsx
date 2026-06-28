import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 select-none font-sans text-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Visual Icon */}
        <div className="mx-auto h-12 w-12 rounded-2xl bg-muted/65 flex items-center justify-center text-muted-foreground">
          <HelpCircle className="h-6 w-6 animate-pulse" />
        </div>

        {/* 404 Content */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-foreground font-mono">404</h1>
          <h2 className="text-xl font-bold tracking-tight text-foreground uppercase">Page Not Found</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Back button */}
        <div className="pt-4">
          <Button
            size="lg"
            className="rounded-xl font-bold text-xs uppercase tracking-wider gap-2 px-6"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> Return to Homepage
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
