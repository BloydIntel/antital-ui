import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type { UserProfile } from "@/types/user-api";
import { toApiError } from "@/lib/api-error";

async function getById(userId: number): Promise<UserProfile> {
  try {
    const res = await request.get<ApiResponse<UserProfile>>(`/api/users/${userId}`);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const userService = {
  getById,
};

export default userService;
