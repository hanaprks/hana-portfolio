"use client";

import React from "react";
import type { SkillData } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "./LucideIcon";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillSectionProps {
  skills: SkillData[];
  className?: string;
}

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "Mobile",
  "Design",
  "Tools",
  "Other",
];

export function SkillSection({ skills, className }: SkillSectionProps) {
  const groupedSkills = CATEGORIES.reduce((acc, category) => {
    const categorySkills = skills.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
    if (categorySkills.length > 0) {
      acc[category] = categorySkills;
    }
    return acc;
  }, {} as Record<string, SkillData[]>);

  skills.forEach((s) => {
    const matched = CATEGORIES.some(
      (cat) => cat.toLowerCase() === s.category.toLowerCase()
    );
    if (!matched) {
      const formattedCat = s.category.charAt(0).toUpperCase() + s.category.slice(1);
      if (!groupedSkills[formattedCat]) {
        groupedSkills[formattedCat] = [];
      }
      if (!groupedSkills[formattedCat].some((item) => item.id === s.id)) {
        groupedSkills[formattedCat].push(s);
      }
    }
  });

  const categoriesToRender = Object.keys(groupedSkills);

  return (
    <section
      className={cn(
        "relative py-12 px-6 md:px-12 bg-background overflow-hidden select-none w-full",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary-5),transparent_50%)]" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> My Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Technical Expertise
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Here are the languages, frameworks, and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Categories Grid */}
        {categoriesToRender.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed rounded-2xl p-8 max-w-md mx-auto bg-card/20 border-border/80">
            No skills added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {categoriesToRender.map((category) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-border bg-card/45 backdrop-blur-md shadow-sm hover:border-primary/10 transition-colors duration-300 rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-border/50 pb-3 p-5 bg-muted/20">
                    <CardTitle className="text-base font-bold uppercase tracking-wider text-foreground/90 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-5">
                    {groupedSkills[category]
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          
                          {/* Skill Info */}
                          <div className="flex justify-between items-center text-sm font-semibold">
                            <span className="flex items-center gap-2 text-foreground">
                              {skill.icon && (
                                <LucideIcon name={skill.icon} className="h-4 w-4 text-primary/70 shrink-0" />
                              )}
                              {skill.name}
                            </span>
                            <span className="text-xs text-primary font-mono bg-primary/5 border border-primary/15 rounded-md px-1.5 py-0.5 leading-none">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Skill Progress Bar */}
                          <div className="h-2 bg-muted rounded-full overflow-hidden w-full border border-border/50">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                            />
                          </div>

                        </div>
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
