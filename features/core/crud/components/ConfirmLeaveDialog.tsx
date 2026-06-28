"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ConfirmLeaveDialogProps {
  isDirty: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

export function ConfirmLeaveDialog({
  isDirty,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onConfirm: externalOnConfirm,
}: ConfirmLeaveDialogProps) {
  const router = useRouter();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Handle browser close/reload
  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Intercept local link clicks
  useEffect(() => {
    if (!isDirty) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        const targetAttr = anchor.getAttribute("target");
        
        // Skip external links, hashes, open in new tab, and javascript protocols
        if (
          !href || 
          href.startsWith("http") || 
          href.startsWith("#") || 
          href.startsWith("javascript:") ||
          targetAttr === "_blank"
        ) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        setNextUrl(href);
        setInternalIsOpen(true);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [isDirty]);

  const handleConfirm = () => {
    setInternalIsOpen(false);
    if (externalOnConfirm) {
      externalOnConfirm();
    }
    if (nextUrl) {
      router.push(nextUrl);
    }
  };

  const handleClose = () => {
    setInternalIsOpen(false);
    if (externalOnClose) {
      externalOnClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Unsaved Changes</DialogTitle>
          <DialogDescription>
            You have unsaved changes. If you leave now, your changes will be discarded. Are you sure you want to leave?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button variant="outline" onClick={handleClose} className="rounded-xl">
            Stay
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="rounded-xl">
            Leave
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
