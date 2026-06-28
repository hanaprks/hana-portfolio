"use client";

import React, { useState } from "react";
import { ProjectsList } from "./ProjectsList";
import { ProjectEditor } from "./ProjectEditor";
import type { ProjectData } from "../types";

export function ProjectsForm() {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);

  const handleAddClick = () => {
    setEditingProject(null);
    setView("create");
  };

  const handleEditClick = (project: ProjectData) => {
    setEditingProject(project);
    setView("edit");
  };

  const handleCancel = () => {
    setEditingProject(null);
    setView("list");
  };

  const handleSuccess = () => {
    setEditingProject(null);
    setView("list");
  };

  return (
    <>
      {view === "list" ? (
        <ProjectsList onAdd={handleAddClick} onEdit={handleEditClick} />
      ) : (
        <ProjectEditor
          project={editingProject}
          onCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
