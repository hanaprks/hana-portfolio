"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, BrainCircuit, LineChart } from "lucide-react";

interface SkillData {
  id: string;
  name: string;
  category: string;
  level: number;
}

interface ExpertiseSectionProps {
  skills: SkillData[];
}

export default function ExpertiseSection({ skills }: ExpertiseSectionProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, SkillData[]>);

  const getCategoryIcon = (category: string) => {
    const catLower = category.toLowerCase();
    if (catLower.includes("data") || catLower.includes("sql") || catLower.includes("database")) {
      return <Database className="h-5 w-5 text-primary" />;
    }
    if (catLower.includes("model") || catLower.includes("machine") || catLower.includes("ai")) {
      return <BrainCircuit className="h-5 w-5 text-primary" />;
    }
    if (catLower.includes("viz") || catLower.includes("bi") || catLower.includes("chart") || catLower.includes("dashboard")) {
      return <LineChart className="h-5 w-5 text-primary" />;
    }
    return <Code2 className="h-5 w-5 text-primary" />;
  };

  return (
    <section id="expertise" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-left space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">Expertise & Skillset</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Technical Capabilities
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Professional toolbox and machine learning modeling competencies scaled by proficiency.
          </p>
        </div>

        {/* Grouped grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <div
              key={category}
              className="p-6 md:p-8 rounded-3xl border border-border bg-card/45 flex flex-col justify-between hover:border-primary/10 transition-colors duration-300"
            >
              <div className="space-y-6">
                
                {/* Category Header */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
                  {getCategoryIcon(category)}
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{category}</h3>
                </div>

                {/* Progress bars list */}
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      {/* Level progress line */}
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Tag chips overview footer */}
              <div className="flex flex-wrap gap-1.5 pt-6 mt-4">
                {items.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="text-[10px] font-bold tracking-wide rounded-lg"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>

            </div>
          ))}

          {skills.length === 0 && (
            <p className="col-span-1 md:col-span-2 text-center text-sm text-muted-foreground italic py-8">
              No expertise skills registered.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
