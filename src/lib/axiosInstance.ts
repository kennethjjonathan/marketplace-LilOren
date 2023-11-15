import CONSTANTS from '@/constants/constants';
import { useRouter } from 'next/router';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASEURL,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${CONSTANTS.BASEURL}/auth/refresh-token`,
      null,
      { withCredentials: true },
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const refreshReponse = await refreshAccessToken();
          if (refreshReponse.data.message === 'User already logged out') {
            return Promise.reject(refreshReponse);
          }
          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
