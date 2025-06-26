const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function api<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
  return res.json();
}
