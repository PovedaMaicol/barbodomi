import { loginRequest } from "@/services/auth/auth.services";
import * as SecureStore from "expo-secure-store";

export function useAuth() {
  const login = async (username: string, password: string) => {
    const data = await loginRequest(username, password);

    // Guardar token de forma segura
    await SecureStore.setItemAsync("token", data.access_token);
    await SecureStore.setItemAsync("user", JSON.stringify(data.usuario));

    return data;
  };

  return { login };
}
