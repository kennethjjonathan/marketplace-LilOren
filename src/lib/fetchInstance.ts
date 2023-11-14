import CONSTANTS from '@/constants/constants';

const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${CONSTANTS.BASEURL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'same-origin',
      body: null,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

async function fetchInstance(resource: string, configuration: RequestInit) {
  const response = await fetch(resource, configuration);
  if (response.status && response.status === 401) {
    try {
      const refreshReponse = await refreshAccessToken();

      const refreshData = await refreshReponse.json();
      console.log('baru', refreshData);

      if (refreshData.message === CONSTANTS.ALREADY_LOGGED_OUT) {
        return Promise.reject(CONSTANTS.ALREADY_LOGGED_OUT);
      }
      const responseAgain = await fetch(resource, configuration);
    } catch (error) {}
  }
  try {
  } catch (error) {
    return Promise.reject(error);
  }
}

export default fetchInstance;
