"use client";

import React from "react";
import type { AboutSchemaInput } from "../schemas";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Sparkles, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  data: AboutSchemaInput;
  className?: string;
}

export function AboutSection({ data, className }: AboutSectionProps) {
  const { title, description, education, currentFocus } = data;

  return (
    <section
      className={cn(
        "relative py-16 px-6 md:px-12 bg-background overflow-hidden select-none",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-primary-5),transparent_40%)]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Heading & Detailed Description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
              {title || "Crafting experiences with code and design."}
            </h2>
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed space-y-4 whitespace-pre-wrap max-w-2xl">
            {description ||
              "I am a software engineer dedicated to building clean, accessible, and performant web applications. My work focuses on bridging the gap between modern backend infrastructure and premium user interfaces."}
          </div>
        </div>

        {/* Right Column: Widgets (Education & Focus) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
          
          {/* Education Card */}
          {education && (
            <Card className="border-border bg-card/40 backdrop-blur-md shadow-sm hover:border-primary/20 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden group">
              <CardContent className="p-5 flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-foreground tracking-tight uppercase">Education</h4>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed whitespace-pre-wrap">
                    {education}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Focus Card */}
          {currentFocus && (
            <Card className="border-border bg-card/40 backdrop-blur-md shadow-sm hover:border-violet-500/20 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden group relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl" />
              <CardContent className="p-5 flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Compass className="h-5 w-5" />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-foreground tracking-tight uppercase">Current Focus</h4>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed whitespace-pre-wrap">
                    {currentFocus}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </section>
  );
}
