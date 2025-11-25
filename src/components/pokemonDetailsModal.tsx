import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Pokemon } from '../models/pokemon';
import PokemonService from '../services/pokemonService';


const PokemonDetailsModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      PokemonService.getPokemonById(Number(id))
        .then(setPokemon)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleClose = () => {
    navigate(-1); // Revient à la page précédente dans l'historique
  };

  if (loading) return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><p>Chargement...</p></div>;
  if (!pokemon) return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><p>Pokémon non trouvé</p></div>;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
        onClick={e => e.stopPropagation()}
      >
                <button onClick={handleClose}>
                    <img
                        src="/src/assets/close.png"
                        alt="Fermer"
                        className="h-4 w-4" 
                    />
                </button>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <img
                            src={pokemon.picture}
                            alt={pokemon.name}
                            className="w-full h-auto max-h-96 object-contain"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon.name}</h1>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Informations</h2>
                            <p><span className="font-medium">ID:</span> {pokemon.id}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Types</h2>
                            <div className="flex gap-2">
                                {pokemon.types.map((type, index) => (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${type === 'Feu' ? 'bg-red-100 text-red-800' :
                                            type === 'Eau' ? 'bg-blue-100 text-blue-800' :
                                                type === 'Plante' ? 'bg-green-100 text-green-800' :
                                                    type === 'Poison' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailsModal;