import { useState, useEffect } from "react";

import type {
  IEvolutionChainLink,
  IEvolutionResponse,
  IPokemonFull,
  ISpeciesResponse,
} from "~/interfaces";

import PokeAPIService from "~/utils/pokeapi-service";

const EvolutionSelector = ({
  pokemon,
  evolve,
}: {
  pokemon: IPokemonFull;
  evolve: (arg0: string) => void;
}) => {
  const [evolutionInfo, setEvolutionInfo] = useState<
    IEvolutionResponse | undefined
  >();
  const [speciesData, setspeciesData] = useState<ISpeciesResponse | undefined>(
    undefined
  );
  const [currentStage, setCurrentStage] = useState<
    IEvolutionChainLink | undefined
  >(undefined);

  useEffect(() => {
    const P = new PokeAPIService();

    const getSpeciesData = async () => {
      const result = await P.getSpecies(pokemon.species.name);
      setspeciesData(result);
    };

    getSpeciesData();
  }, [pokemon]);

  useEffect(() => {
    const getEvolutionInfo = async () => {
      const P = new PokeAPIService();
      if (speciesData) {
        const result = await P.getEvolutionDetails(
          speciesData.evolution_chain.url
        );
        setEvolutionInfo(result);
        setCurrentStage(findCurrentStage(result.chain));
      }
    };

    getEvolutionInfo();
  }, [speciesData]);

  const findCurrentStage = (
    chainLink: IEvolutionChainLink
  ): IEvolutionChainLink | undefined => {
    if (chainLink.species.name === pokemon.name) return chainLink;
    if (chainLink.evolves_to.length) {
      return chainLink.evolves_to
        .map((link) => findCurrentStage(link))
        .find((child) => !!child);
    }
  };

  const canHandleEvolution = () => {
    if (evolutionInfo && currentStage) {
      const evolvesTo = currentStage?.evolves_to;
      return evolvesTo && evolvesTo.length === 1;
    }
    return false;
  };

  const pushEvolution = () =>
    currentStage?.evolves_to.length &&
    evolve(currentStage.evolves_to[0].species.name);

  return (
    <div>
      {canHandleEvolution() && (
        <button data-cy="evolve-btn" onClick={pushEvolution}>
          Evolve
        </button>
      )}
    </div>
  );
};

export default EvolutionSelector;
