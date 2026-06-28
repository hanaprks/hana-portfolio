"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { projectSchema, type ProjectSchemaInput } from "../schemas";
import { revalidatePath } from "next/cache";

interface GetProjectsParams {
  search?: string;
  status?: "ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured?: "ALL" | "FEATURED" | "NON_FEATURED";
  sortBy?: "newest" | "oldest" | "featured_first";
  page?: number;
  limit?: number;
}

export async function getProjects(params: GetProjectsParams = {}) {
  const {
    search = "",
    status = "ALL",
    featured = "ALL",
    sortBy = "newest",
    page = 1,
    limit = 10,
  } = params;

  try {
    const where: Prisma.ProjectWhereInput = {};

    if (search.trim()) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { techStack: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status !== "ALL") {
      where.status = status;
    }

    if (featured === "FEATURED") {
      where.featured = true;
    } else if (featured === "NON_FEATURED") {
      where.featured = false;
    }

    let orderBy: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[] = {};
    if (sortBy === "newest") {
      orderBy = { createdAt: "desc" };
    } else if (sortBy === "oldest") {
      orderBy = { createdAt: "asc" };
    } else if (sortBy === "featured_first") {
      orderBy = [
        { featured: "desc" },
        { createdAt: "desc" }
      ];
    }

    const skip = (page - 1) * limit;

    const [projects, totalCount] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      projects: JSON.parse(JSON.stringify(projects)),
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error getting projects:", error);
    return {
      success: false,
      error: "Failed to retrieve projects list",
      projects: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return { success: true, project: JSON.parse(JSON.stringify(project)) };
  } catch (error) {
    console.error("Error getting project:", error);
    return { success: false, error: "Failed to retrieve project detail" };
  }
}

export async function createProject(data: ProjectSchemaInput) {
  try {
    const validated = projectSchema.parse(data);

    const existing = await prisma.project.findUnique({
      where: { slug: validated.slug },
    });
    if (existing) {
      return { success: false, error: "Slug sudah digunakan oleh project lain." };
    }

    const created = await prisma.project.create({
      data: validated,
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true, data: JSON.parse(JSON.stringify(created)) };
  } catch (error) {
    console.error("Error creating project:", error);
    const errMsg = error instanceof Error ? error.message : "Failed to create project";
    return { success: false, error: errMsg };
  }
}

export async function updateProject(id: string, data: ProjectSchemaInput) {
  try {
    const validated = projectSchema.parse(data);

    const existing = await prisma.project.findFirst({
      where: {
        slug: validated.slug,
        id: { not: id },
      },
    });
    if (existing) {
      return { success: false, error: "Slug sudah digunakan oleh project lain." };
    }

    const updated = await prisma.project.update({
      where: { id },
      data: validated,
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating project:", error);
    const errMsg = error instanceof Error ? error.message : "Failed to update project";
    return { success: false, error: errMsg };
  }
}

export async function deleteProject(id: string) {
  try {
    const deleted = await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true, data: JSON.parse(JSON.stringify(deleted)) };
  } catch (error) {
    console.error("Error deleting project:", error);
    const errMsg = error instanceof Error ? error.message : "Failed to delete project";
    return { success: false, error: errMsg };
  }
}

export async function duplicateProject(id: string) {
  try {
    const source = await prisma.project.findUnique({
      where: { id },
    });
    if (!source) {
      return { success: false, error: "Project sumber tidak ditemukan." };
    }

    const newTitle = `${source.title} Copy`;
    let newSlug = `${source.slug}-copy`;
    
    const existing = await prisma.project.findUnique({
      where: { slug: newSlug },
    });
    if (existing) {
      newSlug = `${newSlug}-${Math.floor(Math.random() * 1000)}`;
    }

    const duplicated = await prisma.project.create({
      data: {
        title: newTitle,
        slug: newSlug,
        description: source.description,
        thumbnail: source.thumbnail,
        github: source.github,
        demo: source.demo,
        figma: source.figma,
        techStack: source.techStack,
        featured: false,
        status: "DRAFT",
        gallery: source.gallery,
        problemStatement: source.problemStatement,
        datasetDescription: source.datasetDescription,
        methodology: source.methodology,
        dataCleaning: source.dataCleaning,
        exploratoryAnalysis: source.exploratoryAnalysis,
        featureEngineering: source.featureEngineering,
        visualizationProcess: source.visualizationProcess,
        dashboardScreenshot: source.dashboardScreenshot,
        modelDevelopment: source.modelDevelopment,
        evaluation: source.evaluation,
        businessInsight: source.businessInsight,
        recommendation: source.recommendation,
        conclusion: source.conclusion,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true, data: JSON.parse(JSON.stringify(duplicated)) };
  } catch (error) {
    console.error("Error duplicating project:", error);
    const errMsg = error instanceof Error ? error.message : "Failed to duplicate project";
    return { success: false, error: errMsg };
  }
}
