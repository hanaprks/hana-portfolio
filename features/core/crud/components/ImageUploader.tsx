"use client";

import React, { useState, useRef } from "react";
import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useUploadThing } from "@/lib/uploadthing";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Profile Image",
  description = "PNG, JPG, JPEG up to 4MB",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("profileImage", {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.url;
      if (url) {
        onChange(url);
        toast.success("Image uploaded successfully!");
      }
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
    onUploadError: (error) => {
      console.warn("UploadThing error, falling back to local preview:", error);
      toast.info("Using simulation mode (UploadThing token not configured).");
    },
  });

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image!");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("File size must be less than 4MB!");
      return;
    }

    try {
      const uploadResult = await startUpload([file]);
      if (!uploadResult) {
        simulateLocalUpload(file);
      }
    } catch {
      simulateLocalUpload(file);
    }
  };

  const simulateLocalUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
        toast.success("Image updated (simulation mode)");
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    toast.info("Image removed");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={triggerInput}
        className={`relative h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5"
            : value
            ? "border-border bg-muted/10 hover:border-primary/20"
            : "border-border bg-muted/20 hover:bg-muted/30 hover:border-primary/30"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          accept="image/*"
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-sm font-semibold">Uploading image...</span>
              {uploadProgress > 0 && (
                <span className="text-xs text-muted-foreground font-medium">
                  {uploadProgress}%
                </span>
              )}
            </motion.div>
          ) : value ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-full group flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Profile Preview"
                className="h-full w-auto max-w-full rounded-xl object-contain shadow-sm border border-border bg-background"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 rounded-xl transition-opacity duration-200">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={triggerInput}
                  className="rounded-xl flex items-center gap-1.5"
                >
                  <Upload className="h-4 w-4" /> Replace
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className="rounded-xl flex items-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="p-3 bg-muted rounded-full text-muted-foreground mb-1">
                <ImageIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">Click to upload or drag & drop</span>
              <span className="text-xs text-muted-foreground font-medium">{description}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
