"use client";

import React, { useState } from "react";
import { LucideIcon } from "./LucideIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SkillIconPickerProps {
  value: string;
  onChange: (val: string) => void;
}

const COMMON_DEVELOPER_ICONS = [
  "Code", "Terminal", "Cpu", "Database", "Server", "Globe", "Cloud", "Laptop",
  "Smartphone", "Figma", "Chrome", "GitBranch", "Activity", "Shield", "Workflow",
  "Hash", "Braces", "Box", "Key", "Lock", "Settings", "Wrench", "Tool", "Compass",
  "Layers", "Layout", "AppWindow", "FileJson", "Search", "Image", "BookOpen",
  "Heart", "Star", "Trophy", "Users", "Award", "Briefcase", "Clock", "FileCode",
  "Folder", "FolderCheck", "Gauge", "GitCommit", "GitPullRequest", "Hammer",
  "Lightbulb", "Link", "List", "MapPin", "MessageSquare", "Monitor", "MousePointer",
  "Network", "Package", "Palette", "PenTool", "Play", "Puzzle", "Radio", "Scale",
  "Send", "Share2", "Sliders", "Sparkles", "Split", "Tag", "ThumbsUp", "Trash2",
  "User", "Zap"
];

export function SkillIconPicker({ value, onChange }: SkillIconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = COMMON_DEVELOPER_ICONS.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl border border-border bg-card flex items-center justify-center text-primary shrink-0 shadow-sm">
          <LucideIcon name={value || "HelpCircle"} className="h-5 w-5" />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="rounded-xl font-semibold text-xs animate-none"
        >
          {value ? `Selected: ${value}` : "Pick Icon..."}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-2xl p-6 bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Pick an Icon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl bg-muted/30 border-border"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-6 gap-2 max-h-[250px] overflow-y-auto p-1 scrollbar-thin">
              {filteredIcons.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all hover:bg-primary/5 hover:border-primary/30 ${
                    value === name
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                  title={name}
                >
                  <LucideIcon name={name} className="h-5 w-5 animate-none" />
                  <span className="text-[9px] mt-1.5 truncate w-full text-center font-medium">
                    {name}
                  </span>
                </button>
              ))}
              {filteredIcons.length === 0 && (
                <p className="col-span-6 text-center text-xs text-muted-foreground py-6">
                  No icons found.
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
