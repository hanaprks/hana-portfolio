import { ProjectSchemaInput } from "../schemas";

export type ProjectInput = ProjectSchemaInput;

export interface ProjectData extends Omit<ProjectInput, "gallery"> {
  id: string;
  gallery: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
