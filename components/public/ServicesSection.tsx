"use client";

import React from "react";
import { LineChart, BrainCircuit, Database, Lightbulb, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Data Visualization & Dashboarding",
    description:
      "Designing high-impact, dynamic dashboards using Power BI, Tableau, and Looker Studio. Transforming raw pipeline parameters into visual KPIs that drive daily business execution.",
    icon: LineChart,
    tags: ["Power BI", "Tableau", "Looker Studio"],
  },
  {
    title: "Predictive Modeling & Machine Learning",
    description:
      "Engineering end-to-end regression, classification, and segmentation pipelines. Tuning algorithms (Random Forests, XGBoost) in Python to predict churn, forecast sales, and group behaviors.",
    icon: BrainCircuit,
    tags: ["Python", "XGBoost", "Scikit-Learn"],
  },
  {
    title: "Data Pipeline & ETL Engineering",
    description:
      "Writing optimized SQL queries and ETL transformations. Cleaning structured/unstructured schemas and syncing datasets with cloud databases like Supabase, PostgreSQL, and BigQuery.",
    icon: Database,
    tags: ["SQL", "ETL", "PostgreSQL"],
  },
  {
    title: "Business Intelligence & Strategy",
    description:
      "Translating analytical deep-dives into structured executive slides. Linking evaluation metric gains directly to business ROI and suggesting actionable product optimization models.",
    icon: Lightbulb,
    tags: ["KPIs", "ROI Analysis", "Analytics"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-muted/10 border-y border-border/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-3 max-w-xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">[ Services ]</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground uppercase">
            Services & Value
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Helping teams model operations, design metrics, and convert raw database pipelines into strategic decisions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
        >
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="p-6 md:p-8 rounded-[32px] border border-border bg-card/75 flex flex-col justify-between hover:border-primary/20 hover:translate-y-[-2px] transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{srv.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-border/40">
                  {srv.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold font-mono tracking-wider text-muted-foreground uppercase px-2 py-0.5 bg-muted rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
