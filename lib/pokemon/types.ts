// ─── List ────────────────────────────────────────────────────────────────────

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// ─── Pokémon detail ───────────────────────────────────────────────────────────

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface PokemonAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    dream_world: { front_default: string | null };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  species: { name: string; url: string };
}

// ─── Species ──────────────────────────────────────────────────────────────────

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
  evolution_chain: { url: string };
  is_legendary: boolean;
  is_mythical: boolean;
  is_baby: boolean;
  color: { name: string };
  shape: { name: string };
  habitat: { name: string } | null;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  growth_rate: { name: string };
}

// ─── Evolution chain ──────────────────────────────────────────────────────────

export interface EvolutionDetail {
  min_level: number | null;
  item: { name: string } | null;
  trigger: { name: string };
  held_item: { name: string } | null;
  known_move: { name: string } | null;
  min_happiness: number | null;
  min_beauty: number | null;
  time_of_day: string;
}

export interface ChainLink {
  species: { name: string; url: string };
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
  is_baby: boolean;
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

// ─── Type effectiveness ───────────────────────────────────────────────────────

/** 0 = immune · 0.5 = not very effective · 1 = normal · 2 = super effective */
export type TypeEffectiveness = 0 | 0.5 | 1 | 2;

export type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export type TypeName =
  | "normal" | "fire" | "water" | "electric" | "grass" | "ice"
  | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug"
  | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";
