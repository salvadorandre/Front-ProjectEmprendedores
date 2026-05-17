import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboard.service"

export function useTreatmentStats(id?: string) {
  return useQuery({
    queryKey: ["treatment-stats", id],
    queryFn: () => dashboardService.getTreatmentStats(id ?? ""),
    enabled: Boolean(id),
  })
}
