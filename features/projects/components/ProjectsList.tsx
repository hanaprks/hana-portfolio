"use client";

import React from "react";
import { useProjects } from "../hooks/useProjects";
import {
  SectionCard,
  DeleteDialog,
  LoadingState,
  EmptyState,
  ActionButton,
} from "@/features/core/crud/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Copy,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
  Star,
  Layers,
} from "lucide-react";
import type { ProjectData } from "../types";
import { cn } from "@/lib/utils";

interface ProjectsListProps {
  onAdd: () => void;
  onEdit: (project: ProjectData) => void;
}

export function ProjectsList({ onAdd, onEdit }: ProjectsListProps) {
  const {
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
  } = useProjects();

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-md border border-border p-4 rounded-2xl shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by title, slug, stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9.5 rounded-xl bg-muted/20 border-border text-sm"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED")}
              className="h-8 rounded-lg border border-border bg-card px-2.5 text-xs text-foreground outline-none cursor-pointer focus:border-primary"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          {/* Featured filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Type:</span>
            <select
              value={featured}
              onChange={(e) => setFeatured(e.target.value as "ALL" | "FEATURED" | "NON_FEATURED")}
              className="h-8 rounded-lg border border-border bg-card px-2.5 text-xs text-foreground outline-none cursor-pointer focus:border-primary"
            >
              <option value="ALL">All Projects</option>
              <option value="FEATURED">Featured Only</option>
              <option value="NON_FEATURED">Standard Only</option>
            </select>
          </div>

          {/* Sort filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "featured_first")}
              className="h-8 rounded-lg border border-border bg-card px-2.5 text-xs text-foreground outline-none cursor-pointer focus:border-primary"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="featured_first">Featured First</option>
            </select>
          </div>

        </div>
      </div>

      {/* Projects Display Panel */}
      <SectionCard
        title={`Projects List (${totalCount})`}
        description="View and manage your portfolio projects, status configurations, and ordering parameters."
        action={
          <ActionButton
            type="button"
            icon={Plus}
            onClick={onAdd}
            className="text-xs font-bold"
          >
            Add Project
          </ActionButton>
        }
      >
        {isLoading ? (
          <LoadingState rows={3} />
        ) : projects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description={
              search || status !== "ALL" || featured !== "ALL"
                ? "Try adjusting your search queries or filter selections."
                : "Create your first project showpiece using the Add Project button."
            }
            onAction={
              search || status !== "ALL" || featured !== "ALL" ? undefined : onAdd
            }
            actionLabel="Create Project"
          />
        ) : (
          <div className="space-y-4">
            
            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => {
                const tags = project.techStack
                  ? project.techStack
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .slice(0, 3)
                  : [];

                return (
                  <div
                    key={project.id}
                    className="relative flex flex-col p-4 rounded-2xl border border-border bg-card/45 hover:border-primary/10 transition duration-300 shadow-sm"
                  >
                    {/* Thumbnail & Badges */}
                    <div className="relative aspect-video rounded-xl border border-border/80 bg-muted/30 overflow-hidden mb-3.5">
                      {project.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/45 text-xs font-semibold">
                          No Thumbnail
                        </div>
                      )}
                      
                      {/* Status Float Badge */}
                      <Badge
                        variant="outline"
                        className={cn(
                          "absolute top-2.5 left-2.5 rounded-full font-bold uppercase text-[9px] px-2 py-0.5 border shadow-sm",
                          project.status === "PUBLISHED"
                            ? "bg-emerald-500/90 text-white border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                            : project.status === "ARCHIVED"
                            ? "bg-red-500/90 text-white border-red-600 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        )}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-extrabold text-sm text-foreground truncate max-w-[80%]">
                          {project.title}
                        </h3>
                        {/* Quick Featured Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(project)}
                          className="text-muted-foreground hover:text-amber-500 transition-colors shrink-0 pt-0.5"
                          title={project.featured ? "Unfeature Project" : "Feature Project"}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              project.featured ? "fill-amber-400 text-amber-500" : ""
                            )}
                          />
                        </button>
                      </div>

                      <p className="text-[11px] text-muted-foreground font-semibold font-mono truncate">
                        /{project.slug}
                      </p>

                      <p className="text-xs text-muted-foreground/80 font-medium line-clamp-2 pt-1 h-8">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 pt-2">
                          <Layers className="h-3 w-3 text-muted-foreground/60 mr-0.5" />
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold px-2 py-0.5 bg-muted/40 border border-border/80 rounded-md text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions Panel */}
                    <div className="flex items-center justify-between border-t border-border/60 pt-3 mt-4">
                      {/* Quick Status Setter */}
                      <select
                        value={project.status}
                        onChange={(e) =>
                          handleQuickStatusChange(project, e.target.value as "DRAFT" | "PUBLISHED" | "ARCHIVED")
                        }
                        className="h-7.5 rounded-lg border border-border bg-card px-2 text-[10px] font-bold text-foreground outline-none cursor-pointer focus:border-primary"
                      >
                        <option value="DRAFT">Set Draft</option>
                        <option value="PUBLISHED">Set Publish</option>
                        <option value="ARCHIVED">Set Archive</option>
                      </select>

                      {/* Buttons */}
                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDuplicate(project.id)}
                          className="h-7.5 w-7.5 rounded-lg text-muted-foreground hover:text-foreground"
                          title="Duplicate Project"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(project)}
                          className="h-7.5 w-7.5 rounded-lg text-muted-foreground hover:text-foreground"
                          title="Edit Project"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteId(project.id)}
                          className="h-7.5 w-7.5 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                          title="Delete Project"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-6">
                <span className="text-xs text-muted-foreground font-bold">
                  Page {currentPage} of {totalPages} ({totalCount} items)
                </span>
                
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1 || isPending}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="h-8 w-8 rounded-lg"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      disabled={isPending}
                      onClick={() => handlePageChange(pageNum)}
                      className={cn(
                        "h-8 w-8 rounded-lg text-xs font-bold font-mono",
                        currentPage === pageNum ? "shadow-sm" : ""
                      )}
                    >
                      {pageNum}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages || isPending}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="h-8 w-8 rounded-lg"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

          </div>
        )}
      </SectionCard>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        itemName="this project showcase"
        onConfirm={handleDeleteConfirm}
        isPending={isPending}
      />
    </div>
  );
}
