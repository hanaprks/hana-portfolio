"use client";

import React from "react";
import { GraduationCap, Sparkles } from "lucide-react";

interface AboutData {
  title: string;
  description: string;
  education: string | null;
  currentFocus: string | null;
}

interface AboutSectionProps {
  data: AboutData | null;
}

export default function AboutSection({ data }: AboutSectionProps) {
  if (!data) return null;

  const { title, description, education, currentFocus } = data;

  return (
    <section id="about" className="py-20 md:py-28 bg-muted/10 border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading typography & Focus quote */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">Biography</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              {title}
            </h2>
            
            {currentFocus && (
              <div className="p-5 rounded-2xl border border-primary/10 bg-primary/5 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5 font-mono">
                  <Sparkles className="h-3.5 w-3.5" /> Current Focus
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  {currentFocus}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Narrative Biography & Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <p className="text-sm md:text-base text-muted-foreground/95 leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* Education Info */}
            {education && (
              <div className="space-y-4 pt-6 border-t border-border/60">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" /> Education & Credentials
                </h3>
                <p className="text-sm text-muted-foreground/90 leading-relaxed whitespace-pre-wrap pl-7 font-medium">
                  {education}
                </p>
              </div>
            )}

            {/* Highlighted core analytical quote */}
            <div className="p-6 rounded-3xl border border-border bg-card shadow-inner italic text-sm text-muted-foreground font-medium max-w-2xl leading-relaxed">
              &ldquo;Data is the new narrative. My mission is to translate complex pipelines and datasets into actionable strategic milestones, helping companies move from guesswork to precision decision-making.&rdquo;
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
