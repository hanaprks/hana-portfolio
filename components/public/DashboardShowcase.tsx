"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Maximize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardProject {
  id: string;
  title: string;
  slug: string;
  techStack: string | null;
  dashboardScreenshot: string | null;
}

interface DashboardShowcaseProps {
  projects: DashboardProject[];
}

export default function DashboardShowcase({ projects }: DashboardShowcaseProps) {
  const [filterTool, setFilterTool] = useState<"all" | "power-bi" | "tableau" | "looker-studio" | "excel">("all");
  const [activeScreenshotUrl, setActiveScreenshotUrl] = useState<string | null>(null);
  const [activeProjectTitle, setActiveProjectTitle] = useState("");
  const [activeProjectSlug, setActiveProjectSlug] = useState("");

  // Filter projects that have dashboard screenshots
  const dashboardProjects = projects.filter((p) => p.dashboardScreenshot);

  // Filter by selected tool
  const filteredProjects = dashboardProjects.filter((p) => {
    if (filterTool === "all") return true;
    const stack = p.techStack?.toLowerCase() || "";
    if (filterTool === "power-bi") return stack.includes("power bi") || stack.includes("powerbi");
    if (filterTool === "tableau") return stack.includes("tableau");
    if (filterTool === "looker-studio") return stack.includes("looker studio") || stack.includes("lookerstudio");
    if (filterTool === "excel") return stack.includes("excel");
    return true;
  });

  const handleOpenLightbox = (url: string, title: string, slug: string) => {
    setActiveScreenshotUrl(url);
    setActiveProjectTitle(title);
    setActiveProjectSlug(slug);
  };

  const getToolsUsed = (techStack: string | null) => {
    if (!techStack) return [];
    const stackLower = techStack.toLowerCase();
    const tools: string[] = [];
    if (stackLower.includes("power bi") || stackLower.includes("powerbi")) tools.push("Power BI");
    if (stackLower.includes("tableau")) tools.push("Tableau");
    if (stackLower.includes("looker studio") || stackLower.includes("lookerstudio")) tools.push("Looker Studio");
    if (stackLower.includes("excel")) tools.push("Excel");
    return tools;
  };

  return (
    <section id="dashboards" className="py-20 md:py-28 bg-muted/10 border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-6">
          <div className="text-left space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">BI Showcase Gallery</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Dashboard Showcase
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              Interactive reports and operational business intelligence dashboards designed for executive monitoring.
            </p>
          </div>

          {/* Tools filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-muted/60 p-1.5 rounded-2xl border border-border/40 shrink-0">
            {(["all", "power-bi", "tableau", "looker-studio", "excel"] as const).map((tool) => (
              <button
                key={tool}
                onClick={() => setFilterTool(tool)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                  filterTool === tool
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tool === "all" ? "All Tools" : tool.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredProjects.map((project) => {
            const tools = getToolsUsed(project.techStack);
            return (
              <div
                key={project.id}
                className="group relative flex flex-col p-4 rounded-3xl border border-border bg-card/65 hover:border-primary/15 transition-all duration-300 shadow-sm"
              >
                {/* Visual Screenshot Embed */}
                <div
                  onClick={() =>
                    handleOpenLightbox(project.dashboardScreenshot!, project.title, project.slug)
                  }
                  className="relative aspect-video rounded-2xl border border-border/80 bg-muted/20 overflow-hidden cursor-pointer group/img bg-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.dashboardScreenshot!}
                    alt={`Dashboard ${project.title}`}
                    className="w-full h-full object-cover group-hover/img:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Dashboard Meta */}
                <div className="pt-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-foreground truncate" title={project.title}>
                      {project.title}
                    </h3>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/80 font-mono">
                      Interactive Dashboard Report
                    </p>
                  </div>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50">
                    <div className="flex flex-wrap gap-1">
                      {tools.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[9px] font-bold tracking-wide rounded-md px-1.5 py-0.5"
                        >
                          {t}
                        </Badge>
                      ))}
                      {tools.length === 0 && (
                        <span className="text-[10px] text-muted-foreground/60 italic font-semibold">
                          General BI Tool
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 rounded-lg text-[10px] font-bold gap-1 px-2 text-primary hover:bg-primary/5"
                      asChild
                    >
                      <Link href={`/project/${project.slug}`}>
                        Case Study <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>

              </div>
            );
          })}

          {filteredProjects.length === 0 && (
            <p className="col-span-1 md:col-span-3 text-center text-sm text-muted-foreground italic py-12">
              No dashboards match this category filter.
            </p>
          )}
        </div>

      </div>

      {/* Fullscreen Lightbox Preview */}
      <AnimatePresence>
        {activeScreenshotUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveScreenshotUrl(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out select-none"
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">
                  Dashboard Showcase Preview
                </span>
                <h4 className="font-extrabold text-sm truncate text-white">{activeProjectTitle}</h4>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-xl font-semibold gap-1.5 text-xs text-white border-white/20 bg-white/5 hover:bg-white/10"
                  asChild
                >
                  <Link href={`/project/${activeProjectSlug}`}>
                    Read Full Case Study <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <button
                  onClick={() => setActiveScreenshotUrl(null)}
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Visual */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-[85vw] max-h-[80vh] flex items-center justify-center relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeScreenshotUrl}
                alt="Fullscreen Dashboard Preview"
                className="max-w-full max-h-full rounded-xl border border-white/10 object-contain shadow-2xl bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
