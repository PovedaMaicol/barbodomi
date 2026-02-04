import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Negocio } from "@/types/negocio.types";

export function useNegocios() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const negociosEndpoint = `http://192.168.101.41:3000/negocios`;

  const getAuthHeaders = async () => {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const createNegocio = async (negocioData: Negocio) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(negociosEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: negocioData.name,
          address: negocioData.address,
          phone: negocioData.phone,
          description: negocioData.description,
          email: negocioData.email,
          website: negocioData.website,
          category: negocioData.category,
          img_url: negocioData.img_url,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating negocio");
      }
      return { success: true, data };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const getAllNegocios = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = await getAuthHeaders();

      const response = await fetch(negociosEndpoint, {
        method: "GET",
        headers,
      });

      if (response.status === 401) {
        await SecureStore.deleteItemAsync("token");
        throw new Error("Sesión expirada");
      }

      console.log("STATUS:", response.status);
      console.log("CONTENT-TYPE:", response.headers.get("content-type"));

      const data = await response.json();
      console.log("Datos recibidos en getAllNegocios:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error fetching negocios");
      }
      return { success: true, data };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const getOneNegocio = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = await getAuthHeaders();

      const response = await fetch(`${negociosEndpoint}/${id}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error fetching negocio");
      }
      return { success: true, data };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }

  return {
    createNegocio,
    getAllNegocios,
    getOneNegocio,
    isLoading,
    error,
  };
}
