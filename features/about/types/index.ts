import { AboutSchemaInput } from "../schemas";

export type AboutInput = AboutSchemaInput;

export interface AboutData extends AboutInput {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
