import React from 'react';

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
  id: number;
  onRemove: (pokemonId: number) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, types, id, onRemove }) => {
  return (
    <div className="w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 capitalize mb-2">
          {name}
        </h3>
        <div className="flex gap-2 justify-center flex-wrap">
          {types.map((type, index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                type === 'fire' ? 'bg-red-100 text-red-800' :
                type === 'water' ? 'bg-blue-100 text-blue-800' :
                type === 'grass' ? 'bg-green-100 text-green-800' :
                type === 'electric' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 flex justify-center border-t border-gray-100">
        <div className="flex gap-4 justify-center mb-6">
                  <img src="../public/supprimer.png" className="h-8 cursor-pointer" alt="corbeille" 
                  onClick={() => onRemove(id) }/> <br />
                </div>
        <a
          href={`/pokemon/${id}`}
          className="text-blue-500 hover:text-blue-700 transition-colors"
          title="Voir les détails"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PokemonCard;