"use client";

import { useEffect, useState, useTransition } from "react";
import { getProjects, deleteProject, duplicateProject, updateProject } from "../actions";
import { toast } from "sonner";
import type { ProjectData } from "../types";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED">("ALL");
  const [featured, setFeatured] = useState<"ALL" | "FEATURED" | "NON_FEATURED">("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "featured_first">("newest");
  const [page, setPage] = useState(1);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchList = async (currentPageNum = page) => {
    setIsLoading(true);
    try {
      const res = await getProjects({
        search,
        status,
        featured,
        sortBy,
        page: currentPageNum,
        limit: 10,
      });

      if (res.success) {
        setProjects((res.projects || []) as ProjectData[]);
        setTotalCount(res.totalCount || 0);
        setTotalPages(res.totalPages || 1);
        setCurrentPage(res.currentPage || 1);
        setPage(res.currentPage || 1);
      } else {
        toast.error(res.error || "Failed to load projects");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Failed to load projects list");
    } finally {
      setIsLoading(false);
    }
  };

  // Safe async loading in effect to avoid calling setState synchronously
  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      try {
        const res = await getProjects({
          search,
          status,
          featured,
          sortBy,
          page: 1,
          limit: 10,
        });

        if (isMounted && res.success) {
          setProjects((res.projects || []) as ProjectData[]);
          setTotalCount(res.totalCount || 0);
          setTotalPages(res.totalPages || 1);
          setCurrentPage(1);
          setPage(1);
        }
      } catch (err) {
        console.error("Error loading projects on filter changes:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [search, status, featured, sortBy]);

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setPage(pageNum);
    fetchList(pageNum);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const res = await deleteProject(deleteId);
      if (res.success) {
        toast.success("Project deleted successfully!");
        setDeleteId(null);
        await fetchList();
      } else {
        toast.error(res.error || "Failed to delete project");
      }
    });
  };

  const handleDuplicate = async (id: string) => {
    startTransition(async () => {
      const res = await duplicateProject(id);
      if (res.success) {
        toast.success("Project duplicated successfully as Draft!");
        await fetchList();
      } else {
        toast.error(res.error || "Failed to duplicate project");
      }
    });
  };

  const handleToggleFeatured = async (project: ProjectData) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p))
    );

    const res = await updateProject(project.id, {
      title: project.title,
      slug: project.slug,
      description: project.description,
      thumbnail: project.thumbnail || "",
      github: project.github || "",
      demo: project.demo || "",
      figma: project.figma || "",
      techStack: project.techStack || "",
      featured: !project.featured,
      status: project.status,
      gallery: project.gallery,
    });

    if (res.success) {
      toast.success(
        !project.featured ? "Project marked as Featured!" : "Project removed from Featured."
      );
      await fetchList();
    } else {
      toast.error(res.error || "Failed to update project status");
      await fetchList();
    }
  };

  const handleQuickStatusChange = async (project: ProjectData, newStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED") => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
    );

    const res = await updateProject(project.id, {
      title: project.title,
      slug: project.slug,
      description: project.description,
      thumbnail: project.thumbnail || "",
      github: project.github || "",
      demo: project.demo || "",
      figma: project.figma || "",
      techStack: project.techStack || "",
      featured: project.featured,
      status: newStatus,
      gallery: project.gallery,
    });

    if (res.success) {
      toast.success(`Project status updated to ${newStatus.toLowerCase()}!`);
      await fetchList();
    } else {
      toast.error(res.error || "Failed to update project status");
      await fetchList();
    }
  };

  return {
    projects,
    totalCount,
    totalPages,
    currentPage,
    isLoading,
    isPending,
    search,
    setSearch,
    status,
    setStatus,
    featured,
    setFeatured,
    sortBy,
    setSortBy,
    handlePageChange,
    deleteId,
    setDeleteId,
    handleDeleteConfirm,
    handleDuplicate,
    handleToggleFeatured,
    handleQuickStatusChange,
    refreshList: () => fetchList(page),
  };
}
