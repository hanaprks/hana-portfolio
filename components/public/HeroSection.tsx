"use client";

import React from "react";
import { ArrowDown, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";


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
      className="min-h-screen pt-28 md:pt-36 pb-16 flex items-center bg-background relative overflow-hidden"
    >
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />

      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Metadata & Hero CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="flex flex-wrap items-center gap-3">
            {availability && (
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 rounded-full font-bold px-3 py-1 flex items-center gap-1.5 text-xs animate-none">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                {availability}
              </Badge>
            )}
            {location && (
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider font-mono">
                📍 {location}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary font-mono">{role}</h2>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-none">
              {headline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl font-medium leading-relaxed">
              {subHeadline}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="lg"
              className="rounded-xl font-bold text-sm gap-2 shadow-lg shadow-primary/10 animate-none"
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
                className="rounded-xl font-bold text-sm gap-2 bg-card border-border animate-none"
                asChild
              >
                <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                  Download CV <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Dynamic counter-like statistics */}
          <div className="grid grid-cols-2 gap-4 max-w-md pt-8 border-t border-border/60">
            <div className="space-y-1">
              <span className="text-4xl font-black tracking-tight text-foreground block font-mono">
                {yearsExperience}+
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                Years Learning & Experience
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl font-black tracking-tight text-foreground block font-mono">
                {projectCompleted}+
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                Showcase Projects
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Photo & Links Grid */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Main Photo Layout */}
          <div className="relative w-72 md:w-80 aspect-[4/5] rounded-3xl border border-border/80 bg-muted/30 overflow-hidden shadow-2xl">
            {profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileImage}
                alt="Hana Prakasita Kustanto profile photo"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/35 gap-1.5">
                <span className="text-xs font-semibold">No profile image uploaded</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>

          {/* Editorial offset card border backdrop */}
          <div className="absolute w-72 md:w-80 aspect-[4/5] rounded-3xl border border-primary/10 translate-x-4 translate-y-4 -z-10" />

          {/* Social Links floating panel */}
          {socialLinks.length > 0 && (
            <div className="flex gap-4 mt-8 bg-card border border-border/50 py-2.5 px-5 rounded-2xl shadow-sm">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a
                    key={idx}
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-xl bg-muted/40 hover:bg-primary hover:text-white flex items-center justify-center text-muted-foreground transition duration-200"
                    title={link.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
