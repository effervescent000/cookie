import sortArray from "sort-array";
import type {
  IEvolutionResponse,
  IMoveResponse,
  IPokemonFull,
  IResourceListItem,
  ISpeciesResponse,
  ITypeResponse,
  IVersionGroupResponse,
} from "~/interfaces";

import { sortObject } from "./text-utils";

const cacheName = "pokecache";
const ROOT_URL = "https://pokeapi.co/api/v2";

const mergePokesIntoResourceList = async (
  newPokes: IResourceListItem[]
): Promise<(IResourceListItem | IPokemonFull)[]> => {
  if ("caches" in window) {
    const cache = await caches.open(cacheName);
    const pokemon = await Promise.all(
      newPokes.map(async (miniPoke) => {
        const foundPoke = await cache.match(
          `${ROOT_URL}/pokemon/${miniPoke.name}`
        );
        return foundPoke?.json() || miniPoke;
      })
    );
    pokemon.sort(sortObject);
    return pokemon;
  }
  const pokemon = [...newPokes];
  pokemon.sort(sortObject);
  return pokemon;
};

const mergeMovesIntoResourceList = async (
  newMoves: IResourceListItem[]
): Promise<(IResourceListItem | IMoveResponse)[]> => {
  if ("caches" in window) {
    const cache = await caches.open(cacheName);
    const moves = await Promise.all(
      newMoves.map(async (miniMove) => {
        const foundMove = await cache.match(
          `${ROOT_URL}/move/${miniMove.name}`
        );
        return foundMove?.json() || miniMove;
      })
    );
    sortArray(moves, { by: "name" });
    return moves;
  }
  const moves = [...newMoves];
  sortArray(moves, { by: "name" });
  return moves;
};

class PokeAPIService {
  async makeGetRequest(endpoint: string) {
    try {
      const url = endpoint.includes("https")
        ? endpoint
        : `${ROOT_URL}/${endpoint}`;
      if ("caches" in window) {
        const cache = await caches.open(cacheName);
        const matchedResponse = await cache.match(url);
        if (matchedResponse) {
          return await matchedResponse.json();
        }
        await cache.add(url);
        const response = await cache.match(url);
        if (response) {
          const json = await response.json();
          return json;
        }
      }
      const response = await fetch(`${ROOT_URL}/${endpoint}`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPokemon() {
    const response = await this.makeGetRequest("pokemon?limit=1300");

    const pokemonRaw = response.results.filter(
      (poke: IResourceListItem) =>
        !poke.name.match(/-mega/) && !poke.name.match(/-gmax/)
    );
    const pokemon = await mergePokesIntoResourceList(pokemonRaw);
    return pokemon;
  }

  async getPokemonByName(names: string[]): Promise<IPokemonFull[]> {
    const results = await Promise.all(
      names.map(async (name) => {
        const response = await this.makeGetRequest(
          `pokemon/${name.toLowerCase()}`
        );
        return response;
      })
    );
    return results;
  }

  async getType(type: string): Promise<ITypeResponse> {
    const response = await this.makeGetRequest(`type/${type.toLowerCase()}`);
    return response;
  }

  async getAllMoves() {
    const response = await this.makeGetRequest("move?limit=1000");
    const mergedMoves = await mergeMovesIntoResourceList(response.results);
    return mergedMoves;
  }

  async getMove(move: string): Promise<IMoveResponse> {
    const response = await this.makeGetRequest(`move/${move}`);
    return response;
  }

  async getVersionGroup(versionGroup: string): Promise<IVersionGroupResponse> {
    const response = await this.makeGetRequest(`version-group/${versionGroup}`);
    return response;
  }

  async getSpecies(species: string): Promise<ISpeciesResponse> {
    const response = await this.makeGetRequest(`pokemon-species/${species}`);
    return response;
  }

  async getEvolutionDetails(url: string): Promise<IEvolutionResponse> {
    const response = await this.makeGetRequest(url);
    return response;
  }
}

export default PokeAPIService;
