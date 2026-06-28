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
  Database,
  BarChart4,
  CheckCircle,
  Lightbulb,
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
    
    problemStatement,
    datasetDescription,
    methodology,
    dataCleaning,
    exploratoryAnalysis,
    featureEngineering,
    visualizationProcess,
    dashboardScreenshot,
    modelDevelopment,
    evaluation,
    businessInsight,
    recommendation,
    conclusion,
  } = data;

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

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

  const renderSection = (titleText: string, content?: string, icon?: React.ReactNode) => {
    if (!content || !content.trim()) return null;
    return (
      <div className="space-y-3 pt-6 border-t border-border/40 first:border-none first:pt-0">
        <h3 className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          {icon}
          {titleText}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    );
  };

  return (
    <article
      className={cn(
        "relative bg-background overflow-hidden select-none w-full pb-16",
        className
      )}
    >
      {/* Hero Banner Image */}
      <div className="relative w-full aspect-video md:aspect-[21/9] border-b border-border bg-muted/40 overflow-hidden">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/45 gap-1">
            <Layers className="h-10 w-10 text-muted-foreground/30 animate-pulse" />
            <span className="text-xs font-semibold">No Hero Thumbnail Uploaded</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent" />
      </div>

      {/* Main Narrative Container */}
      <div className="max-w-4xl w-full mx-auto px-6 py-10 space-y-10 relative z-10">
        
        {/* Badges / Meta */}
        <div className="flex flex-wrap items-center gap-3">
          {featured && (
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-bold gap-1 rounded-full px-3 py-1"
            >
              <Sparkles className="h-3.5 w-3.5" /> Featured Project
            </Badge>
          )}
          <Badge
            variant="outline"
            className={cn(
              "rounded-full font-bold px-3 py-1 text-[9px] uppercase tracking-wider",
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

        {/* Title & Core Overview */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            {title || "Untitled Project"}
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground/90 font-medium leading-relaxed whitespace-pre-wrap">
            {description || "Specify a core summary outlining this data engineering case study portfolio project."}
          </p>

          {/* Tech stack */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold px-2.5 py-1 bg-card/65 border border-border rounded-lg text-foreground hover:border-primary/20 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {github && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl font-semibold gap-1.5 bg-card/40 border-border"
                asChild
              >
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-4 w-4" /> Code Repository
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
                  <ExternalLink className="h-4 w-4" /> Live Presentation
                </a>
              </Button>
            )}
            {figma && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl font-semibold gap-1.5 bg-card/40 border-border text-pink-600 dark:text-pink-400"
                asChild
              >
                <a href={figma} target="_blank" rel="noopener noreferrer">
                  <FaFigma className="h-4 w-4" /> Figma Board
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Narrative Flow Sections */}
        <div className="space-y-8 pt-6">
          {renderSection("Problem Statement", problemStatement, <Database className="h-5 w-5 text-primary/70" />)}
          {renderSection("Dataset Description", datasetDescription, <Database className="h-5 w-5 text-primary/70" />)}
          {renderSection("Methodology", methodology, <Layers className="h-5 w-5 text-primary/70" />)}
          {renderSection("Data Cleaning Process", dataCleaning, <CheckCircle className="h-5 w-5 text-primary/70" />)}
          {renderSection("Exploratory Data Analysis (EDA)", exploratoryAnalysis, <BarChart4 className="h-5 w-5 text-primary/70" />)}
          {renderSection("Feature Engineering", featureEngineering, <Layers className="h-5 w-5 text-primary/70" />)}
          {renderSection("Visualization Process", visualizationProcess, <BarChart4 className="h-5 w-5 text-primary/70" />)}
          
          {/* Interactive Dashboard Screenshot block */}
          {dashboardScreenshot && (
            <div className="space-y-3 pt-6 border-t border-border/40">
              <h3 className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-primary/70" />
                Dashboard Preview
              </h3>
              <div className="relative aspect-video rounded-2xl border border-border bg-muted/30 overflow-hidden shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dashboardScreenshot}
                  alt="Dashboard Screenshot Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {renderSection("Model Development & Setup", modelDevelopment, <Layers className="h-5 w-5 text-primary/70" />)}
          {renderSection("Evaluation & Validation", evaluation, <CheckCircle className="h-5 w-5 text-primary/70" />)}
          {renderSection("Business Insight & ROI impact", businessInsight, <Lightbulb className="h-5 w-5 text-primary/70" />)}
          {renderSection("Actionable Recommendations", recommendation, <Lightbulb className="h-5 w-5 text-primary/70" />)}
          {renderSection("Conclusion", conclusion, <CheckCircle className="h-5 w-5 text-primary/70" />)}
        </div>

        {/* Project Gallery Images (if any) */}
        {gallery.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border/40">
            <h3 className="text-xl font-extrabold tracking-tight text-foreground">Project Screenshot Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((url, idx) => (
                <div
                  key={url}
                  onClick={() => setActiveImageIndex(idx)}
                  className="relative aspect-video rounded-xl border border-border overflow-hidden cursor-pointer hover:border-primary/30 hover:scale-[1.02] transition-all group bg-card"
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

      {/* Lightbox Slider */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out select-none"
          >
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

            <button
              onClick={handlePrevImage}
              className="absolute left-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95 shrink-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

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
    </article>
  );
}
