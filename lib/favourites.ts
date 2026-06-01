"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "pokedex_favourites";

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavourites(JSON.parse(stored) as string[]);
    } catch {
      // ignore parse/storage errors
    }
  }, []);

  function toggle(name: string) {
    setFavourites((prev) => {
      const next = prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore quota/storage errors
      }
      return next;
    });
  }

  function isFavourite(name: string): boolean {
    return favourites.includes(name);
  }

  return { favourites, toggle, isFavourite };
}
