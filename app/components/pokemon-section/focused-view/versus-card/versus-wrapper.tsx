import { useContext, useState, useEffect } from "react";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import { useMoveList } from "~/utils/hooks/use-move-list";
import PokeAPIService from "~/utils/pokeapi-service";
import { scoreTeamMovesVsTarget } from "~/utils/scoring-helpers";
import { properCase } from "~/utils/text-utils";
import MoveSelectWrapper from "./move-select-wrapper";

const VersusWrapper = ({
  pokemon,
  gen,
  show,
}: {
  pokemon: IPokemonFull;
  gen: number;
  show?: boolean;
}) => {
  const { team, versionGroup } = useContext(PokemonContext);

  const [versusValues, setVersusValues] = useState<
    { pokemon: IPokeSkeleton; scores: { [key: string]: any } }[]
  >([]);
  const [skeleton, setSkeleton] = useState<IPokeSkeleton>({
    id: -1,
    name: pokemon.name,
    moves: { 0: "", 1: "", 2: "", 3: "" },
  });
  const moveList = useMoveList({
    fullPokemon: pokemon,
    versionGroup,
    targetPoke: skeleton,
  });

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

  const mergeMove = (move: string, i: number) => {
    setSkeleton({ ...skeleton, moves: { ...skeleton.moves, [i]: move } });
  };

  const shouldBeVisible = () => {
    return show && versusValues.length > 0;
  };

  return (
    <div data-cy="versus-card">
      {shouldBeVisible() && (
        <>
          <MoveSelectWrapper
            moveList={moveList}
            existingMoves={skeleton.moves}
            merge={mergeMove}
          />
          {versusValues.slice(0, 2).map(({ pokemon, scores }) =>
            scores.length ? (
              <div key={pokemon.name}>
                Use {properCase(pokemon.name)} with {properCase(scores[0].name)}{" "}
                ({scores[0].score} pts)
              </div>
            ) : (
              ""
            )
          )}
        </>
      )}
    </div>
  );
};

export default VersusWrapper;
