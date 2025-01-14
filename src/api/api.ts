// const BASE_URL = 'http://localhost:3000';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchWrapper(url: string, options: RequestInit = {}) {
  const headers = {
    'Cache-Control': 'no-cache',
    ...options.headers,
  };

  const urlWithCacheBusting = `${BASE_URL}${url}?t=${new Date().getTime()}`;

  const response = await fetch(urlWithCacheBusting, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
