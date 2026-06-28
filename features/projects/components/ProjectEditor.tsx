"use client";

import React, { useState, useRef } from "react";
import { useProjectForm } from "../hooks/useProjectForm";
import { ProjectPreview } from "./ProjectPreview";
import {
  SectionCard,
  FormSection,
  FormActions,
  ImageUploader,
  ConfirmLeaveDialog,
  FormStatus,
  PageTitle,
  PageDescription,
} from "@/features/core/crud/components";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import {
  X,
  ChevronUp,
  ChevronDown,
  Trash,
  Upload,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectData } from "../types";

interface ProjectEditorProps {
  project: ProjectData | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProjectEditor({ project, onCancel, onSuccess }: ProjectEditorProps) {
  const {
    form,
    onSubmit,
    isPending,
    saveStatus,
    errorMessage,
    tags,
    addTag,
    removeTag,
    gallery,
    addGalleryImage,
    removeGalleryImage,
    moveGalleryImage,
  } = useProjectForm({ project, onSuccess });

  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const watchedValues = form.watch();

  // UploadThing helper for gallery images
  const { startUpload, isUploading } = useUploadThing("profileImage", {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.url;
      if (url) {
        addGalleryImage(url);
        toast.success("Image added to gallery!");
      }
    },
    onUploadError: (err) => {
      console.warn("UploadThing error:", err);
      toast.info("Using simulation mode (UploadThing token not configured).");
    },
  });

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image!");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size must be less than 4MB");
      return;
    }

    try {
      const uploadResult = await startUpload([file]);
      if (!uploadResult) {
        simulateGalleryUpload(file);
      }
    } catch {
      simulateGalleryUpload(file);
    }
  };

  const simulateGalleryUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        addGalleryImage(reader.result);
        toast.success("Image added to gallery (simulation mode)");
      }
    };
    reader.readAsDataURL(file);
  };

  const { isDirty } = form.formState;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <PageTitle>{project ? "Edit Project" : "New Project"}</PageTitle>
        <PageDescription>
          {project
            ? "Modify project details, tech stack, and visual gallery."
            : "Create a new portfolio showcase project and define its attributes."}
        </PageDescription>
      </div>

      <FormStatus
        type={saveStatus === "error" ? "error" : null}
        message={errorMessage}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form */}
        <form onSubmit={onSubmit} className="xl:col-span-7 space-y-6">
          <SectionCard
            title="Project Editor"
            description="Manage core specifications, visual resources, analytics narrative, and dashboards."
            action={
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="rounded-xl flex items-center gap-1 hover:bg-muted text-xs font-semibold"
              >
                Back to List
              </Button>
            }
          >
            <div className="space-y-8">
              
              {/* Section 1: Basic Information */}
              <FormSection
                title="Basic Metadata"
                description="Core naming, path parameters, and brief summaries."
              >
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Churn Prediction Engine"
                    {...form.register("title")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.title && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Slug (URL Path) *</Label>
                  <Input
                    id="slug"
                    placeholder="e.g. churn-prediction-engine"
                    {...form.register("slug")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.slug && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.slug.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="description" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Project Summary *</Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe the project, core technologies, and main achievements..."
                    {...form.register("description")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                  {form.formState.errors.description && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Status and Featured Settings */}
              <FormSection
                title="Visibility & Status"
                description="Project display configurations."
              >
                <div className="space-y-2">
                  <Label htmlFor="status" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</Label>
                  <select
                    id="status"
                    {...form.register("status")}
                    className="flex h-9 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured" className="font-bold text-sm text-foreground cursor-pointer">Featured Project</Label>
                    <p className="text-xs text-muted-foreground font-medium">Promote this project at the top of your homepage.</p>
                  </div>
                  <input
                    type="checkbox"
                    id="featured"
                    {...form.register("featured")}
                    className="h-4.5 w-4.5 rounded border-border bg-card accent-primary text-primary focus:ring-0 cursor-pointer"
                  />
                </div>
              </FormSection>

              {/* Technical Details & Links */}
              <FormSection
                title="Technical Scope & Links"
                description="Assign source repositories, live presentations, and figma canvas URLs."
              >
                <div className="space-y-2">
                  <Label htmlFor="github" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">GitHub URL</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/username/repo"
                    {...form.register("github")}
                    className="rounded-xl bg-card border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Live Demo URL</Label>
                  <Input
                    id="demo"
                    placeholder="https://project-demo.com"
                    {...form.register("demo")}
                    className="rounded-xl bg-card border-border"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="figma" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Figma Canvas URL</Label>
                  <Input
                    id="figma"
                    placeholder="https://figma.com/file/..."
                    {...form.register("figma")}
                    className="rounded-xl bg-card border-border"
                  />
                </div>

                {/* Tech Stack Chips */}
                <div className="col-span-1 md:col-span-2 space-y-3 pt-2">
                  <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Tech Stack Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a technology (e.g. Python) and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (tagInput.trim()) {
                            addTag(tagInput.trim());
                            setTagInput("");
                          }
                        }
                      }}
                      className="rounded-xl bg-card border-border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (tagInput.trim()) {
                          addTag(tagInput.trim());
                          setTagInput("");
                        }
                      }}
                      className="rounded-xl px-4"
                    >
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((tag, idx) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-primary/5 text-primary border border-primary/10"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(idx)}
                          className="hover:text-destructive transition animate-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {tags.length === 0 && (
                      <p className="text-xs text-muted-foreground/60 italic font-medium">No technologies added yet.</p>
                    )}
                  </div>
                </div>
              </FormSection>

              {/* Section 2: Analysis Story (Long text narrative) */}
              <FormSection
                title="Analysis Story: Narrative Foundations"
                description="Detail the business context, datasets, and pipelines."
              >
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="problemStatement" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Problem Statement</Label>
                  <Textarea
                    id="problemStatement"
                    placeholder="Describe the research, business challenge or operational bottleneck..."
                    {...form.register("problemStatement")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="datasetDescription" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Dataset Description</Label>
                  <Textarea
                    id="datasetDescription"
                    placeholder="Specify data collection sources, shapes, distributions, and feature counts..."
                    {...form.register("datasetDescription")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="methodology" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Analytics Methodology</Label>
                  <Textarea
                    id="methodology"
                    placeholder="Methodological scope, modeling packages, and analytical workflow charts..."
                    {...form.register("methodology")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="dataCleaning" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Data Cleaning & Wrangling</Label>
                  <Textarea
                    id="dataCleaning"
                    placeholder="Null value handling, outlier detection, distribution corrections..."
                    {...form.register("dataCleaning")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>
              </FormSection>

              <FormSection
                title="Analysis Story: Modeling & Deep Insights"
                description="Describe the EDA findings, ML model setup, and evaluations."
              >
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="exploratoryAnalysis" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Exploratory Data Analysis (EDA)</Label>
                  <Textarea
                    id="exploratoryAnalysis"
                    placeholder="Discoveries made during univariate / multivariate distributions, correlations, etc..."
                    {...form.register("exploratoryAnalysis")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="featureEngineering" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Feature Engineering</Label>
                  <Textarea
                    id="featureEngineering"
                    placeholder="Scalers, hot-encodings, dimension reduction techniques..."
                    {...form.register("featureEngineering")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="visualizationProcess" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Visualization Process</Label>
                  <Textarea
                    id="visualizationProcess"
                    placeholder="How charts were designed, dashboard layouts, tools (Looker Studio, Tableau)..."
                    {...form.register("visualizationProcess")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="modelDevelopment" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Model Development & Tuning</Label>
                  <Textarea
                    id="modelDevelopment"
                    placeholder="Trained algorithms (XGBoost, Random Forest), hyperparameter choices..."
                    {...form.register("modelDevelopment")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="evaluation" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Evaluation & Metrics Validation</Label>
                  <Textarea
                    id="evaluation"
                    placeholder="Confusion matrices, ROC AUC curves, accuracy, F1-scores..."
                    {...form.register("evaluation")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>
              </FormSection>

              <FormSection
                title="Analysis Story: Actionable Outputs"
                description="List final business recommendations, ROI gains, and conclusions."
              >
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="businessInsight" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Business Insights & Impact</Label>
                  <Textarea
                    id="businessInsight"
                    placeholder="What recommendations did data point to? Operational optimizations..."
                    {...form.register("businessInsight")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="recommendation" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Operational Recommendations</Label>
                  <Textarea
                    id="recommendation"
                    placeholder="List key operational steps or policy implementations suggested..."
                    {...form.register("recommendation")}
                    className="rounded-xl bg-card border-border min-h-[80px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="conclusion" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Project Conclusion</Label>
                  <Textarea
                    id="conclusion"
                    placeholder="Final take-away summary, project wrap-up..."
                    {...form.register("conclusion")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                </div>
              </FormSection>

              {/* Section 3: Dashboard Preview (Screenshot upload) */}
              <FormSection
                title="Dashboard Embed"
                description="Provide an upload screenshot of interactive reports."
              >
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Controller
                    name="dashboardScreenshot"
                    control={form.control}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        label="Dashboard Screenshot Embed"
                        description="Power BI / Tableau / Excel report export. PNG, JPG up to 4MB"
                      />
                    )}
                  />
                </div>
              </FormSection>

              {/* Media Uploads */}
              <FormSection
                title="Visual Media: Primary & Gallery Screenshots"
                description="Attach the cover thumbnail and multiple gallery preview images."
              >
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Controller
                    name="thumbnail"
                    control={form.control}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        label="Project Card Thumbnail"
                        description="PNG, JPG, JPEG up to 4MB"
                      />
                    )}
                  />
                </div>

                {/* Gallery screenshots */}
                <div className="col-span-1 md:col-span-2 space-y-4 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-bold text-sm text-foreground">Project Screenshot Gallery</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">Attach multiple screenshot images to the project.</p>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleGalleryUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl text-xs gap-1.5 font-semibold"
                    >
                      {isUploading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      Add Image
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {gallery.map((url, idx) => (
                      <div
                        key={url}
                        className="relative flex items-center justify-between p-3.5 rounded-2xl border border-border bg-card/60"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`Gallery ${idx}`}
                            className="h-10 w-16 object-cover rounded-lg border border-border bg-muted shrink-0"
                          />
                          <span className="text-[10px] font-mono font-bold text-muted-foreground truncate">
                            Image {idx + 1}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === 0}
                            onClick={() => moveGalleryImage(idx, "up")}
                            className="h-7 w-7 rounded-lg text-muted-foreground"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === gallery.length - 1}
                            onClick={() => moveGalleryImage(idx, "down")}
                            className="h-7 w-7 rounded-lg text-muted-foreground"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGalleryImage(idx)}
                            className="h-7 w-7 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {gallery.length === 0 && (
                      <p className="col-span-1 sm:col-span-2 text-xs text-muted-foreground/60 italic font-medium py-3">
                        No gallery images added yet.
                      </p>
                    )}
                  </div>
                </div>
              </FormSection>

            </div>

            <FormActions
              isPending={isPending}
              saveStatus={saveStatus}
              errorMessage={errorMessage}
              submitLabel={project ? "Save Project" : "Create Project"}
              onCancel={onCancel}
            />
          </SectionCard>
        </form>

        {/* Right Side: Sticky WYSIWYG Live Preview */}
        <div className="xl:col-span-5 xl:sticky xl:top-6">
          <ProjectPreview values={watchedValues} />
        </div>
      </div>

      <ConfirmLeaveDialog isDirty={isDirty} />
    </div>
  );
}
