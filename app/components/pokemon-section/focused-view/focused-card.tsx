import { useContext, useState, useEffect } from "react";

import type { IEvolutionResponse, ISpeciesResponse, IType } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import { properCase } from "~/utils/text-utils";
import PokeAPIService from "~/utils/pokeapi-service";
import { getTypes } from "~/constants/types-constants";
import { getPokemonTypes } from "~/utils/type-helpers";

import TypeLabel from "~/components/common/type-label";
import EvolutionCard from "./evolution-card";
import StatBlock from "./stats-block";
import TypeWeaknessWrapper from "./type-weakness-wrapper";
import CatchRateCard from "./catch-rate-card";
import Button from "~/components/common/button";
import VersusWrapper from "./versus-card/versus-wrapper";
import Checkbox from "~/components/common/checkbox";

const FocusedCard = () => {
  const [evolutionInfo, setEvolutionInfo] = useState<
    IEvolutionResponse | undefined
  >(undefined);
  const [species, setSpecies] = useState<ISpeciesResponse | undefined>(
    undefined
  );
  const [showGuidance, setShowGuidance] = useState(false);

  const {
    focusedPokemon: pokemon,
    setFocusedPokemon,
    gen,
  } = useContext(PokemonContext);

  const typeList = getTypes(gen);
  const thisPokemonTypes = pokemon ? getPokemonTypes(pokemon, gen) : [];

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
    <div data-cy="focus-frame">
      <div className="flex justify-between">
        <Checkbox
          value={showGuidance}
          callback={() => setShowGuidance(!showGuidance)}
          dataCy="guidance-checkbox"
        >
          Show guidance?
        </Checkbox>
        <Button
          dataCy="close-focus-btn"
          onClick={() => setFocusedPokemon(undefined)}
        >
          Close
        </Button>
      </div>

      <div className="max-w-sm border border-light-blue">
        <div className="flex justify-between">
          <div className="flex">
            <div>{properCase(pokemon.species.name)}</div>
            <div className="flex">
              {thisPokemonTypes.map(({ type: { name } }) => (
                <TypeLabel
                  key={name}
                  type={typeList.find(({ key }) => key === name) as IType}
                />
              ))}
            </div>
          </div>
          <div>{species && <CatchRateCard pokemon={species} />}</div>
        </div>
        {evolutionInfo && <EvolutionCard link={evolutionInfo.chain} />}
        <StatBlock pokemon={pokemon} />
        <TypeWeaknessWrapper pokemon={pokemon} />
        <VersusWrapper pokemon={pokemon} gen={gen} show={showGuidance} />
      </div>
    </div>
  );
};

export default FocusedCard;
