import { useContext, useState, useEffect } from "react";

import type { IType } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import { TYPES } from "~/constants/types-constants";
import { properCase } from "~/utils/text-utils";

import TypeLabel from "~/components/common/type-label";
import PokeAPIService from "~/utils/pokeapi-service";

const FocusedCard = () => {
  const [evolutionInfo, setEvolutionInfo] = useState({});
  const { focusedPokemon: pokemon } = useContext(PokemonContext);

  useEffect(() => {
    const P = new PokeAPIService();
    const getEvolutionInfo = async () => {
      if (pokemon) {
        const speciesResult = await P.getSpecies(pokemon.species.name);
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
    <div className="border border-light-blue">
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
    </div>
  );
};

export default FocusedCard;
