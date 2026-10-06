import { toApiError } from "@/lib/api-error"
import { request, unwrap } from "@/services/api-client"
import type { ApiResponse } from "@/types/api"
import type { AdminInvestorDetail, AdminInvestorsResponse } from "@/types/admin-investors-api"
export interface AdminInvestorsParams { status?: string; kycStatus?: string; highNetWorth?: boolean; search?: string; from?: string; to?: string; sortBy?: "name" | "wallet" | "joinedDate"; descending?: boolean; page: number; pageSize: number }
export interface AdminInvestorUpdate { kycStatus?: string; note?: string; suspended?: boolean }
const getInvestors = async (params: AdminInvestorsParams) => { try { return unwrap((await request.get<ApiResponse<AdminInvestorsResponse>>("/api/admin/investors", { params })).data) } catch (e) { throw toApiError(e) } }
const getInvestor = async (id: string) => { try { return unwrap((await request.get<ApiResponse<AdminInvestorDetail>>(`/api/admin/investors/${encodeURIComponent(id)}`)).data) } catch (e) { throw toApiError(e) } }
const updateInvestor = async (id: string, update: AdminInvestorUpdate) => { try { return unwrap((await request.patch<ApiResponse<AdminInvestorDetail>>(`/api/admin/investors/${encodeURIComponent(id)}`, update)).data) } catch (e) { throw toApiError(e) } }
const adminInvestorsService = { getInvestors, getInvestor, updateInvestor }
export default adminInvestorsService
