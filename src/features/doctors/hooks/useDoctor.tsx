import { useAuthStore } from "@/features/auth/store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorService } from "../services/doctor.service";
import { DoctorSchema } from "../forms/doctor.schema";

export const useDoctor = () => {
  const navigate = useNavigate();
  const saveAuth = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDoctor = async (data: DoctorSchema) => {
    try {
      setLoading(true);
      setError(null);

      const res = await doctorService.create(data);

      saveAuth(res);

      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al crear el perfil");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    createDoctor,
    loading,
    error,
  };
};
