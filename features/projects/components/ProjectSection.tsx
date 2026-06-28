"use client";

import React, { useState } from "react";
import type { ProjectSchemaInput } from "../schemas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Sparkles,
  Layers,
} from "lucide-react";
import { FaGithub, FaFigma } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
  data: ProjectSchemaInput;
  className?: string;
}

export function ProjectSection({ data, className }: ProjectSectionProps) {
  const {
    title,
    description,
    thumbnail,
    github,
    demo,
    figma,
    techStack,
    featured,
    status,
    gallery = [],
  } = data;

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Parse tech stack chips
  const tags = techStack
    ? techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      activeImageIndex === 0 ? gallery.length - 1 : activeImageIndex - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      activeImageIndex === gallery.length - 1 ? 0 : activeImageIndex + 1
    );
  };

  return (
    <section
      className={cn(
        "relative py-12 px-6 md:px-10 bg-background overflow-hidden select-none w-full",
        className
      )}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary-5),transparent_40%)]" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl w-full mx-auto space-y-12 relative z-10">
        
        {/* Project Header Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          {featured && (
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 rounded-full font-semibold px-3 py-1 flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Featured Project
            </Badge>
          )}
          <Badge
            variant="outline"
            className={cn(
              "rounded-full font-semibold px-3 py-1 uppercase text-[10px] tracking-wider",
              status === "PUBLISHED"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                : status === "ARCHIVED"
                ? "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
                : "bg-muted text-muted-foreground border-border"
            )}
          >
            {status}
          </Badge>
        </div>

        {/* Two Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
              {title || "Untitled Project"}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed whitespace-pre-wrap">
              {description ||
                "Specify a high-fidelity project description detailing requirements, stack choices, engineering resolutions, and design implementations."}
            </p>

            {/* Tech Stack Chips */}
            {tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2.5 py-1 bg-card/65 border border-border/80 hover:border-primary/20 rounded-lg text-foreground transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Project Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {github && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-semibold gap-1.5 bg-card/40 border-border"
                  asChild
                >
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-4 w-4" /> GitHub Repository
                  </a>
                </Button>
              )}
              {demo && (
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl font-semibold gap-1.5 shadow-md shadow-primary/10"
                  asChild
                >
                  <a href={demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
              {figma && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-semibold gap-1.5 bg-card/40 border-border text-pink-600 dark:text-pink-400 hover:bg-pink-500/5 hover:border-pink-500/20"
                  asChild
                >
                  <a href={figma} target="_blank" rel="noopener noreferrer">
                    <FaFigma className="h-4 w-4" /> Figma Board
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Visuals & Gallery */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Thumbnail */}
            <div className="relative aspect-video rounded-2xl border border-border bg-muted/40 shadow-xl overflow-hidden group">
              {thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/60 gap-1.5">
                  <Maximize2 className="h-8 w-8 text-muted-foreground/40" />
                  <span className="text-xs font-semibold">No Thumbnail Uploaded</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Gallery Grid */}
            {gallery.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Project Gallery ({gallery.length})
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {gallery.map((url, idx) => (
                    <div
                      key={url}
                      onClick={() => setActiveImageIndex(idx)}
                      className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden cursor-pointer hover:border-primary/30 hover:scale-[1.03] transition-all group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Maximize2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out select-none"
          >
            {/* Header controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
              <span className="text-xs font-bold font-mono">
                Image {activeImageIndex + 1} of {gallery.length}
              </span>
              <button
                onClick={() => setActiveImageIndex(null)}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Carousel Buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95 shrink-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Lightbox Image */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-[85vw] max-h-[80vh] flex items-center justify-center relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[activeImageIndex]}
                alt={`Lightbox view ${activeImageIndex}`}
                className="max-w-full max-h-full rounded-xl border border-white/10 object-contain shadow-2xl bg-black"
              />
            </motion.div>

            <button
              onClick={handleNextImage}
              className="absolute right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95 shrink-0"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
