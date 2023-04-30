import axios from 'axios';
import Pokemon from '../interfaces/pokemon.interface';

export default class PokemonService {
  private readonly apiUrl: string = 'https://pokeapi.co/api/v2';

  async getAllPokemon(limit?: number, page?: number, search?: string): Promise<Pokemon[]> {

    let url: string = `${this.apiUrl}/pokemon?offset=0&limit=1280`;
    let offset: number = 1;

    if (limit && page) {
      offset = (page - 1) * limit;
    }

    if (limit) {
      url = `${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`;
    }

    const response = await axios.get(url);
    let pokemonList: Pokemon[] = response.data.results;


    if (search && search != 'undefined') {
      // url = `${this.apiUrl}/pokemon?offset=0&limit=1118&q=${search}`;
      const filteredPokemons = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      pokemonList = filteredPokemons;
    }


    return pokemonList.sort((a, b) => a.name.localeCompare(b.name));
  }


  async getPokemon(name: string): Promise<Pokemon | String> {

    try {

      const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      const response = await axios.get(url);
      let pokemon: any = response?.data;
      pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type:any) => type.type.name).join(', '),
        height: pokemon.height,
        weight: pokemon.weight,
        sprites: pokemon.sprites,
        abilities: pokemon.abilities.map((ability:any) => ability.ability.name).join(', '),
        stats: pokemon.stats
      };

      return pokemon;

    } catch (error: any) {
      return '';
    }

  }
}