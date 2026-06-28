"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border/40 py-12 select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright info */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-xs font-bold text-foreground">
            &copy; {currentYear} Hana Prakasita Kustanto. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider font-mono">
            Designed for storytelling & analytics precision
          </p>
        </div>

        {/* Action button: Scroll top */}
        <Button
          onClick={handleScrollToTop}
          variant="outline"
          size="icon"
          className="h-9.5 w-9.5 rounded-full border border-border bg-card shadow-sm hover:bg-muted animate-none"
          title="Scroll to Top"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </Button>

      </div>
    </footer>
  );
}
