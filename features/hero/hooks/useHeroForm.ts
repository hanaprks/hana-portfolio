"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroSchema, type HeroSchemaInput } from "../schemas";
import { getHero, updateHero } from "../actions";
import { toast } from "sonner";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useHeroForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<HeroSchemaInput>({
    resolver: zodResolver(heroSchema) as any,
    defaultValues: {
      headline: "",
      subHeadline: "",
      role: "",
      location: "",
      availability: "",
      yearsExperience: 0,
      projectCompleted: 0,
      github: "",
      linkedIn: "",
      instagram: "",
      email: "",
      profileImage: "",
      cvUrl: "",
    },
  });

  useEffect(() => {
    async function loadHero() {
      try {
        const data = await getHero();
        if (data) {
          form.reset({
            headline: data.headline || "",
            subHeadline: data.subHeadline || "",
            role: data.role || "",
            location: data.location || "",
            availability: data.availability || "",
            yearsExperience: data.yearsExperience ?? 0,
            projectCompleted: data.projectCompleted ?? 0,
            github: data.github || "",
            linkedIn: data.linkedIn || "",
            instagram: data.instagram || "",
            email: data.email || "",
            profileImage: data.profileImage || "",
            cvUrl: data.cvUrl || "",
          });
        }
      } catch (error) {
        console.error("Error loading hero data:", error);
        toast.error("Failed to load Hero data");
      } finally {
        setIsLoading(false);
      }
    }
    loadHero();
  }, [form]);

  const onSubmit = async (values: HeroSchemaInput) => {
    setSaveStatus("saving");
    setErrorMessage("");
    
    startTransition(async () => {
      const res = await updateHero(values);
      if (res.success) {
        setSaveStatus("saved");
        toast.success("Hero settings saved successfully!");
        form.reset(values); // reset isDirty state to false after successful save
        
        setTimeout(() => {
          setSaveStatus("idle");
        }, 3000);
      } else {
        setSaveStatus("error");
        const err = res.error || "Failed to save Hero settings";
        setErrorMessage(err);
        toast.error(err);
      }
    });
  };

  return {
    form,
    isLoading,
    saveStatus,
    errorMessage,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
