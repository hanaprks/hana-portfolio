import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Database,
  BarChart4,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { FaGithub, FaFigma } from "react-icons/fa6";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  // Fetch current project detail
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project || project.status !== "PUBLISHED") {
    notFound();
  }

  // Fetch all published projects to determine prev/next links
  const allProjects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
    },
  });

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // Calculate estimated reading time
  const narrativeTexts = [
    project.description,
    project.problemStatement,
    project.datasetDescription,
    project.methodology,
    project.dataCleaning,
    project.exploratoryAnalysis,
    project.featureEngineering,
    project.visualizationProcess,
    project.modelDevelopment,
    project.evaluation,
    project.businessInsight,
    project.recommendation,
    project.conclusion,
  ].filter(Boolean) as string[];

  const wordCount = narrativeTexts.reduce((acc, text) => acc + text.split(/\s+/).length, 0);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // ~200 wpm

  const tags = project.techStack
    ? project.techStack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const dateStr = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(project.createdAt);

  // Table of Contents sections
  const tocItems = [
    { label: "Overview", id: "overview", active: true },
    { label: "Problem Statement", id: "problem", active: !!project.problemStatement },
    { label: "Dataset Description", id: "dataset", active: !!project.datasetDescription },
    { label: "Methodology Flow", id: "methodology", active: !!project.methodology },
    { label: "Data Cleaning", id: "cleaning", active: !!project.dataCleaning },
    { label: "Exploratory Analysis", id: "eda", active: !!project.exploratoryAnalysis },
    { label: "Feature Engineering", id: "features", active: !!project.featureEngineering },
    { label: "Visualization & Dashboard", id: "visualization", active: !!project.visualizationProcess || !!project.dashboardScreenshot },
    { label: "Model Development", id: "modeling", active: !!project.modelDevelopment },
    { label: "Evaluation Metrics", id: "evaluation", active: !!project.evaluation },
    { label: "Business Insights", id: "insights", active: !!project.businessInsight || !!project.recommendation },
    { label: "Project Conclusion", id: "conclusion", active: !!project.conclusion },
  ].filter((item) => item.active);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans select-none antialiased selection:bg-primary/10 selection:text-primary">
      
      {/* Top mini header bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40 py-4">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl text-xs gap-1.5 font-bold hover:bg-muted"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>

          <span className="text-xs font-mono font-bold text-muted-foreground/80 hidden sm:inline-block">
            Case Study: {project.title}
          </span>
        </div>
      </header>

      {/* Hero Banner Cover */}
      <div className="relative w-full aspect-video md:aspect-[21/9] border-b border-border bg-muted/40 overflow-hidden mt-14">
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/45 gap-1">
            <BookOpen className="h-10 w-10 text-muted-foreground/30 animate-pulse" />
            <span className="text-xs font-semibold">No Project cover banner</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent" />
      </div>

      {/* Content Columns Wrapper */}
      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Table of Contents (Sticky) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 hidden lg:block space-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-widest font-mono">
                Table of Contents
              </h4>
              <nav className="flex flex-col gap-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-xs font-bold text-muted-foreground/80 hover:text-foreground hover:translate-x-0.5 transition-all block py-1 border-l border-border/60 pl-3.5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Column: Narrative Content Body */}
          <main className="lg:col-span-9 space-y-12">
            
            {/* Article Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-muted-foreground border-b border-border/40 pb-5">
              {project.featured && (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold gap-1 rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" /> Featured Project
                </Badge>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {dateStr}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {readingTime} min read
              </span>
            </div>

            {/* Main Header title */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                {project.title}
              </h1>
              
              {/* Tech Stack tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold px-2.5 py-1 bg-muted border border-border/60 rounded-lg text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Link Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                {project.github && (
                  <Button
                    variant="outline"
                    className="rounded-xl font-bold text-xs gap-1.5 bg-card border-border shadow-sm"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="h-4 w-4" /> Code Repository
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button
                    className="rounded-xl font-bold text-xs gap-1.5 shadow-md shadow-primary/10"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Live Presentation
                    </a>
                  </Button>
                )}
                {project.figma && (
                  <Button
                    variant="outline"
                    className="rounded-xl font-bold text-xs gap-1.5 bg-card border-border shadow-sm text-pink-600"
                    asChild
                  >
                    <a href={project.figma} target="_blank" rel="noopener noreferrer">
                      <FaFigma className="h-4 w-4" /> Figma Board
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Editorial Articles Narrative Flow */}
            <div className="space-y-10 pt-4 leading-relaxed text-muted-foreground/90">
              
              {/* Overview Section */}
              <section id="overview" className="space-y-3 scroll-mt-24">
                <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary/70" /> Overview
                </h3>
                <p className="text-sm md:text-base whitespace-pre-wrap">
                  {project.description}
                </p>
              </section>

              {/* Problem Statement */}
              {project.problemStatement && (
                <section id="problem" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary/70" /> Problem Statement
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.problemStatement}
                  </p>
                </section>
              )}

              {/* Dataset Description */}
              {project.datasetDescription && (
                <section id="dataset" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary/70" /> Dataset Description
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.datasetDescription}
                  </p>
                </section>
              )}

              {/* Methodology Flow */}
              {project.methodology && (
                <section id="methodology" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary/70" /> Methodology Flow
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.methodology}
                  </p>
                </section>
              )}

              {/* Data Cleaning */}
              {project.dataCleaning && (
                <section id="cleaning" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" /> Data Cleaning
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.dataCleaning}
                  </p>
                </section>
              )}

              {/* Exploratory Analysis */}
              {project.exploratoryAnalysis && (
                <section id="eda" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <BarChart4 className="h-5 w-5 text-primary/70" /> Exploratory Data Analysis (EDA)
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.exploratoryAnalysis}
                  </p>
                </section>
              )}

              {/* Feature Engineering */}
              {project.featureEngineering && (
                <section id="features" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary/70" /> Feature Engineering
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.featureEngineering}
                  </p>
                </section>
              )}

              {/* Visualization Process & Dashboard Screenshot */}
              {(project.visualizationProcess || project.dashboardScreenshot) && (
                <section id="visualization" className="space-y-4 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <BarChart4 className="h-5 w-5 text-primary/70" /> Visualizations & Dashboards
                  </h3>
                  {project.visualizationProcess && (
                    <p className="text-sm md:text-base whitespace-pre-wrap">
                      {project.visualizationProcess}
                    </p>
                  )}
                  {project.dashboardScreenshot && (
                    <div className="relative aspect-video rounded-2xl border border-border bg-muted/20 overflow-hidden mt-3 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.dashboardScreenshot}
                        alt="Dashboard Screenshot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </section>
              )}

              {/* Model Development */}
              {project.modelDevelopment && (
                <section id="modeling" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary/70" /> Model Development & Training
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.modelDevelopment}
                  </p>
                </section>
              )}

              {/* Evaluation Metrics */}
              {project.evaluation && (
                <section id="evaluation" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" /> Model Evaluation
                  </h3>
                  <p className="text-sm md:text-base whitespace-pre-wrap">
                    {project.evaluation}
                  </p>
                </section>
              )}

              {/* Business Insights & Recommendations */}
              {(project.businessInsight || project.recommendation) && (
                <section id="insights" className="space-y-4 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary/70" /> Business Insights & Recommendations
                  </h3>
                  {project.businessInsight && (
                    <p className="text-sm md:text-base whitespace-pre-wrap">
                      {project.businessInsight}
                    </p>
                  )}
                  {project.recommendation && (
                    <div className="p-5 rounded-2xl border border-primary/10 bg-primary/5 space-y-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary font-mono">Actionable Recommendation Steps</h4>
                      <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed whitespace-pre-wrap">
                        {project.recommendation}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Conclusion */}
              {project.conclusion && (
                <section id="conclusion" className="space-y-3 scroll-mt-24 pt-6 border-t border-border/40">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" /> Conclusion
                  </h3>
                  <div className="p-5 rounded-2xl border border-border bg-muted/15">
                    <p className="text-sm md:text-base whitespace-pre-wrap">
                      {project.conclusion}
                    </p>
                  </div>
                </section>
              )}

            </div>

            {/* Previous & Next Article Navigation */}
            {(prevProject || nextProject) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/60 pt-8 mt-12">
                {prevProject ? (
                  <Link
                    href={`/project/${prevProject.slug}`}
                    className="group p-4 rounded-2xl border border-border bg-card/45 hover:border-primary/15 transition-all text-left flex flex-col justify-between space-y-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/75 font-mono flex items-center gap-1">
                      <ChevronLeft className="h-3.5 w-3.5" /> Previous Project
                    </span>
                    <h5 className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {prevProject.title}
                    </h5>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextProject && (
                  <Link
                    href={`/project/${nextProject.slug}`}
                    className="group p-4 rounded-2xl border border-border bg-card/45 hover:border-primary/15 transition-all text-right flex flex-col justify-between space-y-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/75 font-mono flex items-center justify-end gap-1">
                      Next Project <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                    <h5 className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {nextProject.title}
                    </h5>
                  </Link>
                )}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Footer copyright */}
      <footer className="bg-background border-t border-border/40 py-12 select-none">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-foreground">
            &copy; {new Date().getFullYear()} Hana Prakasita Kustanto. All rights reserved.
          </p>
          <Button
            variant="link"
            size="sm"
            className="text-xs font-bold text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </footer>

    </div>
  );
}
