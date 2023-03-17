import { properCase, sortObjectByValue } from "./text-utils";

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

    const pokemon = response.results.map(({ name }: { name: string }) => ({
      name: properCase(name),
      value: name,
    }));
    pokemon.sort(sortObjectByValue);
    return pokemon;
  }

  async getPokemonByName(name: string) {
    const response = await this.makeGetRequest(`pokemon/${name.toLowerCase()}`);
    return response;
  }
}

export default PokeAPIService;
