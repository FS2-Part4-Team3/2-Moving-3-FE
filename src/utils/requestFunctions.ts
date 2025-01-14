import { fetchWrapper } from '@/api/api';
import type { Params } from '@/interfaces/API';

export async function getRequest(url: string, params?: Params) {
  try {
    let finalUrl = url;

    if (params && Object.keys(params).length > 0) {
      console.log('Original params:', params);

      const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      console.log('Generated query params:', queryParams);

      if (queryParams) {
        finalUrl = `${url}?${queryParams}`;
      }
    }

    // 최종 URL 로깅
    console.log('Final URL before fetch:', finalUrl);

    return await fetchWrapper(finalUrl, {
      method: 'GET',
    });
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
}

export async function postRequest(url: string, body: object = {}) {
  return fetchWrapper(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function patchRequest(url: string, body: object = {}) {
  return fetchWrapper(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function deleteRequest(url: string) {
  return fetchWrapper(url, {
    method: 'DELETE',
  });
}
