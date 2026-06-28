"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderKanban, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub, FaFigma } from "react-icons/fa6";
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

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filterMode, setFilterMode] = useState<"all" | "featured">("featured");

  const displayedProjects = projects.filter((p) => {
    if (filterMode === "featured") return p.featured;
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-6">
          <div className="text-left space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">Case Studies & Portfolios</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Featured Work
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              Data Science stories outlining problem models, model architectures, visualizations, and business actions.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-2xl border border-border/40 shrink-0">
            <button
              onClick={() => setFilterMode("featured")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
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
                "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => {
            const tags = project.techStack
              ? project.techStack.split(",").map((t) => t.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={project.id}
                className="group relative flex flex-col p-5 rounded-3xl border border-border bg-card/45 hover:border-primary/10 transition-all duration-350 shadow-sm"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video rounded-2xl border border-border bg-muted/20 overflow-hidden mb-5">
                  {project.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
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
                    <h3 className="text-lg font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
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
                          className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition"
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
                          className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition"
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
                          className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center text-pink-600 hover:text-pink-700 transition"
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
              </div>
            );
          })}

          {displayedProjects.length === 0 && (
            <p className="col-span-1 md:col-span-2 text-center text-sm text-muted-foreground italic py-8">
              No projects matching filters.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
