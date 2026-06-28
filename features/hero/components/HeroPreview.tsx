"use client";

import React from "react";
import type { HeroSchemaInput } from "../schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  FileDown,
  Mail,
  Sparkles,
  Trophy,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";

interface HeroPreviewProps {
  values: HeroSchemaInput;
}

export function HeroPreview({ values }: HeroPreviewProps) {
  const {
    headline,
    subHeadline,
    role,
    location,
    availability,
    yearsExperience,
    projectCompleted,
    github,
    linkedIn,
    instagram,
    email,
    profileImage,
    cvUrl,
  } = values;

  return (
    <Card className="h-full border-border bg-gradient-to-br from-card via-card/95 to-primary/5 shadow-md overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/15 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -z-10" />

      <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full space-y-8 min-h-[550px]">
        {/* Header Indicator */}
        <div className="flex justify-between items-center pb-4 border-b border-border/50">
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary animate-pulse" /> Live Portfolio Preview
          </span>
          {availability && (
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 rounded-full font-semibold px-2.5 py-0.5 text-[11px]">
              {availability}
            </Badge>
          )}
        </div>

        {/* Hero Body */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-6 my-auto">
          {/* Profile Image & Avatar */}
          <motion.div
            key={profileImage}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-violet-600 rounded-full blur opacity-30 animate-tilt" />
            <Avatar className="h-28 w-28 md:h-32 md:w-32 border-2 border-background shadow-md">
              <AvatarImage src={profileImage || undefined} className="object-cover" />
              <AvatarFallback className="text-xl font-bold bg-muted text-muted-foreground uppercase">
                {role ? role.substring(0, 2) : "HP"}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Texts */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                {role || "YOUR PROFESSIONAL ROLE"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground leading-tight truncate">
                {headline || "Build Something Beautiful"}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-3">
              {subHeadline || "Write a compelling subheadline that captures attention and summarizes your core expertise or mission."}
            </p>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 text-xs text-muted-foreground font-semibold">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Counter Stats Section */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-foreground">
              {yearsExperience}+
            </p>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
              Years Experience
            </p>
          </div>
          <div className="text-center border-l border-border/60">
            <p className="text-2xl md:text-3xl font-black text-foreground flex items-center justify-center gap-1">
              <Trophy className="h-5 w-5 text-amber-500 shrink-0 hidden sm:inline" />
              {projectCompleted}+
            </p>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
              Projects Completed
            </p>
          </div>
        </div>

        {/* Actions & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
          {/* CV Action */}
          {cvUrl ? (
            <Button
              variant="default"
              size="sm"
              className="rounded-xl w-full sm:w-auto font-semibold gap-1.5 bg-gradient-to-r from-primary to-primary/95 text-primary-foreground shadow-sm shadow-primary/10"
              asChild
            >
              <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" /> Download CV
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="rounded-xl w-full sm:w-auto font-semibold gap-1.5 opacity-60 cursor-not-allowed">
              <FileDown className="h-4 w-4" /> No CV Attached
            </Button>
          )}

          {/* Socials */}
          <div className="flex items-center gap-2">
            {email && (
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                <a href={`mailto:${email}`} title="Email">
                  <Mail className="h-4.5 w-4.5" />
                </a>
              </Button>
            )}
            {github && (
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                <a href={github} target="_blank" rel="noopener noreferrer" title="Github">
                  <FaGithub className="h-4.5 w-4.5" />
                </a>
              </Button>
            )}
            {linkedIn && (
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                <a href={linkedIn} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <FaLinkedin className="h-4.5 w-4.5" />
                </a>
              </Button>
            )}
            {instagram && (
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                <a href={instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                  <FaInstagram className="h-4.5 w-4.5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
