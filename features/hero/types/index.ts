import { HeroSchemaInput } from "../schemas";

export type HeroInput = HeroSchemaInput;

export interface HeroData extends HeroInput {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
