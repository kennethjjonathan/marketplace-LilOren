import CONSTANTS from '@/constants/constants';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASEURL,
});

const refreshAccessToken = async () => {
  try {
  } catch (error) {
    console.error(error);
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
          const access_token = await refreshAccessToken();

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
  },
);
