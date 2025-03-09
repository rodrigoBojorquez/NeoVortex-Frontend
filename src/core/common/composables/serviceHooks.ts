import {type UseMutationOptions} from "@tanstack/vue-query";
import {useMutation} from "@tanstack/vue-query";
import type {AxiosError} from "axios";
import {TYPE, useToast} from "vue-toastification";
import type {ToastID} from "vue-toastification/dist/types/types";
import {useGetErrorMessage} from "@/core/common/composables/errorHooks.ts";

interface ToastMessages {
  loading?: string
  success?: string
  error?: string
}

interface ToastContext {
  toastId: ToastID
}

export function useToastMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, AxiosError, TVariables>,
  messages?: ToastMessages
) {

  const toast = useToast()
  // const resolvedOptions = unref(options) ?? {};


  return useMutation<TData, AxiosError, TVariables>({
    mutationFn,

    onMutate: async () => {
      const toastId = toast(messages?.loading ?? "Cargando ⏳", {
        type: TYPE.DEFAULT,
        timeout: false
      })

      const context: ToastContext = {toastId}

      // const userOnMutate = unref(resolvedOptions.onMutate)
      // if (typeof userOnMutate === "function") {
      //   const userContext = await userOnMutate(variables)
      //   if (userContext && typeof userContext === "object") {
      //     return {...context, ...userContext}
      //   }
      // }

      return context
    },

    onSuccess: (data, variables, context) => {
      if (!isToastContext(context)) return;

      toast.update(context.toastId, {
        content: messages?.success ?? "Completado! 😃",
        options: {
          type: TYPE.SUCCESS,
          timeout: 2000
        }
      })

      // const userOnSuccess = unref(resolvedOptions.onSuccess)
      // if (typeof userOnSuccess === "function") {
      //   userOnSuccess(data, variables, context)
      // }
    },

    onError: (error, variables, context) => {
      const errorMessage = useGetErrorMessage(error)

      if (!isToastContext(context)) return;

      toast.update(context.toastId, {
        content: messages?.error || errorMessage || "Error de servidor, intente más tarde 🔴",
        options: {
          type: TYPE.ERROR,
          timeout: 2000
        }
      })

      // const userOnError = unref(resolvedOptions.onError)
      // if (typeof userOnError === "function") {
      //   userOnError(error, variables, context)
      // }
    },
    ...options
  })
}

/*
 * Type Guards
 */

/**
 * Check if a value is a ToastID
 * @param value
 */
function isToastID(value: unknown): value is ToastID {
  return (typeof value === "string" && value.length > 0) || (typeof value === "number");
}

/**
 * Check if a value is a ToastContext
 * @param value
 */
function isToastContext(value: unknown): value is ToastContext {
  return (
    typeof value === "object" &&
    value !== null &&
    "toastId" in value &&
    isToastID((value as ToastContext).toastId)
  );
}

