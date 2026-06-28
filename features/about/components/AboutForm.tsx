"use client";

import React from "react";
import { useAboutForm } from "../hooks/useAboutForm";
import { AboutPreview } from "./AboutPreview";
import {
  SectionCard,
  FormSection,
  FormActions,
  ConfirmLeaveDialog,
  FormStatus,
  LoadingState,
  PageTitle,
  PageDescription,
} from "@/features/core/crud/components";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function AboutForm() {
  const { form, isLoading, saveStatus, errorMessage, isPending, onSubmit } =
    useAboutForm();

  const watchedValues = form.watch();

  if (isLoading) {
    return <LoadingState rows={4} />;
  }

  const { isDirty } = form.formState;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <PageTitle>About Settings</PageTitle>
        <PageDescription>
          Configure the about section of your portfolio. Share your background, education history, and what you are focused on right now.
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
            title="About Information"
            description="Manage your professional background details and credentials."
          >
            <div className="space-y-8">
              {/* Basic Section */}
              <FormSection
                title="Basic Information"
                description="Core title and description detailing your story."
              >
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="title" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Crafting experiences with code and design."
                    {...form.register("title")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.title && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="description" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your background, skills, and values..."
                    {...form.register("description")}
                    className="rounded-xl bg-card border-border min-h-[160px] resize-y"
                  />
                  {form.formState.errors.description && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Additional Details */}
              <FormSection
                title="Academic & Active Focus"
                description="Your academic achievements and current technical areas of interest."
              >
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="education" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Education</Label>
                  <Textarea
                    id="education"
                    placeholder="e.g. B.S. in Computer Science - University Name&#10;Google UX Design Certificate"
                    {...form.register("education")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="currentFocus" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Current Focus</Label>
                  <Textarea
                    id="currentFocus"
                    placeholder="e.g. Building micro-frontend frameworks, exploring AI agent coding platforms, and optimizing Tailwind performance."
                    {...form.register("currentFocus")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                </div>
              </FormSection>
            </div>

            <FormActions
              isPending={isPending}
              saveStatus={saveStatus}
              errorMessage={errorMessage}
              submitLabel="Save About Settings"
            />
          </SectionCard>
        </form>

        {/* Right Side: Sticky Live Preview */}
        <div className="xl:col-span-5 xl:sticky xl:top-6">
          <AboutPreview values={watchedValues} />
        </div>
      </div>

      {/* Unsaved changes Dialog */}
      <ConfirmLeaveDialog isDirty={isDirty} />
    </div>
  );
}
