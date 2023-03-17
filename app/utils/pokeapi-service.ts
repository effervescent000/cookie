import { IPokemonMini } from "~/interfaces";
import { properCase, sortObject, sortObjectByValue } from "./text-utils";

const cacheName = "pokecache";

class PokeAPIService {
  rootUrl: string;

  constructor() {
    this.rootUrl = "https://pokeapi.co/api/v2";
  }

  async makeGetRequest(endpoint: string) {
    try {
      const url = `${this.rootUrl}/${endpoint}`;
      if ("caches" in window) {
        const cache = await caches.open(cacheName);
        const matchedResponse = await cache.match(url);
        if (matchedResponse) {
          return await matchedResponse.json();
        }
        await cache.add(url);
        const response = await cache.match(url);
        const json = await response.json();
        return json;
      }
      const response = await fetch(`${this.rootUrl}/${endpoint}`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async getPokemonByRegion(region: string) {
    const response = await this.makeGetRequest(`pokedex/${region}`);
    const pokemon = response.pokemon_entries.map((p: any) => {
      const pokeName = p.pokemon_species.name;
      return { name: properCase(pokeName), value: pokeName };
    });
    pokemon.sort(sortObjectByValue);
    return pokemon;
  }

  async getAllPokemon() {
    const response = await this.makeGetRequest("pokemon?limit=1300");

    const pokemonRaw = response.results.filter(
      (poke: IPokemonMini) =>
        !poke.name.match(/-mega/) && !poke.name.match(/-gmax/)
    );
    if ("caches" in window) {
      const cache = await caches.open(cacheName);
      const pokemon = Promise.all(
        pokemonRaw.map(async (miniPoke: IPokemonMini) => {
          const foundPoke = await cache.match(
            `${this.rootUrl}/pokemon/${miniPoke.name}`
          );
          return foundPoke?.json() || miniPoke;
        })
      );
      const sortedPokes = (await pokemon).sort(sortObject);
      return sortedPokes;
    }
    return pokemonRaw.sort(sortObject);
  }

  async getPokemonByName(name: string) {
    const response = await this.makeGetRequest(`pokemon/${name.toLowerCase()}`);
    return response;
  }
}

export default PokeAPIService;
