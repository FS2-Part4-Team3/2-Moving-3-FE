import { fetchWrapper } from "@/api/api";

interface Params {
  [key: string]: string | number;
}

export async function getRequest(url: string, params?: Params) {
  if (params) {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    url += `?${queryString}`;
  }

  return fetchWrapper(url, {
    method: "GET",
  });
}

export async function postRequest(url: string, body: object = {}) {
  return fetchWrapper(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function patchRequest(url: string, body: object = {}) {
  return fetchWrapper(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function deleteRequest(url: string) {
  return fetchWrapper(url, {
    method: "DELETE",
  });
}
