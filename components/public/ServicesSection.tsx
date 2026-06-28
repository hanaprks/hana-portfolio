"use client";

import React from "react";
import { LineChart, BrainCircuit, Database, Lightbulb, ArrowUpRight } from "lucide-react";

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

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-muted/10 border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-left space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">Offered Services</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Core Competencies
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Helping teams model operations, design metrics, and convert raw database pipelines into strategic decisions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl border border-border bg-card/70 flex flex-col justify-between hover:border-primary/20 hover:scale-[1.01] transition-all duration-300 shadow-sm"
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
                <div className="flex flex-wrap gap-1.5 pt-6 mt-4 border-t border-border/40">
                  {srv.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold font-mono tracking-wider text-muted-foreground uppercase px-2 py-0.5 bg-muted rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
