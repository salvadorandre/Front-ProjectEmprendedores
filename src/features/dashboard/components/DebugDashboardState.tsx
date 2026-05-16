import { useDashboard } from "../hooks/useDashboard";
import { useTreatments } from "../hooks/useTreatments";
import { usePatients } from "../hooks/usePatients";

export const DebugDashboardState = () => {
  const dashboard = useDashboard();
  const treatments = useTreatments();
  const patients = usePatients();

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2>🧪 Dashboard Debug</h2>

      <section>
        <h3>📊 Dashboard</h3>
        <pre>{JSON.stringify({
          isLoading: dashboard.isLoading,
          error: dashboard.error,
          data: dashboard.data,
        }, null, 2)}</pre>
      </section>

      <section>
        <h3>💊 Treatments</h3>
        <pre>{JSON.stringify({
          isLoading: treatments.isLoading,
          error: treatments.error,
          data: treatments.data,
        }, null, 2)}</pre>
      </section>

      <section>
        <h3>👥 Patients</h3>
        <pre>{JSON.stringify({
          isLoading: patients.isLoading,
          error: patients.error,
          data: patients.data,
        }, null, 2)}</pre>
      </section>
    </div>
  );
};