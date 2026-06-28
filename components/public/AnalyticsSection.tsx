"use client";

import React from "react";
import { FolderKanban, GraduationCap, Award, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AnalyticsStats {
  totalProjects: number;
  publishedProjects: number;
  totalSkills: number;
  yearsExperience: number;
}

interface AnalyticsSectionProps {
  stats: AnalyticsStats;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AnalyticsSection({ stats }: AnalyticsSectionProps) {
  const statItems = [
    {
      title: "Completed Projects",
      value: stats.totalProjects,
      description: "Data pipelines & machine learning models",
      icon: FolderKanban,
    },
    {
      title: "Active Learning",
      value: stats.yearsExperience,
      suffix: " Years",
      description: "University & portfolio active timeline",
      icon: GraduationCap,
    },
    {
      title: "Core Technologies",
      value: stats.totalSkills,
      description: "Grouped skills and competencies",
      icon: Settings,
    },
    {
      title: "Milestones",
      value: stats.publishedProjects,
      description: "Published case studies & dashboards",
      icon: Award,
    },
  ];

  return (
    <section id="analytics" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-3 max-w-xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">[ Analytics ]</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
            Analytics Overview
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Dynamic statistics illustrating the scale, credentials, and depth of Hana&apos;s data portfolio.
          </p>
        </motion.div>

        {/* Stats cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4"
        >
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} variants={cardVariants}>
                <Card className="border border-border bg-card/45 hover:border-primary/10 transition-colors duration-300 rounded-[32px] overflow-hidden shadow-sm flex flex-col justify-between h-full">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* Icon */}
                    <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Value & Label */}
                    <div className="space-y-1.5">
                      <div className="text-4xl md:text-5xl font-black tracking-tight text-foreground font-mono">
                        {item.value}
                        {item.suffix}
                      </div>
                      <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
