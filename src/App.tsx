import React from 'react';
import Navbar from "./components/Navbar";
import PokemonCard from "./pages/PokemonCard";
import './App.css';
import { usePokemons } from './hooks/usepokemons'; 

const App: React.FC = () => {
  const { pokemons, count, removePokemon } = usePokemons();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-8">
          Notre équipe est composée de {count} Pokémon
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemons.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              onRemove={removePokemon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;
