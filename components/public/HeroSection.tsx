"use client";

import React from "react";
import { ArrowDown, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";

interface HeroData {
  headline: string;
  subHeadline: string;
  role: string;
  profileImage: string | null;
  cvUrl: string | null;
  availability: string | null;
  location: string | null;
  yearsExperience: number;
  projectCompleted: number;
  github: string | null;
  linkedIn: string | null;
  instagram: string | null;
  email: string | null;
}

interface HeroSectionProps {
  data: HeroData | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) return null;

  const {
    headline,
    subHeadline,
    role,
    profileImage,
    cvUrl,
    availability,
    location,
    yearsExperience,
    projectCompleted,
    github,
    linkedIn,
    instagram,
    email,
  } = data;

  const socialLinks = [
    { url: github, icon: FaGithub, label: "GitHub" },
    { url: linkedIn, icon: FaLinkedin, label: "LinkedIn" },
    { url: instagram, icon: FaInstagram, label: "Instagram" },
    { url: email ? `mailto:${email}` : null, icon: Mail, label: "Email" },
  ].filter((link) => link.url);

  return (
    <section
      id="home"
      className="min-h-screen pt-28 md:pt-36 pb-20 flex items-center bg-background relative overflow-hidden"
    >
      {/* Editorial Grid Backlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex justify-between px-6 md:px-12 max-w-6xl mx-auto">
        <div className="w-px h-full bg-foreground" />
        <div className="w-px h-full bg-foreground hidden md:block" />
        <div className="w-px h-full bg-foreground hidden lg:block" />
        <div className="w-px h-full bg-foreground" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10"
      >
        
        {/* Left Column: Metadata & Hero CTA */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Availability badge */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            {availability && (
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 rounded-full font-bold px-3 py-1 flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                {availability}
              </Badge>
            )}
            {location && (
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {location}
              </span>
            )}
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-xs font-black uppercase tracking-widest text-primary font-mono">
              [ {role} ]
            </motion.h2>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9] uppercase"
            >
              {headline}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground max-w-xl font-medium leading-relaxed pt-2"
            >
              {subHeadline}
            </motion.p>
          </div>

          {/* Action buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              className="rounded-xl font-bold text-xs uppercase tracking-wider gap-2 px-6 py-6 shadow-lg shadow-primary/10 transition-all hover:translate-y-[-2px] duration-300 animate-none"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Projects <ArrowDown className="h-4 w-4" />
            </Button>

            {cvUrl && (
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl font-bold text-xs uppercase tracking-wider gap-2 px-6 py-6 bg-card border-border transition-all hover:translate-y-[-2px] duration-300 animate-none"
                asChild
              >
                <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                  Download CV <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            )}
          </motion.div>

          {/* Dynamic counter-like statistics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6 max-w-md pt-8 border-t border-border/80"
          >
            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-foreground block font-mono">
                {yearsExperience}+
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80 leading-snug">
                Years Learning & Experience
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-foreground block font-mono">
                {projectCompleted}+
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80 leading-snug">
                Showcase Projects
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Photo & Links Grid */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col items-center justify-center relative pt-8 lg:pt-0"
        >
          {/* Main Photo Layout */}
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-[32px] border border-border/80 bg-muted/20 overflow-hidden shadow-2xl z-10 group">
            {profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileImage}
                alt="Hana Prakasita Kustanto profile photo"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/35 gap-1.5">
                <span className="text-xs font-semibold">No profile image uploaded</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>

          {/* Editorial offset card border backdrop */}
          <div className="absolute w-full max-w-[340px] aspect-[3/4] rounded-[32px] border border-primary/20 translate-x-4 translate-y-4 z-0" />

          {/* Social Links floating panel */}
          {socialLinks.length > 0 && (
            <div className="flex gap-4 mt-8 bg-card border border-border/60 py-2.5 px-6 rounded-2xl shadow-sm z-10">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a
                    key={idx}
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-xl bg-muted/40 hover:bg-primary hover:text-white flex items-center justify-center text-muted-foreground transition duration-300"
                    title={link.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          )}

        </motion.div>

      </motion.div>
    </section>
  );
}
