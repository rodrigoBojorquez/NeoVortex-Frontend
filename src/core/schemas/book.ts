import { object, string, number, ObjectSchema, date } from "yup";
import type {BookForm} from "@/core/types/book.ts";

const bookFormSchema: ObjectSchema<BookForm> = object({
  title: string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(255, "El título no puede superar los 255 caracteres")
    .default(""),

  description: string()
    .max(1000, "La descripción no puede superar los 1000 caracteres")
    .default(""),

  author: string()
    .min(3, "El nombre del autor debe tener al menos 3 caracteres")
    .max(255, "El nombre del autor no puede superar los 255 caracteres")
    .default(""),

  categoryId: string()
    .required("La categoría es obligatoria")
    .default(""),

  publishDate: date()
    .required("La fecha de publicación es obligatoria")
    .typeError("La fecha de publicación debe ser válida (YYYY-MM-DD)")
    .max(new Date(), "La fecha de publicación no puede ser en el futuro")
    .default(() => new Date()),

  quantity: number()
    .typeError("La cantidad debe ser un número")
    .transform((value, originalValue) => originalValue === "" ? 0 : value) // Evita NaN al borrar el valor
    .integer("La cantidad debe ser un número entero")
    .min(1, "Debe haber al menos 1 ejemplar disponible")
    .max(10000, "No puedes registrar más de 10,000 ejemplares")
    .default(1),

  pageCount: number()
    .typeError("El número de páginas debe ser un número")
    .transform((value, originalValue) => originalValue === "" ? 0 : value) // Evita NaN al borrar el valor
    .integer("El número de páginas debe ser un número entero")
    .min(1, "El libro debe tener al menos 1 página")
    .max(5000, "El libro no puede tener más de 5000 páginas")
    .default(0)
});

export { bookFormSchema };
