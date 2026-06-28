"use client";

import React, { useState } from "react";
import SidebarContent from "./SidebarContent";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen relative bg-card border-r border-border transition-all duration-300 z-20 shrink-0",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Collapse Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 h-6 w-6 rounded-full border border-border bg-card shadow-sm hover:bg-muted z-30"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-muted-foreground" />
        )}
      </Button>

      {/* Sidebar Content */}
      <SidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
}
