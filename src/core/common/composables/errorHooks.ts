import type { AxiosError } from "axios";

/**
 * Extrae el mensaje de error desde un objeto `AxiosError` o un error genérico.
 */
export function useGetErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const responseData = error.response?.data;

    // Si la API devuelve un objeto con `message`
    if (responseData && typeof responseData === "object") {
      if ("title" in responseData && typeof responseData.title === "string") {
        return responseData.title;
      }

      // Si la API devuelve errores de validación en un objeto `errors`
      if ("errors" in responseData && typeof responseData.errors === "object") {
        const validationErrors = responseData.errors!;
        return Object.values(validationErrors)
          .flat()
          .map(String)
          .join("\n");
      }
    }

    return error.message || "Error de servidor, intente más tarde.";
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
}

/**
 * Extrae el código de estado HTTP desde un objeto `AxiosError`.
 */
export function useGetErrorStatusCode(error: unknown): number | null {
  if (isAxiosError(error)) {
    return error.response?.status ?? null;
  }

  if (isErrorWithStatusCode(error)) {
    return error.statusCode;
  }

  return null;
}

/*
  * Type guards
*/

/**
 * Verifica si un error es de tipo `AxiosError`.
 */
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

/**
 * Verifica si un error tiene una propiedad `message` de tipo string.
 */
function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error !== null && "message" in error && typeof (error as { message: unknown }).message === "string";
}

/**
 * Verifica si un error tiene una propiedad `statusCode` de tipo number.
 */
function isErrorWithStatusCode(error: unknown): error is { statusCode: number } {
  return typeof error === "object" && error !== null && "statusCode" in error && typeof (error as { statusCode: unknown }).statusCode === "number";
}

