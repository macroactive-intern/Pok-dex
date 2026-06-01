import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  PokemonListResponse,
  PokemonWithSpecies,
} from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";
const CACHE: RequestInit = { next: { revalidate: 3600 } };

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url, CACHE);
  if (!res.ok) throw new Error(`PokeAPI ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  return get<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  return get<Pokemon>(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
}

export async function getPokemonSpecies(name: string): Promise<PokemonSpecies> {
  return get<PokemonSpecies>(
    `${BASE_URL}/pokemon-species/${name.toLowerCase()}`
  );
}

export async function getEvolutionChainByUrl(
  url: string
): Promise<EvolutionChain> {
  return get<EvolutionChain>(url);
}

export async function getEvolutionChainById(
  id: string | number
): Promise<EvolutionChain> {
  return get<EvolutionChain>(`${BASE_URL}/evolution-chain/${id}`);
}

export async function getPokemonWithSpecies(
  name: string
): Promise<PokemonWithSpecies> {
  const pokemon = await getPokemonByName(name);
  const species_data = await getPokemonSpecies(pokemon.species.name);
  return { ...pokemon, species_data };
}
