"use client";

import React from "react";
import { GraduationCap, Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";

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
    <section id="about" className="py-24 md:py-32 bg-muted/10 border-y border-border/40 relative overflow-hidden">
      {/* Subtle details */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-60" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading typography & Focus quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 text-left"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">[ Biography ]</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.05] uppercase">
              {title}
            </h2>
            
            {currentFocus && (
              <div className="p-6 rounded-3xl border border-primary/10 bg-primary/5 space-y-2.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-15">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 font-mono">
                  Current Focus
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  {currentFocus}
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Column: Narrative Biography & Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10 text-left"
          >
            <div className="space-y-6">
              <p className="text-base md:text-lg text-muted-foreground/90 font-medium leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* Education Info */}
            {education && (
              <div className="space-y-4 pt-8 border-t border-border/60">
                <h3 className="text-lg font-black text-foreground flex items-center gap-2.5 uppercase tracking-wide">
                  <GraduationCap className="h-5.5 w-5.5 text-primary" /> Credentials & Education
                </h3>
                <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed whitespace-pre-wrap pl-8 font-medium">
                  {education}
                </p>
              </div>
            )}

            {/* Highlighted Quote Block */}
            <div className="p-6 md:p-8 rounded-[32px] border border-border bg-card shadow-inner space-y-3 relative overflow-hidden max-w-2xl">
              <Quote className="absolute top-3 left-3 h-10 w-10 text-muted/30 rotate-180 -z-0" />
              <p className="italic text-sm md:text-base text-muted-foreground font-medium leading-relaxed relative z-10 pl-6 border-l border-primary/20">
                &ldquo;Data is the new narrative. My mission is to translate complex pipelines and datasets into actionable strategic milestones, helping companies move from guesswork to precision decision-making.&rdquo;
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
