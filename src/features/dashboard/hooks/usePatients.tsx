import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: dashboardService.getPatients,
  });
}