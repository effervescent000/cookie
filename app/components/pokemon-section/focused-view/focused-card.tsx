import { useContext, useState, useEffect } from "react";

import type { IEvolutionResponse, ISpeciesResponse, IType } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import { TYPES } from "~/constants/types-constants";
import { properCase } from "~/utils/text-utils";
import PokeAPIService from "~/utils/pokeapi-service";

import TypeLabel from "~/components/common/type-label";
import EvolutionCard from "./evolution-card";
import StatBlock from "./stats-block";
import TypeWeaknessWrapper from "./type-weakness-wrapper";
import CatchRateCard from "./catch-rate-card";

const FocusedCard = () => {
  const [evolutionInfo, setEvolutionInfo] = useState<
    IEvolutionResponse | undefined
  >(undefined);
  const [species, setSpecies] = useState<ISpeciesResponse | undefined>(
    undefined
  );
  const { focusedPokemon: pokemon } = useContext(PokemonContext);

  useEffect(() => {
    const P = new PokeAPIService();
    const getEvolutionInfo = async () => {
      if (pokemon) {
        setEvolutionInfo(undefined);
        const speciesResult = await P.getSpecies(pokemon.species.name);
        setSpecies(speciesResult);
        const evolutionResult = await P.getEvolutionDetails(
          speciesResult.evolution_chain.url
        );

        setEvolutionInfo(evolutionResult);
      }
    };

    getEvolutionInfo();
  }, [pokemon]);

  if (!pokemon) return <></>;

  return (
    <div className="max-w-sm border border-light-blue">
      <div className="flex justify-between">
        <div className="flex">
          <div>{properCase(pokemon.species.name)}</div>
          <div className="flex">
            {pokemon.types.map(({ type: { name } }) => (
              <TypeLabel
                key={name}
                type={TYPES.find(({ key }) => key === name) as IType}
              />
            ))}
          </div>
        </div>
        <div>{species && <CatchRateCard pokemon={species} />}</div>
      </div>
      {evolutionInfo && <EvolutionCard link={evolutionInfo.chain} />}
      <StatBlock pokemon={pokemon} />
      <TypeWeaknessWrapper pokemon={pokemon} />
    </div>
  );
};

export default FocusedCard;
