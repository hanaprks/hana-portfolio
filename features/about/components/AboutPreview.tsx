"use client";

import React, { useState } from "react";
import type { AboutSchemaInput } from "../schemas";
import { AboutSection } from "./AboutSection";
import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone, Sparkles, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface AboutPreviewProps {
  values: AboutSchemaInput;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export function AboutPreview({ values }: AboutPreviewProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const deviceConfigs = {
    desktop: {
      width: 1200,
      scale: 0.36,
      height: 600,
      label: "Desktop View (1200px)",
      icon: Monitor,
    },
    tablet: {
      width: 768,
      scale: 0.55,
      height: 750,
      label: "Tablet View (768px)",
      icon: Tablet,
    },
    mobile: {
      width: 375,
      scale: 1,
      height: 600,
      label: "Mobile View (375px)",
      icon: Smartphone,
    },
  };

  const activeConfig = deviceConfigs[deviceMode];
  const calculatedMobileScale = "w-full max-w-[375px] mx-auto";

  return (
    <Card className="border-border bg-card/60 backdrop-blur-md shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
      
      {/* Device Toolbar */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-3 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <CardTitle className="text-sm font-bold text-foreground">WYSIWYG Live Preview</CardTitle>
        </div>

        {/* Device Controls */}
        <div className="flex items-center gap-1.5 bg-muted/65 p-1 rounded-xl border border-border/40">
          {(["desktop", "tablet", "mobile"] as DeviceMode[]).map((mode) => {
            const Icon = deviceConfigs[mode].icon;
            const isActive = deviceMode === mode;
            return (
              <Button
                key={mode}
                size="icon"
                variant={isActive ? "default" : "ghost"}
                onClick={() => setDeviceMode(mode)}
                className={`h-7 w-7 rounded-lg transition-all ${
                  isActive ? "shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
                title={deviceConfigs[mode].label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
          <Button
            size="icon"
            variant="ghost"
            onClick={triggerRefresh}
            className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
            title="Refresh Preview"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      {/* Browser Mockup Wrapper */}
      <CardContent className="p-6 flex-1 flex items-center justify-center bg-muted/20 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={deviceMode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full flex items-center justify-center"
          >
            {/* The Browser Window mockup */}
            <div
              className={`rounded-2xl border border-border/80 bg-background shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                deviceMode === "mobile" ? calculatedMobileScale : ""
              }`}
              style={
                deviceMode !== "mobile"
                  ? {
                      width: `${activeConfig.width}px`,
                      height: `${activeConfig.height}px`,
                      transform: `scale(${activeConfig.scale})`,
                      transformOrigin: "center center",
                      flexShrink: 0,
                    }
                  : {
                      height: `${activeConfig.height}px`,
                    }
              }
            >
              {/* Browser Window Header */}
              <div className="bg-muted border-b border-border/80 px-4 py-2.5 flex items-center gap-3 shrink-0">
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                {/* Mock Address Bar */}
                <div className="flex-1 bg-card border border-border/60 rounded-lg text-[10px] text-muted-foreground/80 py-1 text-center font-medium max-w-sm mx-auto shadow-inner truncate px-3">
                  hanaprakasita.com/about
                </div>
              </div>

              {/* Web Canvas */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-background">
                <AboutSection
                  data={values}
                  className={deviceMode === "mobile" ? "py-8" : ""}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>

      {/* Footer Info */}
      <div className="px-4 py-2 border-t border-border/50 text-[10px] text-muted-foreground font-semibold flex justify-between bg-card/40">
        <span>Active viewport: {activeConfig.label}</span>
        <span>Status: Synced</span>
      </div>

    </Card>
  );
}
