import { object, ObjectSchema, string, array } from "yup";
import type { RoleForm} from "@/core/types/role.ts";

const roleFormSchema: ObjectSchema<RoleForm> = object({
  name: string().required("El nombre es obligatorio").default(""),
  description: string().default(""),
  permissions: array().of(string()).required("Los permisos son obligatorios").default([]),
});

export { roleFormSchema };
