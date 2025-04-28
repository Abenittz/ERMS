import axios, { InternalAxiosRequestConfig } from 'axios'; // eslint-disable-line import/named
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(process.env.NEXT_PUBLIC_BASE_URL);

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? undefined;
    return undefined;
  };

  const token = getCookie('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

export const setCookie = (name: string, value: string) => {
  const cookieOptions = [
    `${name}=${value}`,
    'path=/',
    'secure',
    'max-age=86400',
    'samesite=lax',
  ].join('; ');

  console.log('Setting cookie with options:', cookieOptions);
  document.cookie = cookieOptions; // eslint-disable-line unicorn/no-document-cookie
};

export const setRole = (name: string, value: string) => {
  const cookieOptions = [
    `${name}=${value}`,
    'path=/',
    'secure',
    'max-age=86400',
    'samesite=lax',
  ].join('; ');

  console.log('Setting cookie with options:', cookieOptions);
  document.cookie = cookieOptions; // eslint-disable-line unicorn/no-document-cookie
};
