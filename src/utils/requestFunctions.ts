import { fetchWrapper, fetchWrapperSSR } from '@/api/api';
import type { Params } from '@/interfaces/API';

export async function getRequest(url: string, params?: Params) {
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, v!.toString()]),
      ).toString()
    : '';

  const fullUrl = `${url}${queryString ? `?${queryString}` : ''}`;

  return fetchWrapper(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getRequestSSR(accessToken: string, url: string, params?: Params) {
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, v!.toString()]),
      ).toString()
    : '';

  const fullUrl = `${url}${queryString ? `?${queryString}` : ''}`;

  return fetchWrapperSSR(
    fullUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    accessToken,
  );
}

export async function postRequest(url: string, body: object = {}) {
  return fetchWrapper(url, {
    method: 'POST',
    credentials: 'include',
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
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}

export async function putRequest(url: string, body: File) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': body.type,
    },
    body: body,
  });
}
