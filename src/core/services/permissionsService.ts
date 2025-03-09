import type {ListResponse} from "@/core/types/common.ts";
import type {Permission} from "@/core/types/permission.ts";
import {apiClient} from "@/core/common/configuration/axiosClient.ts";


export async function listPermissions(): Promise<ListResponse<Permission>> {
  return (await apiClient.get('/permissions')).data;
}
