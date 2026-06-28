import React from "react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import ExpertiseSection from "@/components/public/ExpertiseSection";
import ServicesSection from "@/components/public/ServicesSection";
import ProjectsSection from "@/components/public/ProjectsSection";
import DashboardShowcase from "@/components/public/DashboardShowcase";
import AnalyticsSection from "@/components/public/AnalyticsSection";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";

export const revalidate = 0; // Ensure Server Component queries are run dynamically

export default async function HomePage() {
  // Query CMS database settings
  const hero = await prisma.hero.findFirst();
  const about = await prisma.about.findFirst();
  const skills = await prisma.skill.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const projects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  const contact = await prisma.contact.findFirst();

  // Compute analytics metrics
  const analyticsStats = {
    totalProjects: projects.length,
    publishedProjects: projects.filter((p) => p.status === "PUBLISHED").length,
    totalSkills: skills.length,
    yearsExperience: hero?.yearsExperience || 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans select-none antialiased selection:bg-primary/10 selection:text-primary">
      {/* Sticky Top Header */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section */}
        <HeroSection data={hero} />

        {/* About Biography Section */}
        <AboutSection data={about} />

        {/* Technical Expertise Section */}
        <ExpertiseSection skills={skills} />

        {/* Core Services Section */}
        <ServicesSection />

        {/* Case Studies Section */}
        <ProjectsSection projects={projects} />

        {/* Dynamic BI Dashboard Showcase */}
        <DashboardShowcase projects={projects} />

        {/* Analytics Section */}
        <AnalyticsSection stats={analyticsStats} />

        {/* Contact Section */}
        <ContactSection data={contact} />
      </main>

      {/* Footer copyright */}
      <Footer />
    </div>
  );
}