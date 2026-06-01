import type { TypeName, TypeEffectiveness } from "./types";

// ─── Full 18×18 type chart (Gen VI+) ─────────────────────────────────────────
// typeChart[attackingType][defendingType] = effectiveness multiplier
// 0 = immune · 0.5 = not very effective · 1 = neutral · 2 = super effective

export const typeChart: Record<TypeName, Record<TypeName, TypeEffectiveness>> = {
  normal: {
    normal: 1, fire: 1,   water: 1,   electric: 1, grass: 1,   ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1,
  },
  fire: {
    normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2,   ice: 2,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2,
    rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1,
  },
  water: {
    normal: 1, fire: 2,   water: 0.5, electric: 1, grass: 0.5, ice: 1,
    fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1,
    rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1,
  },
  electric: {
    normal: 1, fire: 1,   water: 2,   electric: 0.5, grass: 0.5, ice: 1,
    fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1,
  },
  grass: {
    normal: 1, fire: 0.5, water: 2,   electric: 1, grass: 0.5, ice: 1,
    fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5,
    rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1,
  },
  ice: {
    normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2,   ice: 0.5,
    fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1,
  },
  fighting: {
    normal: 2, fire: 1,   water: 1,   electric: 1, grass: 1,   ice: 2,
    fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5,
    rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5,
  },
  poison: {
    normal: 1, fire: 1,   water: 1,   electric: 1, grass: 2,   ice: 1,
    fighting: 1, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2,
  },
  ground: {
    normal: 1, fire: 2,   water: 1,   electric: 2, grass: 0.5, ice: 1,
    fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5,
    rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1,
  },
  flying: {
    normal: 1, fire: 1,   water: 1,   electric: 0.5, grass: 2, ice: 1,
    fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2,
    rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1,
  },
  psychic: {
    normal: 1, fire: 1,   water: 1,   electric: 1, grass: 1,   ice: 1,
    fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1,
    rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1,
  },
  bug: {
    normal: 1, fire: 0.5, water: 1,   electric: 1, grass: 2,   ice: 1,
    fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1,
    rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5,
  },
  rock: {
    normal: 1, fire: 2,   water: 1,   electric: 1, grass: 1,   ice: 2,
    fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2,
    rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1,
  },
  ghost: {
    normal: 0, fire: 1,   water: 1,   electric: 1, grass: 1,   ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1,
    rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1,
  },
  dragon: {
    normal: 1, fire: 1,   water: 1,   electric: 1, grass: 1,   ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0,
  },
  dark: {
    normal: 1, fire: 1,   water: 1,   electric: 1, grass: 1,   ice: 1,
    fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1,
    rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 0.5, fairy: 0.5,
  },
  steel: {
    normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2,
  },
  fairy: {
    normal: 1, fire: 0.5, water: 1,   electric: 1, grass: 1,   ice: 1,
    fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1,
  },
};

// ─── Helper functions ─────────────────────────────────────────────────────────

const ALL_TYPES = Object.keys(typeChart) as TypeName[];

/** Effectiveness of one attacking type against one defending type. */
export function getEffectiveness(
  attackingType: TypeName,
  defendingType: TypeName
): TypeEffectiveness {
  return typeChart[attackingType][defendingType];
}

/** Effectiveness of one attacking type against a dual-type defender.
 *  Multiplies the two individual matchups, which can produce 0.25x or 4x. */
export function getDualTypeEffectiveness(
  attackingType: TypeName,
  defendingTypeA: TypeName,
  defendingTypeB: TypeName
): number {
  return (
    typeChart[attackingType][defendingTypeA] *
    typeChart[attackingType][defendingTypeB]
  );
}

/** Returns every attacking type's effectiveness against a single defending type. */
export function getAttackersAgainst(
  defendingType: TypeName
): Record<TypeName, TypeEffectiveness> {
  return Object.fromEntries(
    ALL_TYPES.map((atk) => [atk, typeChart[atk][defendingType]])
  ) as Record<TypeName, TypeEffectiveness>;
}

/** Returns this attacking type's effectiveness against every defending type. */
export function getDefendersAgainst(
  attackingType: TypeName
): Record<TypeName, TypeEffectiveness> {
  return { ...typeChart[attackingType] };
}

/** Computes full defensive matchups for a single- or dual-type Pokémon. */
export function getDefensiveMatchups(defendingTypes: TypeName[]): {
  weaknesses: TypeName[];
  resistances: TypeName[];
  immunities: TypeName[];
} {
  const weaknesses: TypeName[] = [];
  const resistances: TypeName[] = [];
  const immunities: TypeName[] = [];

  for (const atk of ALL_TYPES) {
    const eff =
      defendingTypes.length === 2
        ? getDualTypeEffectiveness(atk, defendingTypes[0], defendingTypes[1])
        : getEffectiveness(atk, defendingTypes[0]);

    if (eff === 0) immunities.push(atk);
    else if (eff < 1) resistances.push(atk);
    else if (eff > 1) weaknesses.push(atk);
  }

  return { weaknesses, resistances, immunities };
}

// ─── UI colours ───────────────────────────────────────────────────────────────

export const TYPE_COLORS: Record<TypeName, string> = {
  normal:   "bg-gray-400",
  fire:     "bg-orange-500",
  water:    "bg-blue-500",
  electric: "bg-yellow-400",
  grass:    "bg-green-500",
  ice:      "bg-cyan-300",
  fighting: "bg-red-700",
  poison:   "bg-purple-500",
  ground:   "bg-yellow-600",
  flying:   "bg-indigo-400",
  psychic:  "bg-pink-500",
  bug:      "bg-lime-500",
  rock:     "bg-yellow-700",
  ghost:    "bg-purple-700",
  dragon:   "bg-indigo-700",
  dark:     "bg-gray-700",
  steel:    "bg-gray-500",
  fairy:    "bg-pink-300",
};
