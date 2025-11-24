import React, { useState, useEffect } from 'react';
import type { Pokemon } from '../models/pokemon';

interface PokemonSearchProps {
  onSearch: (searchTerm: string, selectedType: string) => void;
  pokemons: Pokemon[];  
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ onSearch, pokemons }) => {  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [availableTypes, setAvailableTypes] = useState<string[]>(['all']);

  useEffect(() => {
    if (pokemons && pokemons.length > 0) {
      const allTypes = new Set<string>();
      pokemons.forEach(pokemon => {
        if (pokemon.types && Array.isArray(pokemon.types)) {
          pokemon.types.forEach(type => allTypes.add(type));
        }
      });
      setAvailableTypes(['all', ...Array.from(allTypes).sort()]);
    }
  }, [pokemons]);



  useEffect(() => {
    onSearch(searchTerm, selectedType);
  }, [searchTerm, selectedType, onSearch]);

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Rechercher un Pokémon
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Nom du Pokémon..."
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Filtrer par type
          </label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;