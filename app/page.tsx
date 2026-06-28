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
import type { Metadata } from "next";

export const revalidate = 0; // Ensure Server Component queries are run dynamically

export async function generateMetadata(): Promise<Metadata> {
  const hero = await prisma.hero.findFirst();
  const title = hero ? `${hero.headline} | Hana Prakasita` : "Hana Prakasita | Future Data Analyst";
  const description = hero?.subHeadline || "Hana Prakasita Kustanto portfolio and data analyst showcase.";
  const baseUrl = process.env.NEXTAUTH_URL || "https://hanaprakasita.com";

  return {
    title,
    description,
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      type: "website",
      images: hero?.profileImage ? [{ url: hero.profileImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: hero?.profileImage ? [hero.profileImage] : [],
    },
  };
}

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

  const baseUrl = process.env.NEXTAUTH_URL || "https://hanaprakasita.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hana Prakasita Kustanto",
    "url": baseUrl,
    "jobTitle": "Data Analyst / Data Engineer",
    "sameAs": [
      hero?.github || "",
      hero?.linkedIn || "",
      hero?.instagram || ""
    ].filter(Boolean)
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans select-none antialiased selection:bg-primary/10 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sticky Top Header */}
      <Navbar />

      <main id="main-content" className="flex-1 w-full flex flex-col">
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