import apiClient from "@/services/apiClient";
import useAuth from "./useAuth";

export default function useLogout() {

  const { setAuth } = useAuth();

  const logout = async () => {

    try {

      const storedAuth = JSON.parse(
        localStorage.getItem("auth")
      );

      await apiClient.post("/api/auth/logout", {
        refreshToken: storedAuth?.refreshToken
      });

    } catch (err) {
      console.error(err);
    }

    // clear auth
    setAuth({});
    localStorage.removeItem("auth");
  };

  return logout;
}