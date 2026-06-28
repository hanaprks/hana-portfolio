"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemName?: string;
  isPending?: boolean;
}

export function DeleteDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  itemName = "this item",
  isPending = false,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 mb-4">
            <Trash2 className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-xl font-bold">
            Delete {itemName}?
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete {itemName}? This action cannot be undone and will permanently remove this data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-xl flex items-center gap-1.5"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
