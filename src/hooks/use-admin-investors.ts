import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import service, { type AdminInvestorsParams, type AdminInvestorUpdate } from "@/services/adminInvestorsService"
export function useAdminInvestors(params: AdminInvestorsParams) { return useQuery({ queryKey: ["admin-investors", params], queryFn: () => service.getInvestors(params) }) }
export function useAdminInvestor(id: string) { return useQuery({ queryKey: ["admin-investor", id], queryFn: () => service.getInvestor(id), enabled: Boolean(id) }) }
export function useUpdateAdminInvestor(id: string) { const qc = useQueryClient(); return useMutation({ mutationFn: (update: AdminInvestorUpdate) => service.updateInvestor(id, update), onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-investors"] }); qc.invalidateQueries({ queryKey: ["admin-investor", id] }) } }) }
