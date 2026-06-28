import { auth } from "@/auth";
import { getProjects } from "@/services/projects";
import { getSkills } from "@/services/skills";
import { getHero } from "@/services/hero";
import { getContact } from "@/services/contact";
import PageContainer from "@/components/admin/common/PageContainer";
import StatCard from "@/components/admin/common/StatCard";
import AnimatedContainer from "@/components/admin/common/AnimatedContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  Code2,
  User,
  Mail,
  ArrowRight,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || "Hana Prakasita";

  // Fetch real data from Services (Database Layer)
  const projects = await getProjects();
  const skills = await getSkills();
  const hero = await getHero();
  const contact = await getContact();

  const today = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date());

  const recentProjects = projects.slice(0, 3);

  return (
    <PageContainer>
      {/* Welcome Section */}
      <AnimatedContainer delay={0.05}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Welcome Back, {userName} 👋
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              Hari ini: {today}
            </p>
          </div>
          <Badge variant="outline" className="px-3 py-1.5 bg-card text-foreground gap-1 border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" /> CMS Mode
          </Badge>
        </div>
      </AnimatedContainer>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedContainer delay={0.1}>
          <StatCard
            title="Projects"
            value={projects.length}
            icon={FolderKanban}
            description="Total portfolio project dibuat"
          />
        </AnimatedContainer>
        <AnimatedContainer delay={0.15}>
          <StatCard
            title="Skills"
            value={skills.length}
            icon={Code2}
            description="Total skill keahlian terdaftar"
          />
        </AnimatedContainer>
        <AnimatedContainer delay={0.2}>
          <StatCard
            title="Hero Status"
            value={hero ? "Ready" : "Empty"}
            icon={User}
            description={hero ? "Hero section terkonfigurasi" : "Belum ada data hero"}
            className={hero ? "" : "border-amber-200 dark:border-amber-950"}
          />
        </AnimatedContainer>
        <AnimatedContainer delay={0.25}>
          <StatCard
            title="Contact Info"
            value={contact ? "Ready" : "Empty"}
            icon={Mail}
            description={contact ? "Informasi kontak terisi" : "Belum ada data kontak"}
            className={contact ? "" : "border-amber-200 dark:border-amber-950"}
          />
        </AnimatedContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Card */}
        <AnimatedContainer delay={0.3} className="lg:col-span-1">
          <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild variant="outline" className="justify-between rounded-xl py-6 hover:bg-muted group w-full">
                <Link href="/admin/hero">
                  <span className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" /> Edit Hero Section
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-xl py-6 hover:bg-muted group w-full">
                <Link href="/admin/projects">
                  <span className="flex items-center gap-3">
                    <Plus className="h-5 w-5 text-primary" /> Add New Project
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-xl py-6 hover:bg-muted group w-full">
                <Link href="/admin/skills">
                  <span className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-primary" /> Manage Skills
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </AnimatedContainer>

        {/* Recent Activity Card */}
        <AnimatedContainer delay={0.35} className="lg:col-span-2">
          <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Recent Projects Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentProjects.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Belum ada aktivitas proyek terbaru.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-border bg-card/50 hover:bg-muted transition duration-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <FolderKanban className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate text-foreground">
                            {project.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {project.techStack || "No tech stack"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={project.status === "PUBLISHED" ? "default" : "secondary"}
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <Button asChild variant="link" size="sm" className="text-primary hover:no-underline gap-1">
                      <Link href="/admin/projects">
                        Lihat Semua Proyek <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </PageContainer>
  );
}