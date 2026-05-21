const BASE_URL = "http://192.168.0.14:5000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  method: HttpMethod;
  endpoint: string;
  body?: object;
  token?: string;
};

export async function httpRequest<T>({
  method,
  endpoint,
  body,
  token,
}: RequestOptions): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, message: data.message || "Error en la petición" };
  }

  return data as T;
}