import { useContext, useState, useEffect } from "react";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";
import { scoreTeamMovesVsTarget } from "~/utils/scoring-helpers";
import { properCase } from "~/utils/text-utils";

const VersusCard = ({
  pokemon,
  gen,
}: {
  pokemon: IPokemonFull;
  gen: number;
}) => {
  const [versusValues, setVersusValues] = useState<
    { pokemon: IPokeSkeleton; scores: { [key: string]: any } }[]
  >([]);

  const { team, versionGroup } = useContext(PokemonContext);

  useEffect(() => {
    const getVersusValues = async () => {
      const P = new PokeAPIService();
      if (pokemon && team.length) {
        const result = await scoreTeamMovesVsTarget({
          team,
          target: pokemon,
          P,
          gen,
          versionGroup,
        });
        setVersusValues(result);
      }
    };

    getVersusValues();
  }, [gen, pokemon, team, versionGroup]);

  return (
    <div>
      {versusValues.slice(0, 2).map(({ pokemon, scores }) => (
        <div key={pokemon.name}>
          Use {properCase(pokemon.name)} with {properCase(scores[0].name)}
        </div>
      ))}
    </div>
  );
};

export default VersusCard;
