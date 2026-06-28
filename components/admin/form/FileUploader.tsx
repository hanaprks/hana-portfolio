"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { File as FileIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  accept?: string;
}

export default function FileUploader({
  value,
  onChange,
  onRemove,
  label = "Upload File",
  accept = ".pdf,.doc,.docx",
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(value ? value.substring(value.lastIndexOf("/") + 1) : "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const objectUrl = URL.createObjectURL(file);
    onChange(objectUrl);
    toast.success("File berhasil dipilih!");
  };

  const triggerSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setFileName("");
    onChange("");
    if (onRemove) onRemove();
    toast.info("File dihapus.");
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-foreground block">{label}</span>
      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={triggerSelectFile}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" /> Pilih File
        </Button>
        {fileName && (
          <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-1.5 text-sm max-w-xs truncate">
            <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{fileName}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Mendukung format PDF atau DOC hingga 10MB
      </p>
    </div>
  );
}
