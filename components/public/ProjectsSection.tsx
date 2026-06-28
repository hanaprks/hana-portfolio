"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderKanban, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub, FaFigma } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  github: string | null;
  demo: string | null;
  figma: string | null;
  techStack: string | null;
  featured: boolean;
  status: string;
}

interface ProjectsSectionProps {
  projects: ProjectData[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { y: 35, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filterMode, setFilterMode] = useState<"all" | "featured">("featured");

  const displayedProjects = projects.filter((p) => {
    if (filterMode === "featured") return p.featured;
    return true;
  });

  return (
    <section id="projects" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-6">
          <div className="text-left space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">[ Projects ]</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
              Featured Work
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              Data Science stories outlining problem models, model architectures, visualizations, and business actions.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-2xl border border-border/40 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setFilterMode("featured")}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                filterMode === "featured"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Featured Work
            </button>
            <button
              onClick={() => setFilterMode("all")}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                filterMode === "all"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Projects ({projects.length})
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-16 pb-12"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => {
              const tags = project.techStack
                ? project.techStack.split(",").map((t) => t.trim()).filter(Boolean)
                : [];

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  layout
                  className={cn(
                    "group relative flex flex-col p-5 rounded-[32px] border border-border bg-card/45 hover:border-primary/10 transition-all duration-350 shadow-sm",
                    idx % 2 === 1 ? "md:translate-y-8" : ""
                  )}
                >
                  {/* Visual Thumbnail */}
                  <div className="relative aspect-video rounded-2xl border border-border bg-muted/20 overflow-hidden mb-5">
                    {project.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/35 gap-1">
                        <FolderKanban className="h-8 w-8 text-muted-foreground/20 animate-pulse" />
                        <span className="text-[10px] font-semibold font-mono">No Image</span>
                      </div>
                    )}

                    {project.featured && (
                      <Badge className="absolute top-3 left-3 bg-amber-500/90 text-white hover:bg-amber-500 border-none font-bold gap-1 rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" /> Featured
                      </Badge>
                    )}
                  </div>

                  {/* Info and tags */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground/95 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold font-mono tracking-wide text-foreground px-2 py-0.5 bg-muted rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {tags.length > 4 && (
                          <span className="text-[9px] font-bold font-mono text-muted-foreground px-1.5 py-0.5">
                            +{tags.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* CTA link buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-4">
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8.5 w-8.5 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition duration-200"
                            title="GitHub Repository"
                          >
                            <FaGithub className="h-4 w-4" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8.5 w-8.5 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition duration-200"
                            title="Live Demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.figma && (
                          <a
                            href={project.figma}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8.5 w-8.5 rounded-lg border border-border bg-card flex items-center justify-center text-pink-600 hover:text-pink-700 transition duration-200"
                            title="Figma Project"
                          >
                            <FaFigma className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl text-xs font-bold gap-1 group/btn hover:bg-primary/5 hover:text-primary transition"
                        asChild
                      >
                        <Link href={`/project/${project.slug}`}>
                          Read Case Study{" "}
                          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
