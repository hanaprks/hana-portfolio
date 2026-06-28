import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { SaveIndicator, type SaveStatus } from "./SaveIndicator";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  isPending: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
  saveStatus?: SaveStatus;
  errorMessage?: string;
}

export function FormActions({
  isPending,
  onCancel,
  submitLabel = "Save Changes",
  cancelLabel = "Cancel",
  className,
  saveStatus = "idle",
  errorMessage,
}: FormActionsProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3 pt-6 border-t mt-8", className)}>
      <div className="flex items-center gap-2">
        {saveStatus !== "idle" && (
          <SaveIndicator status={saveStatus} errorMessage={errorMessage} />
        )}
      </div>
      <div className="flex items-center gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl px-5 hover:bg-muted"
          >
            {cancelLabel}
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={isPending}
          className="rounded-xl px-6 font-semibold shadow-sm shadow-primary/20 flex items-center gap-2"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
