"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, type SkillSchemaInput } from "../schemas";
import { getSkills, createSkill, updateSkill, deleteSkill, updateSkillsOrder } from "../actions";
import { toast } from "sonner";
import type { SkillData } from "../types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useSkillsForm() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<SkillData | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const form = useForm<SkillSchemaInput>({
    resolver: zodResolver(skillSchema) as unknown as Resolver<SkillSchemaInput>,
    defaultValues: {
      name: "",
      category: "Frontend",
      level: 80,
      icon: "Code",
      sortOrder: 0,
    },
  });

  // Helper to refresh skills list (called after mutations)
  const refreshSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data as SkillData[]);
    } catch (error) {
      console.error("Error refreshing skills:", error);
      toast.error("Failed to load skills");
    }
  };

  // Initial data load
  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await getSkills();
        if (isMounted) {
          setSkills(data as SkillData[]);
        }
      } catch (error) {
        console.error("Error loading skills:", error);
        if (isMounted) {
          toast.error("Failed to load skills");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = (skill: SkillData) => {
    setActiveSkill(skill);
    form.reset({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon || "Code",
      sortOrder: skill.sortOrder,
    });
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setActiveSkill(null);
    form.reset({
      name: "",
      category: "Frontend",
      level: 80,
      icon: "Code",
      sortOrder: 0,
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setActiveSkill(null);
    form.reset();
  };

  const onSubmit = async (values: SkillSchemaInput) => {
    setSaveStatus("saving");
    setErrorMessage("");

    startTransition(async () => {
      let res;
      if (activeSkill) {
        res = await updateSkill(activeSkill.id, values);
      } else {
        res = await createSkill(values);
      }

      if (res.success) {
        setSaveStatus("saved");
        toast.success(
          activeSkill ? "Skill updated successfully!" : "Skill created successfully!"
        );
        handleCloseForm();
        await refreshSkills();

        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      } else {
        setSaveStatus("error");
        const err = ("error" in res ? (res as { error?: string }).error : null) || "Failed to save skill";
        setErrorMessage(err);
        toast.error(err);
      }
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      const res = await deleteSkill(deleteId);
      if (res.success) {
        toast.success("Skill deleted successfully!");
        setDeleteId(null);
        await refreshSkills();
      } else {
        const err = ("error" in res ? (res as { error?: string }).error : null) || "Failed to delete skill";
        toast.error(err);
      }
    });
  };

  const handleReorder = async (newSkills: SkillData[]) => {
    setSkills(newSkills);

    const idOrders = newSkills.map((skill, index) => ({
      id: skill.id,
      sortOrder: index,
    }));

    const res = await updateSkillsOrder(idOrders);
    if (!res.success) {
      const err = ("error" in res ? (res as { error?: string }).error : null) || "Failed to save new sorting order";
      toast.error(err);
      await refreshSkills();
    }
  };

  return {
    skills,
    isLoading,
    isFormOpen,
    activeSkill,
    saveStatus,
    errorMessage,
    isPending,
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleEdit,
    handleAdd,
    handleCloseForm,
    deleteId,
    setDeleteId,
    handleDeleteConfirm,
    handleReorder,
  };
}
