import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export function useTreatments() {
  return useQuery({
    queryKey: ["treatments"],
    queryFn: dashboardService.getTreatments,
  });
}