import type { Pokemon } from '../models/pokemon';
import AuthentificationService from './authentificationService';

const API_URL = 'http://localhost:8000/api';

export default class PokemonService {
  static async getPokemons(): Promise<Pokemon[]> {
    const response = await AuthentificationService.authenticatedFetch(`${API_URL}/pokemon`);
    if (!response.ok) throw new Error("Erreur lors du chargement des pokémons");
    const data = await response.json();
    console.log(data);
    if (Array.isArray(data.member)) {
      return data.member;
    }
    if (Array.isArray(data)) {
      return data;
    }
    throw new Error('Format de réponse inattendu pour la liste des pokémons');
  }


  static async getPokemonById(id: number): Promise<Pokemon> {
    const response = await AuthentificationService.authenticatedFetch(`${API_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error('Pokémon introuvable');
    }

    return response.json();
  }

  static async createPokemon(pokemon: Omit<Pokemon, 'id'>): Promise<Pokemon> {
    const response = await AuthentificationService.authenticatedFetch(`${API_URL}/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du Pokémon');
    }

    return response.json();
  }

  static async updatePokemon(id: number, pokemon: Partial<Pokemon>): Promise<Pokemon> {
    const response = await AuthentificationService.authenticatedFetch(`${API_URL}/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du Pokémon');
    }

    return response.json();
  }

  static async deletePokemon(id: number): Promise<void> {
    const response = await AuthentificationService.authenticatedFetch(`${API_URL}/pokemon/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du Pokémon');
    }
  }
}