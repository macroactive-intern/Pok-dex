import { pokeapiGet } from "./client";
import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  PokemonListResponse,
} from "./types";

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  return pokeapiGet<Pokemon>(`/pokemon/${nameOrId}`);
}

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  return pokeapiGet<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
  return pokeapiGet<EvolutionChain>(url);
}

export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  return pokeapiGet<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
}

export async function searchPokemon(query: string): Promise<Pokemon | null> {
  try {
    return await getPokemon(query.toLowerCase().trim());
  } catch {
    return null;
  }
}
