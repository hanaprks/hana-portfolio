"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, BrainCircuit, LineChart } from "lucide-react";
import { motion } from "framer-motion";

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
      return <Database className="h-5.5 w-5.5 text-primary" />;
    }
    if (catLower.includes("model") || catLower.includes("machine") || catLower.includes("ai")) {
      return <BrainCircuit className="h-5.5 w-5.5 text-primary" />;
    }
    if (catLower.includes("viz") || catLower.includes("bi") || catLower.includes("chart") || catLower.includes("dashboard")) {
      return <LineChart className="h-5.5 w-5.5 text-primary" />;
    }
    return <Code2 className="h-5.5 w-5.5 text-primary" />;
  };

  return (
    <section id="expertise" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-3 max-w-xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">[ Skills ]</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground uppercase">
            Expertise & Tools
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Analytical tools, database pipelines, and machine learning competencies scaled by proficiency.
          </p>
        </motion.div>

        {/* Grouped grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 md:p-8 rounded-[32px] border border-border bg-card/45 flex flex-col justify-between hover:border-primary/10 transition-colors duration-300"
            >
              <div className="space-y-6">
                
                {/* Category Header */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
                  {getCategoryIcon(category)}
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{category}</h3>
                </div>

                {/* Progress bars list */}
                <div className="space-y-5">
                  {items.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      {/* Level progress line */}
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Tag chips overview footer */}
              <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-border/30">
                {items.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="text-[10px] font-bold tracking-wide rounded-lg px-2 py-0.5"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>

            </motion.div>
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
