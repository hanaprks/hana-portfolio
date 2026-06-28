import { SkillSchemaInput } from "../schemas";

export type SkillInput = SkillSchemaInput;

export interface SkillData extends SkillInput {
  id: string;
  createdAt?: Date;
}
