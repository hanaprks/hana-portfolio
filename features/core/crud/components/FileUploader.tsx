"use client";

import React, { useState, useRef } from "react";
import { FileIcon, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useUploadThing } from "@/lib/uploadthing";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  accept?: string;
}

export function FileUploader({
  value,
  onChange,
  label = "Upload CV (PDF)",
  description = "PDF up to 8MB",
  accept = ".pdf",
}: FileUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("cvPdf", {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.url;
      if (url) {
        onChange(url);
        toast.success("File uploaded successfully!");
      }
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
    onUploadError: (error) => {
      console.warn("UploadThing error, falling back to simulation:", error);
      toast.info("Using simulation mode (UploadThing token not configured).");
    },
  });

  const handleFile = async (file: File) => {
    if (accept === ".pdf" && file.type !== "application/pdf") {
      toast.error("File must be a PDF document!");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error("File size must be less than 8MB!");
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
    const mockUrl = `/uploads/mock_${Date.now()}_${file.name}`;
    onChange(mockUrl);
    toast.success(`File selected: ${file.name} (simulation mode)`);
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    toast.info("File removed");
  };

  const getFileName = (url: string) => {
    if (!url) return "";
    if (url.startsWith("data:")) return "CV_Document.pdf";
    if (url.startsWith("/uploads/mock_")) {
      return url.split("_").slice(2).join("_");
    }
    return url.substring(url.lastIndexOf("/") + 1);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          accept={accept}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/30"
            >
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Uploading document...</p>
                {uploadProgress > 0 && (
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ) : value ? (
            <motion.div
              key="file-info"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                  <FileIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {getFileName(value)}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium truncate">
                    {value.startsWith("data:") ? "Local Data URI" : "Document Attached"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={triggerInput}
                  className="rounded-xl text-xs"
                >
                  Change
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  className="rounded-xl h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={triggerInput}
                className="w-full h-24 border-2 border-dashed border-border rounded-2xl hover:bg-muted/30 hover:border-primary/30 flex flex-col gap-2 transition-all duration-300"
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Select PDF / CV File</span>
                <span className="text-xs text-muted-foreground font-medium">{description}</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
