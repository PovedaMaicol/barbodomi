import { loginRequest } from "@/services/auth/auth.services";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Verificar autenticación al cargar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      console.log("🔑 Token encontrado:", token ? "SÍ" : "NO");
      setIsAuthenticated(!!token); // true si hay token, false si no
    } catch (error) {
      console.log("❌ Error chequeando token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const data = await loginRequest(username, password);

    // Guardar token de forma segura
    await SecureStore.setItemAsync("token", data.access_token);
    await SecureStore.setItemAsync("user", JSON.stringify(data.usuario));

    setIsAuthenticated(true); // ¡IMPORTANTE!
    return data;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    setIsAuthenticated(false);
  };

  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
  };
}
