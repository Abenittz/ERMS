import { cookies } from 'next/headers';
import axios, { isAxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getRepairRequestSS = async () => {
  try {
    const cookieStore = cookies();
    const cookie = await cookieStore;
    const token = cookie.get('accessToken')?.value;

    console.log('BASE_URL', BASE_URL);
    const response = await axios.get(`${BASE_URL}repairs/repair-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
