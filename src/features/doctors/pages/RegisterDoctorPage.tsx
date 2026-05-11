import { DoctorForm } from "../components/DoctorForm"
import { useDoctor } from "../hooks/useDoctor"

export const RegisterDoctorPage = () => {
  const { createDoctor, loading, error } = useDoctor()

  return (
    <div className="h-screen max-w-full items-center justify-center m-auto flex">
      <DoctorForm
        onSubmit={createDoctor}
        loading={loading}
        error={error}
      />
    </div>
  )
}