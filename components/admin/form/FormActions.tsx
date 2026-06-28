import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isPending: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
}

export default function FormActions({
  isPending,
  onCancel,
  submitLabel = "Simpan Perubahan",
  cancelLabel = "Batal",
  className = "",
}: FormActionsProps) {
  return (
    <div className={`flex items-center justify-end gap-3 pt-6 border-t mt-6 ${className}`}>
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          {cancelLabel}
        </Button>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </div>
  );
}
