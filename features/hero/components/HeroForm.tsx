"use client";

import React from "react";
import { useHeroForm } from "../hooks/useHeroForm";
import { HeroPreview } from "./HeroPreview";
import {
  SectionCard,
  FormSection,
  FormActions,
  ImageUploader,
  FileUploader,
  ConfirmLeaveDialog,
  FormStatus,
  LoadingState,
  PageTitle,
  PageDescription,
} from "@/features/core/crud/components";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

export function HeroForm() {
  const { form, isLoading, saveStatus, errorMessage, isPending, onSubmit } =
    useHeroForm();

  // Watch form values for real-time live preview
  const watchedValues = form.watch();

  if (isLoading) {
    return <LoadingState rows={5} />;
  }

  const { isDirty } = form.formState;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <PageTitle>Hero Settings</PageTitle>
        <PageDescription>
          Configure the intro section of your portfolio. This information appears above the fold on your main page.
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
            title="Hero Information"
            description="Manage your introduction, credentials, social channels, and media files."
          >
            <div className="space-y-8">
              {/* Basic Section */}
              <FormSection
                title="Basic Information"
                description="Core titles and introduction summary for your hero banner."
              >
                <div className="space-y-2">
                  <Label htmlFor="headline" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Headline *</Label>
                  <Input
                    id="headline"
                    placeholder="e.g. Building elegant digital experiences"
                    {...form.register("headline")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.headline && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.headline.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Role *</Label>
                  <Input
                    id="role"
                    placeholder="e.g. Software Engineer & Designer"
                    {...form.register("role")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.role && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.role.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="subHeadline" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Subheadline *</Label>
                  <Textarea
                    id="subHeadline"
                    placeholder="e.g. I design and build highly performant full-stack web applications with modern technologies."
                    {...form.register("subHeadline")}
                    className="rounded-xl bg-card border-border min-h-[100px] resize-y"
                  />
                  {form.formState.errors.subHeadline && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.subHeadline.message}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Personal Details */}
              <FormSection
                title="Personal & Professional Details"
                description="Your availability status, current location, and statistics counter."
              >
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Jakarta, Indonesia"
                    {...form.register("location")}
                    className="rounded-xl bg-card border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Availability</Label>
                  <Input
                    id="availability"
                    placeholder="e.g. Available for Freelance / Fulltime"
                    {...form.register("availability")}
                    className="rounded-xl bg-card border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsExperience" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Years Experience</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    {...form.register("yearsExperience")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.yearsExperience && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.yearsExperience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectCompleted" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Projects Completed</Label>
                  <Input
                    id="projectCompleted"
                    type="number"
                    {...form.register("projectCompleted")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.projectCompleted && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.projectCompleted.message}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Social Channels */}
              <FormSection
                title="Socials & Contact Links"
                description="Social profiles URLs and contact email to display in the hero banner."
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    placeholder="e.g. contact@example.com"
                    {...form.register("email")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">GitHub URL</Label>
                  <Input
                    id="github"
                    placeholder="e.g. https://github.com/username"
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
                  <Label htmlFor="linkedIn" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">LinkedIn URL</Label>
                  <Input
                    id="linkedIn"
                    placeholder="e.g. https://linkedin.com/in/username"
                    {...form.register("linkedIn")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.linkedIn && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.linkedIn.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Instagram URL</Label>
                  <Input
                    id="instagram"
                    placeholder="e.g. https://instagram.com/username"
                    {...form.register("instagram")}
                    className="rounded-xl bg-card border-border"
                  />
                  {form.formState.errors.instagram && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.instagram.message}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Uploads Section */}
              <FormSection
                title="Media & Documents"
                description="Profile image and CV document upload (stored on UploadThing)."
              >
                <div className="space-y-2">
                  <Controller
                    name="profileImage"
                    control={form.control}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        label="Profile Image"
                        description="PNG, JPG, JPEG up to 4MB"
                      />
                    )}
                  />
                  {form.formState.errors.profileImage && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.profileImage.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Controller
                    name="cvUrl"
                    control={form.control}
                    render={({ field }) => (
                      <FileUploader
                        value={field.value}
                        onChange={field.onChange}
                        label="CV PDF"
                        description="PDF document up to 8MB"
                      />
                    )}
                  />
                  {form.formState.errors.cvUrl && (
                    <p className="text-xs text-destructive font-semibold mt-1">
                      {form.formState.errors.cvUrl.message}
                    </p>
                  )}
                </div>
              </FormSection>
            </div>

            <FormActions
              isPending={isPending}
              saveStatus={saveStatus}
              errorMessage={errorMessage}
              submitLabel="Save Settings"
            />
          </SectionCard>
        </form>

        {/* Right Side: Sticky Live Preview */}
        <div className="xl:col-span-5 xl:sticky xl:top-6">
          <HeroPreview values={watchedValues} />
        </div>
      </div>

      {/* Unsaved changes Dialog */}
      <ConfirmLeaveDialog isDirty={isDirty} />
    </div>
  );
}
