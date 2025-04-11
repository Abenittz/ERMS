"use server";

import { cookies } from "next/headers";

import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const cookieStore = cookies();
const cookie = await cookieStore;
const token = cookie.get("accessToken")?.value;

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: isDevelopment
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : {},
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Please check your credentials.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
