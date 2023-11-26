import CONSTANTS from '@/constants/constants';

const refreshAccessToken = async (cookie: string) => {
  try {
    const response = await fetch(`${CONSTANTS.BASEURL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      body: null,
      headers: { Cookie: cookie },
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

async function roleFetcher(cookie: string) {
  const response = await fetch(`${CONSTANTS.BASEURL}/auth/user`, {
    headers: { Cookie: cookie },
    credentials: 'include',
  });
  if (response.ok) {
    const data = await response.json();
    if (data.data && data.data.is_seller === false) {
      return 'user';
    } else if (data.data && data.data.is_seller === true) {
      return 'seller';
    }
  }
  if (!response.ok && response.status === 401) {
    try {
      const refreshResponse = await refreshAccessToken(cookie);
      if (refreshResponse.ok) {
        const checkAgainResponse = await fetch(
          `${CONSTANTS.BASEURL}/auth/user`,
          {
            headers: { Cookie: cookie },
            credentials: 'include',
          },
        );
        if (checkAgainResponse.ok) {
          const data = await response.json();
          if (data.data && data.data.is_seller === false) {
            return 'user';
          } else if (data.data && data.data.is_seller === true) {
            return 'seller';
          }
        }
      }
      return 'unauthorized';
    } catch (error) {
      return 'unauthorized';
    }
  }
  return 'unauthorized';
}

export default roleFetcher;
