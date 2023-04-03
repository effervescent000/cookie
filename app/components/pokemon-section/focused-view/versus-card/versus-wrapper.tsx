import { useContext, useState, useEffect } from "react";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";
import { scoreTeamMovesVsTarget } from "~/utils/scoring-helpers";
import { properCase } from "~/utils/text-utils";

const VersusWrapper = ({
  pokemon,
  gen,
  hidden,
}: {
  pokemon: IPokemonFull;
  gen: number;
  hidden?: boolean;
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
    <div data-cy="versus-card">
      {hidden &&
        versusValues.slice(0, 2).map(({ pokemon, scores }) =>
          scores.length ? (
            <div key={pokemon.name}>
              Use {properCase(pokemon.name)} with {properCase(scores[0].name)} (
              {scores[0].score} pts)
            </div>
          ) : (
            ""
          )
        )}
    </div>
  );
};

export default VersusWrapper;
