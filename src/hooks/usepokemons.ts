import { useState, useEffect, useCallback } from "react";
import type { Pokemon } from "../models/pokemon";
import PokemonService from "../services/pokemonService";

export function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PokemonService.getPokemons();
      setPokemons(data);
    } catch (err) {
      setError("Erreur lors du chargement des Pokémon.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const removePokemon = async (id: number) => {
    try {
      await PokemonService.deletePokemon(id);
      setPokemons(pokemons.filter(p => p.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression du Pokémon.");
      console.error(err);
    }
  };
  
 

  return {
    pokemons,
    loading,
    error,
    removePokemon,
    reloadPokemons: fetchPokemons // Pour rafraîchir la liste manuellement si besoin
  };
}