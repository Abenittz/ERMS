import axios from "axios";
import apiClient from "../fetcher";
import { LoginPayload } from "@/lib/types/auth-types";

export const login = async (payload: LoginPayload) => {
  try {
    const response = await apiClient.post("/auth/login", payload);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
