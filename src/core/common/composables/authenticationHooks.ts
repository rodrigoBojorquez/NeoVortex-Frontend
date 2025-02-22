/**
 * Obtiene el access_token y lo configura en los headers
 */
export async function useConfigureHeaders() : Promise<Headers> {
  return {
    Authorization: 'Bearer ' + 'token'
  }
}

type Headers = {
  Authorization: string
}

export async function useAuthorize() {
  const headers = await useConfigureHeaders()
  return headers
}
