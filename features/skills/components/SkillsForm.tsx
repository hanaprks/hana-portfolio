"use client";

import React from "react";
import { useSkillsForm } from "../hooks/useSkillsForm";
import { SkillPreview } from "./SkillPreview";
import { SkillIconPicker } from "./SkillIconPicker";
import { LucideIcon } from "./LucideIcon";
import {
  SectionCard,
  FormSection,
  FormActions,
  DeleteDialog,
  FormStatus,
  LoadingState,
  PageTitle,
  PageDescription,
  ActionButton,
  EmptyState,
} from "@/features/core/crud/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { GripVertical, Plus, Pencil, Trash, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import type { SkillData } from "../types";

const CATEGORY_OPTIONS = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "Mobile",
  "Design",
  "Tools",
  "Other",
];

export function SkillsForm() {
  const {
    skills,
    isLoading,
    isFormOpen,
    activeSkill,
    saveStatus,
    errorMessage,
    isPending,
    form,
    onSubmit,
    handleEdit,
    handleAdd,
    handleCloseForm,
    deleteId,
    setDeleteId,
    handleDeleteConfirm,
    handleReorder,
  } = useSkillsForm();

  // Watch form values for real-time live preview
  const watchedValues = form.watch();

  if (isLoading) {
    return <LoadingState rows={4} />;
  }

  // Construct optimistic live preview list
  let previewSkills = [...skills];
  if (isFormOpen) {
    if (activeSkill) {
      previewSkills = skills.map((s) =>
        s.id === activeSkill.id
          ? ({ ...s, ...watchedValues } as unknown as SkillData)
          : s
      );
    } else {
      // Only show mock if name is at least partially filled
      if (watchedValues.name) {
        previewSkills = [
          ...skills,
          {
            id: "temp-new-skill",
            ...watchedValues,
          } as unknown as SkillData,
        ];
      }
    }
  }

  // Native HTML5 Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    const updatedList = Array.from(skills);
    const [removed] = updatedList.splice(sourceIndex, 1);
    updatedList.splice(targetIndex, 0, removed);
    
    handleReorder(updatedList);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <PageTitle>Skills Settings</PageTitle>
        <PageDescription>
          Manage your programming languages, frameworks, and developer tools. Organize categories and sort items.
        </PageDescription>
      </div>

      <FormStatus
        type={saveStatus === "error" ? "error" : null}
        message={errorMessage}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Side: Skills Management */}
        <div className="xl:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {isFormOpen ? (
              <motion.div
                key="form-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={onSubmit}>
                  <SectionCard
                    title={activeSkill ? "Edit Skill" : "Add New Skill"}
                    description="Configure skill metadata, competence level, and Lucide representation."
                    action={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleCloseForm}
                        className="h-8 w-8 rounded-xl"
                      >
                        <X className="h-4.5 w-4.5" />
                      </Button>
                    }
                  >
                    <div className="space-y-6">
                      <FormSection
                        title="Skill Details"
                        description="Identify the name, category and proficiency level."
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Skill Name *</Label>
                          <Input
                            id="name"
                            placeholder="e.g. Next.js, Docker, Figma"
                            {...form.register("name")}
                            className="rounded-xl bg-card border-border"
                          />
                          {form.formState.errors.name && (
                            <p className="text-xs text-destructive font-semibold mt-1">
                              {form.formState.errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Category *</Label>
                          <select
                            id="category"
                            {...form.register("category")}
                            className="flex h-9 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          >
                            {CATEGORY_OPTIONS.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          {form.formState.errors.category && (
                            <p className="text-xs text-destructive font-semibold mt-1">
                              {form.formState.errors.category.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                          <Label htmlFor="level" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Proficiency Level ({form.watch("level")}%)</Label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              id="level"
                              {...form.register("level")}
                              className="h-2 w-full rounded-lg bg-muted accent-primary cursor-pointer border-none"
                            />
                            <span className="text-xs font-mono font-bold bg-primary/5 border border-primary/15 rounded-md px-2 py-1 min-w-[45px] text-center text-primary leading-none">
                              {form.watch("level")}%
                            </span>
                          </div>
                          {form.formState.errors.level && (
                            <p className="text-xs text-destructive font-semibold mt-1">
                              {form.formState.errors.level.message}
                            </p>
                          )}
                        </div>
                      </FormSection>

                      <FormSection
                        title="Skill Representation"
                        description="Choose a Lucide icon for frontend display."
                      >
                        <div className="col-span-1 md:col-span-2 space-y-2">
                          <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Lucide Icon</Label>
                          <Controller
                            name="icon"
                            control={form.control}
                            render={({ field }) => (
                              <SkillIconPicker
                                value={field.value || "Code"}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                      </FormSection>
                    </div>

                    <FormActions
                      isPending={isPending}
                      saveStatus={saveStatus}
                      errorMessage={errorMessage}
                      submitLabel={activeSkill ? "Save Changes" : "Create Skill"}
                      onCancel={handleCloseForm}
                    />
                  </SectionCard>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="list-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <SectionCard
                  title="Skills List"
                  description="List of skills. Drag the handle to reorder."
                  action={
                    <ActionButton
                      type="button"
                      icon={Plus}
                      onClick={handleAdd}
                      className="text-xs font-bold"
                    >
                      Add Skill
                    </ActionButton>
                  }
                >
                  {skills.length === 0 ? (
                    <EmptyState
                      title="No skills added yet"
                      description="Create your first skill card using the Add Skill button."
                      onAction={handleAdd}
                      actionLabel="Create Skill"
                    />
                  ) : (
                    <div className="space-y-2.5">
                      {skills.map((skill, index) => (
                        <div
                          key={skill.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className="flex items-center justify-between p-3.5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/10 transition-colors duration-250 cursor-grab active:cursor-grabbing group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Drag Handle Icon */}
                            <GripVertical className="h-4.5 w-4.5 text-muted-foreground/60 group-hover:text-primary shrink-0 transition-colors" />
                            
                            {/* Icon Display */}
                            <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/80 shrink-0 border border-primary/5">
                              <LucideIcon name={skill.icon || "HelpCircle"} className="h-4.5 w-4.5" />
                            </div>

                            {/* Name & Category Info */}
                            <div className="min-w-0">
                              <span className="font-bold text-sm text-foreground truncate block leading-tight">
                                {skill.name}
                              </span>
                              <Badge variant="outline" className="text-[10px] mt-1 font-semibold px-2 py-0 bg-muted/30">
                                {skill.category}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Level display */}
                            <span className="text-xs font-mono font-bold text-muted-foreground">
                              {skill.level}%
                            </span>

                            {/* Actions */}
                            <div className="flex items-center gap-1 shrink-0">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleEdit(skill)}
                                className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground"
                                title="Edit Skill"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setDeleteId(skill.id)}
                                className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                                title="Delete Skill"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </SectionCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Sticky WYSIWYG Preview */}
        <div className="xl:col-span-5 xl:sticky xl:top-6">
          <SkillPreview skills={previewSkills} />
        </div>
      </div>

      {/* Delete Confirmation */}
      <DeleteDialog
        isOpen={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        itemName="this skill"
        onConfirm={handleDeleteConfirm}
        isPending={isPending}
      />
    </div>
  );
}
