import type { UserForm} from "@/core/types/user.ts";
import { object, ObjectSchema, string } from "yup";

// Esquema para la creación de usuario
const userFormSchema: ObjectSchema<UserForm> = object({
  name: string().required("El nombre es obligatorio").default(""),
  email: string().email("El correo no es válido").required("El correo es obligatorio").default(""),
  password: string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria").default(""),
  roleId: string().required("El rol es obligatorio").default(""),
});

export { userFormSchema };
