const BASE_URL = 'http://localhost:3000';
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
    });

    if (!response.ok) {
      console.error('Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
