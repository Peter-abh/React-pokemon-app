import React, { useState, useMemo } from "react";
import { usePokemons } from "../hooks/usepokemons";
import { PokemonCard } from "./PokemonCard";
//import PokemonDetailsModal from "../components/pokemonDetailsModal";
import PokemonSearch from "../components/PokemonSearch";
//import type { Pokemon } from "../models/pokemon";

const PokemonList: React.FC = () => {
  const { pokemons, removePokemon, loading } = usePokemons();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredPokemons = useMemo(() => {
    let results = [...pokemons];

    // Filtrage par nom
    if (searchTerm) {
      results = results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par type
    if (selectedType && selectedType !== 'all') {
      results = results.filter(pokemon =>
        pokemon.types.some(type =>
          type.toLowerCase() === selectedType.toLowerCase()
        )
      );
    }

    return results;
  }, [pokemons, searchTerm, selectedType]);

  const handleSearch = (newSearchTerm: string, newSelectedType: string) => {
    setSearchTerm(newSearchTerm);
    setSelectedType(newSelectedType);
  };

  if (!loading && pokemons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucun Pokémon disponible</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Chargement des Pokémon...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Notre équipe est composée de {filteredPokemons.length} Pokémon{filteredPokemons.length > 1 ? 's' : ''}
      </h2>

      <PokemonSearch onSearch={handleSearch} pokemons={pokemons} />

      {filteredPokemons.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun Pokémon ne correspond à votre recherche</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              picture={pokemon.picture}
              types={pokemon.types}
              onRemove={removePokemon}
              //onViewDetails={() => handleViewDetails(pokemon)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;