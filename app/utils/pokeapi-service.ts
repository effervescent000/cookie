import type { IPokemonMini } from "~/interfaces";

import { properCase, sortObject, sortObjectByValue } from "./text-utils";

const cacheName = "pokecache";
const ROOT_URL = "https://pokeapi.co/api/v2";

const mergePokesIntoResourceList = async (newPokes: IPokemonMini[]) => {
  if ("caches" in window) {
    const cache = await caches.open(cacheName);
    const pokemon = Promise.all(
      newPokes.map(async (miniPoke: IPokemonMini) => {
        const foundPoke = await cache.match(
          `${ROOT_URL}/pokemon/${miniPoke.name}`
        );
        return foundPoke?.json() || miniPoke;
      })
    );
    return await pokemon;
  }
  return newPokes;
};

class PokeAPIService {
  async makeGetRequest(endpoint: string) {
    try {
      const url = `${ROOT_URL}/${endpoint}`;
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
      const response = await fetch(`${ROOT_URL}/${endpoint}`);
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
    const pokemon = await mergePokesIntoResourceList(pokemonRaw);
    pokemon.sort(sortObject);
  }

  async getPokemonByName(name: string) {
    const response = await this.makeGetRequest(`pokemon/${name.toLowerCase()}`);
    return response;
  }
}

export default PokeAPIService;
