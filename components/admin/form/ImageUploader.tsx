"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  onRemove,
  label = "Upload Gambar",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(value || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar!");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onChange(objectUrl);
    toast.success("Gambar berhasil dipilih!");
  };

  const triggerSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (onRemove) onRemove();
    toast.info("Gambar dihapus.");
  };

  return (
    <div className="space-y-4">
      <span className="text-sm font-medium text-foreground block">{label}</span>
      <div className="flex items-center gap-6">
        <div className="relative h-32 w-32 rounded-2xl border bg-muted flex items-center justify-center overflow-hidden border-dashed border-muted-foreground/35">
          {preview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Upload preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow hover:bg-red-700 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground/60" />
          )}
        </div>

        <div className="space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerSelectFile}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" /> Upload file
          </Button>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, JPEG, atau GIF (Maks. 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
