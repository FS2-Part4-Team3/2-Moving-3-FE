// const BASE_URL = 'http://localhost:3000';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export class CustomError extends Error {
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.data = data;
  }
}

export async function fetchWrapper(url: string, options: RequestInit = {}) {
  const headers = {
    'Cache-Control': 'no-cache',
    ...options.headers,
  };

  const urlWithCacheBusting = `${BASE_URL}${url}?t=${new Date().getTime()}`;

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!refreshResponse.ok) {
          throw new CustomError('Failed to refresh token', await refreshResponse.json());
        }

        const retryResponse = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers: {
            ...headers,
          },
          credentials: 'include',
        });

        if (!retryResponse.ok) {
          const error = new CustomError(`HTTP error! status: ${retryResponse.status}`, await retryResponse.json());
          throw error;
        }

        return retryResponse.json();
      }

      console.error('Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      const error = new CustomError(`HTTP error! status: ${response.status}`, await response.json());
      throw error;
    }

    if (response.status === 204) {
      return;
    }

    console.log(response.headers.get('set-cookie'));

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
