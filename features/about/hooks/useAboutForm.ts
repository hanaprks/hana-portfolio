"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutSchema, type AboutSchemaInput } from "../schemas";
import { getAbout, updateAbout } from "../actions";
import { toast } from "sonner";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useAboutForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<AboutSchemaInput>({
    resolver: zodResolver(aboutSchema) as unknown as Resolver<AboutSchemaInput>,
    defaultValues: {
      title: "",
      description: "",
      education: "",
      currentFocus: "",
    },
  });

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAbout();
        if (data) {
          form.reset({
            title: data.title || "",
            description: data.description || "",
            education: data.education || "",
            currentFocus: data.currentFocus || "",
          });
        }
      } catch (error) {
        console.error("Error loading about data:", error);
        toast.error("Failed to load About data");
      } finally {
        setIsLoading(false);
      }
    }
    loadAbout();
  }, [form]);

  const onSubmit = async (values: AboutSchemaInput) => {
    setSaveStatus("saving");
    setErrorMessage("");

    startTransition(async () => {
      const res = await updateAbout(values);
      if (res.success) {
        setSaveStatus("saved");
        toast.success("About settings saved successfully!");
        form.reset(values);

        setTimeout(() => {
          setSaveStatus("idle");
        }, 3000);
      } else {
        setSaveStatus("error");
        const err = res.error || "Failed to save About settings";
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
