import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboard.service"

export function usePatientReport(id?: string) {
  return useQuery({
    queryKey: ["patient-report", id],
    queryFn: () => dashboardService.getPatientReport(id ?? ""),
    enabled: Boolean(id),
  })
}
