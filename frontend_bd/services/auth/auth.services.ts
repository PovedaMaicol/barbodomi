import { api } from "../api";

export interface LoginResponse {
  access_token: string;
  usuario: {
    email: string;
    nombre: string;
  };
}

export const loginRequest = async(
    username: string,
    password: string
  ): Promise<LoginResponse> => {
  const {data} = await api.post<LoginResponse>('/auth/login', {
    username,
    password,
  });
  return data;
}