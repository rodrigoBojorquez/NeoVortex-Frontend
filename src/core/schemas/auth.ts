import type {LoginRequest, RegisterRequest} from "@/core/types/auth.ts";
import {object, ObjectSchema, string} from "yup"

const loginSchema: ObjectSchema<LoginRequest> = object({
  email: string().email("El correo no es valido").required("Campo requerido").default(""),
  password: string().required("Campo requerido").default(""),
})

const registerSchema: ObjectSchema<RegisterRequest> = object({
  name: string().required("Campo requerido").default(""),
  email: string().email("El correo no es valido").required("Campo requerido").default(""),
  password: string().required("Campo requerido").default(""),
})

export {loginSchema, registerSchema}
