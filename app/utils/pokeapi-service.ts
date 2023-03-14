class PokeAPIService {
  rootUrl: string;

  constructor() {
    this.rootUrl = "https://pokeapi.co/api/v2";
  }

  async makeGetRequest(endpoint: string) {
    try {
      const response = await fetch(`${this.rootUrl}/${endpoint}`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async getPokemonByRegion(region: string) {
    const response = await this.makeGetRequest(`pokedex/${region}`);
    const pokemon = response.pokemon_entries.map(
      (p: any) => p.pokemon_species.name
    );
    pokemon.sort();
    return pokemon;
  }
}

export default PokeAPIService;
