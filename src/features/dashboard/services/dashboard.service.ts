import { authFetch } from "../../auth/lib/authFetch";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const dashboardService = {

  async getDashboard() {
    const res = await authFetch(`${BASE_URL}/doctors/me/dashboard/`);
    if (!res.ok) throw new Error("Error fetching dashboard");
    return res.json();
  },


  async getTreatments() {
    const res = await authFetch(`${BASE_URL}/doctors/me/treatments/`);

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.log("TREATMENTS ERROR RESPONSE:", data);
      throw new Error(
        data?.message || "Error fetching treatments"
      );
    }

    return data;
  },


  async getTreatmentStats(id: string) {
    const res = await authFetch(
      `${BASE_URL}/doctors/me/treatments/${id}/stats/`
    );
    if (!res.ok) throw new Error("Error fetching treatment stats");
    return res.json();
  },


  async getPatients() {
    const res = await authFetch(`${BASE_URL}/doctors/pacientes/`);
    if (!res.ok) throw new Error("Error fetching patients");
    return res.json();
  },


  async getPatientReport(id: string) {
    const res = await authFetch(
      `${BASE_URL}/doctors/me/patients/${id}/report/`
    );
    if (!res.ok) throw new Error("Error fetching patient report");
    return res.json();
  },
};