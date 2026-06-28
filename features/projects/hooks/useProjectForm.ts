"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectSchemaInput } from "../schemas";
import { createProject, updateProject } from "../actions";
import { toast } from "sonner";
import type { ProjectData } from "../types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface UseProjectFormProps {
  project: ProjectData | null;
  onSuccess: () => void;
}

export function useProjectForm({ project, onSuccess }: UseProjectFormProps) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const [tags, setTags] = useState<string[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);

  const form = useForm<ProjectSchemaInput>({
    resolver: zodResolver(projectSchema) as unknown as Resolver<ProjectSchemaInput>,
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      thumbnail: "",
      github: "",
      demo: "",
      figma: "",
      techStack: "",
      featured: false,
      status: "DRAFT",
      gallery: [],
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title || "",
        slug: project.slug || "",
        description: project.description || "",
        thumbnail: project.thumbnail || "",
        github: project.github || "",
        demo: project.demo || "",
        figma: project.figma || "",
        techStack: project.techStack || "",
        featured: project.featured ?? false,
        status: project.status || "DRAFT",
        gallery: project.gallery || [],
      });
      if (project.techStack) {
        setTags(project.techStack.split(",").map((t) => t.trim()).filter(Boolean));
      } else {
        setTags([]);
      }
      setGallery(project.gallery || []);
    } else {
      form.reset({
        title: "",
        slug: "",
        description: "",
        thumbnail: "",
        github: "",
        demo: "",
        figma: "",
        techStack: "",
        featured: false,
        status: "DRAFT",
        gallery: [],
      });
      setTags([]);
      setGallery([]);
    }
  }, [project, form]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const titleValue = form.watch("title");
  useEffect(() => {
    if (!project && titleValue) {
      const autoSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", autoSlug, { shouldValidate: true });
    }
  }, [titleValue, project, form]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    const newTags = [...tags, trimmed];
    setTags(newTags);
    form.setValue("techStack", newTags.join(", "), { shouldDirty: true });
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    form.setValue("techStack", newTags.join(", "), { shouldDirty: true });
  };

  const addGalleryImage = (url: string) => {
    if (!url || gallery.includes(url)) return;
    const newGallery = [...gallery, url];
    setGallery(newGallery);
    form.setValue("gallery", newGallery, { shouldDirty: true });
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
    form.setValue("gallery", newGallery, { shouldDirty: true });
  };

  const moveGalleryImage = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;

    const newGallery = [...gallery];
    const temp = newGallery[index];
    newGallery[index] = newGallery[targetIndex];
    newGallery[targetIndex] = temp;

    setGallery(newGallery);
    form.setValue("gallery", newGallery, { shouldDirty: true });
  };

  const onSubmit = async (values: ProjectSchemaInput) => {
    setSaveStatus("saving");
    setErrorMessage("");

    startTransition(async () => {
      let res;
      if (project) {
        res = await updateProject(project.id, values);
      } else {
        res = await createProject(values);
      }

      if (res.success) {
        setSaveStatus("saved");
        toast.success(
          project ? "Project updated successfully!" : "Project created successfully!"
        );
        form.reset(values);
        onSuccess();
        setTimeout(() => setSaveStatus("idle"), 2500);
      } else {
        setSaveStatus("error");
        const err = res.error || "Failed to save project settings";
        setErrorMessage(err);
        toast.error(err);
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
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
  };
}
