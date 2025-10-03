import { useState } from "react";
import { pokemonList } from "../pages/mock-pokemon";

export function usePokemons() {
  const [pokemons, setPokemons] = useState(pokemonList);

  const removePokemon = (id: number) => {
    setPokemons(pokemons.filter(p => p.id !== id));
  };

  return {
    pokemons,
    count: pokemons.length,
    removePokemon
  };
}
