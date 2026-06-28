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

  // Watch form values for real-time live preview
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
            title="Project Information"
            description="Details about your project engineering scope, stack and repository links."
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
              
              {/* Basic Section */}
              <FormSection
                title="Basic Metadata"
                description="Core naming and URL parameters."
              >
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. E-Commerce Platform"
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
                    placeholder="e.g. e-commerce-platform"
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
                  <Label htmlFor="description" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a description of the project, features, challenges, and goals..."
                    {...form.register("description")}
                    className="rounded-xl bg-card border-border min-h-[120px] resize-y"
                  />
                  {form.formState.errors.description && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Status and Visibility Settings */}
              <FormSection
                title="Visibility & Status"
                description="Status categorization and featured settings."
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
                    <p className="text-xs text-muted-foreground font-medium">Pin this project at the top of your homepage.</p>
                  </div>
                  <input
                    type="checkbox"
                    id="featured"
                    {...form.register("featured")}
                    className="h-4.5 w-4.5 rounded border-border bg-card accent-primary text-primary focus:ring-0 cursor-pointer"
                  />
                </div>
              </FormSection>

              {/* Link settings */}
              <FormSection
                title="Project Links"
                description="Repository and demo URLs."
              >
                <div className="space-y-2">
                  <Label htmlFor="github" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">GitHub URL</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/username/project"
                    {...form.register("github")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.github && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.github.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Live Demo URL</Label>
                  <Input
                    id="demo"
                    placeholder="https://project-demo.com"
                    {...form.register("demo")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.demo && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.demo.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="figma" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Figma board URL</Label>
                  <Input
                    id="figma"
                    placeholder="https://figma.com/file/..."
                    {...form.register("figma")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.figma && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.figma.message}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Tech Stack Chip Input */}
              <FormSection
                title="Tech Stack"
                description="Tags representing the technologies used."
              >
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Technologies</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a technology (e.g. Next.js) and press Enter"
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

                  {/* Chips Container */}
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
                          className="hover:text-destructive transition"
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

              {/* Media Uploads */}
              <FormSection
                title="Project Media"
                description="Upload the main thumbnail and supplementary gallery images."
              >
                {/* Thumbnail image uploader */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Controller
                    name="thumbnail"
                    control={form.control}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        label="Project Thumbnail"
                        description="PNG, JPG, JPEG up to 4MB"
                      />
                    )}
                  />
                </div>

                {/* Multiple image gallery uploader */}
                <div className="col-span-1 md:col-span-2 space-y-4 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-bold text-sm text-foreground">Project Gallery</Label>
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

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {gallery.map((url, idx) => (
                      <div
                        key={url}
                        className="relative flex items-center justify-between p-3.5 rounded-2xl border border-border bg-card/60"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Thumbnail preview */}
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

                        {/* Order & Delete buttons */}
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

      {/* Unsaved changes prompt */}
      <ConfirmLeaveDialog isDirty={isDirty} />
    </div>
  );
}
