"use client";

import React from "react";
import type { HeroSchemaInput } from "../schemas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  FileDown,
  Mail,
  Sparkles,
  ArrowRight,
  Briefcase,
  Code,
  Award,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  data: HeroSchemaInput;
  name?: string;
  className?: string;
}

export function HeroSection({
  data,
  name = "Hana Prakasita",
  className,
}: HeroSectionProps) {
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
  } = data;

  // Floating animation variants for decorative items
  const floatAnimation = (delay: number) => ({
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
        delay,
      },
    },
  });

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden bg-background text-foreground select-none",
        className
      )}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary-10),transparent_50%)]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/10 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Copywriting & Actions */}
        <div className="lg:col-span-7 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Availability & Location Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            {availability && (
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 rounded-full font-semibold px-3 py-1 flex items-center gap-1.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {availability}
              </Badge>
            )}
            {location && (
              <Badge
                variant="outline"
                className="bg-muted text-muted-foreground border-border rounded-full font-semibold px-3 py-1 flex items-center gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {location}
              </Badge>
            )}
          </div>

          {/* Greeting & Main Headline */}
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-sm md:text-base font-bold tracking-widest text-primary uppercase flex items-center justify-center lg:justify-start gap-2">
              <Sparkles className="h-4 w-4 animate-pulse" />
              HI, I&apos;M {name.toUpperCase()}
            </h3>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] bg-gradient-to-r from-foreground via-foreground/95 to-foreground/80 bg-clip-text">
              {headline || "Let's build the future of software."}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
              {subHeadline || "A specialized role summary showcasing engineering expertise, custom design solutions, and core technical competencies."}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {cvUrl ? (
              <Button
                variant="default"
                size="lg"
                className="rounded-xl w-full sm:w-auto font-semibold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                asChild
              >
                <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="h-5 w-5" /> Download CV
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="lg" className="rounded-xl w-full sm:w-auto font-semibold gap-2 opacity-65 cursor-not-allowed">
                <FileDown className="h-5 w-5" /> CV Not Available
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              className="rounded-xl w-full sm:w-auto font-semibold gap-2 border-border bg-card/50 hover:bg-muted backdrop-blur-sm"
              asChild
            >
              <a href="#contact">
                {"Let's Talk"} <ArrowRight className="h-4 w-4 text-primary" />
              </a>
            </Button>
          </div>

          {/* Statistics Section with Premium Styling */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md pt-4">
            <Card className="border-border bg-card/40 backdrop-blur-md shadow-sm hover:border-primary/20 hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-foreground">{yearsExperience}+</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Years Exp</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/40 backdrop-blur-md shadow-sm hover:border-primary/20 hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shrink-0">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-foreground">{projectCompleted}+</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Projects Done</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            {email && (
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 border-border bg-card/30 backdrop-blur-sm transition-all"
                asChild
              >
                <a href={`mailto:${email}`} title="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            )}
            {github && (
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 border-border bg-card/30 backdrop-blur-sm transition-all"
                asChild
              >
                <a href={github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <FaGithub className="h-5 w-5" />
                </a>
              </Button>
            )}
            {linkedIn && (
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 border-border bg-card/30 backdrop-blur-sm transition-all"
                asChild
              >
                <a href={linkedIn} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {instagram && (
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 border-border bg-card/30 backdrop-blur-sm transition-all"
                asChild
              >
                <a href={instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Decorative Profile Composition */}
        <div className="lg:col-span-5 flex justify-center relative">
          
          {/* Main Glow Backdrop */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-primary to-violet-600 opacity-20 blur-3xl" />
          
          {/* Image Container with premium frame & shadows */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-violet-600/20 rounded-3xl blur" />
            <Avatar className="w-full h-full rounded-3xl border-2 border-border/80 shadow-2xl overflow-hidden bg-muted/40 backdrop-blur-sm">
              <AvatarImage
                src={profileImage || undefined}
                alt={name}
                className="object-cover w-full h-full scale-105 transition-transform duration-500 hover:scale-100"
              />
              <AvatarFallback className="text-4xl font-extrabold text-muted-foreground bg-muted flex items-center justify-center">
                {role ? role.substring(0, 2).toUpperCase() : "HP"}
              </AvatarFallback>
            </Avatar>

            {/* Floating Element 1: Active Role Badge */}
            {role && (
              <motion.div
                variants={floatAnimation(0.2)}
                initial="initial"
                animate="animate"
                className="absolute -top-4 -left-6 bg-card/80 border border-border backdrop-blur-md rounded-2xl p-3 shadow-lg flex items-center gap-2.5 max-w-[180px]"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">Role</p>
                  <p className="text-xs font-bold text-foreground truncate mt-0.5">{role}</p>
                </div>
              </motion.div>
            )}

            {/* Floating Element 2: Tech Accent Badge */}
            <motion.div
              variants={floatAnimation(1.8)}
              initial="initial"
              animate="animate"
              className="absolute -bottom-6 -right-4 bg-card/80 border border-border backdrop-blur-md rounded-2xl p-3 shadow-lg flex items-center gap-2.5"
            >
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">Focus</p>
                <p className="text-xs font-bold text-foreground mt-0.5">High Quality UI</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
