import { fetchWrapper } from "@/api/api";

export async function getRequest(url: string, params: object = {}) {
  const queryString = new URLSearchParams(params as any).toString();
  return fetchWrapper(`${url}?${queryString}`, {
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

export async function putRequest(
  url: string,
  data: Blob | File,
  headers: Record<string, string> = {}
): Promise<any> {
  const response = await fetch(url, {
    method: "PUT",
    body: data,
    headers: {
      ...headers,
      "Content-Type": data.type || "application/octet-stream",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
