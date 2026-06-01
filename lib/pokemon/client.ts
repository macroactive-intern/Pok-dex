const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`PokeAPI error: ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export function pokeapiGet<T>(path: string): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  return fetchJSON<T>(url);
}
