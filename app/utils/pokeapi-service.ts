import type { PokeAPIResponse } from "~/interfaces";

class PokeAPIService {
  rootUrl: string;

  constructor() {
    this.rootUrl = "https://pokeapi.co/api/v2";
  }

  async makeGetRequest(endpoint: string) {
    try {
      const response = await fetch(`${this.rootUrl}/${endpoint}`);
      const json: PokeAPIResponse = await response.json();
      return json.results;
    } catch (error) {
      console.log(error);
    }
  }

  async getRegions() {
    const response = await this.makeGetRequest("region");
    return response?.map((region) => region.name);
  }
}

export default PokeAPIService;
