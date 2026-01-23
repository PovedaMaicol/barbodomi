import { useState } from "react";

export function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const APIURL = process.env.API_URL;
  const usersEndpoint = `http://192.168.101.41:3000/users`;

  const createUser = async (userData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(usersEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
          email: userData.email,
          primer_nombre: userData.primer_nombre,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating user");
      }

      return { success: true, data };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
  };
}
