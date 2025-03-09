import { object, ObjectSchema, string } from "yup";
import type {CategoryForm} from "@/core/types/categories.ts";

const categoryFormSchema: ObjectSchema<CategoryForm> = object({
  name: string().required("El nombre es obligatorio").default(""),
  description: string().default(""),
  color: string().default(""),
});

export { categoryFormSchema };
