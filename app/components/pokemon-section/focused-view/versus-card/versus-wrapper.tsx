import { useContext, useState, useEffect } from "react";

import type { IMoveResponse, IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import { makeLookup } from "~/utils/general-utils";
import { useMoveList } from "~/utils/hooks/use-move-list";
import PokeAPIService from "~/utils/pokeapi-service";
import { scoreTeamMovesVsTarget } from "~/utils/scoring-helpers";
import { getMoveName } from "~/utils/text-utils";
import MoveSelectWrapper from "../../../common/move-select-wrapper";
import VersusLabel from "./versus-label";

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
    { pokemon: IPokeSkeleton; scores: { [key: string]: any }[] }[]
  >([]);
  const [skeleton, setSkeleton] = useState<IPokeSkeleton>({
    id: -1,
    name: pokemon.name,
    moves: { 0: "", 1: "", 2: "", 3: "" },
  });
  const [fullMoves, setFullMoves] = useState<{ [key: string]: IMoveResponse }>(
    {}
  );

  const moveList = useMoveList({
    fullPokemon: pokemon,
    versionGroup,
    targetPoke: skeleton,
  });

  useEffect(() => {
    const P = new PokeAPIService();
    let mounted = true;
    const getFullMoves = async () => {
      const results = await Promise.all(
        Object.values(skeleton.moves)
          .filter((move) => !!move)
          .map(async (move) => await P.getMove(getMoveName(move)))
      );
      if (mounted) setFullMoves(makeLookup(results, "name"));
    };

    getFullMoves();
    return () => {
      mounted = false;
    };
  }, [skeleton.moves]);

  useEffect(() => {
    setSkeleton({
      id: -1,
      name: pokemon.name,
      moves: { 0: "", 1: "", 2: "", 3: "" },
    });
  }, [pokemon.name]);

  useEffect(() => {
    let mounted = true;
    const getVersusValues = async () => {
      const P = new PokeAPIService();
      if (pokemon && team.length) {
        const result = await scoreTeamMovesVsTarget({
          team,
          targetFull: pokemon,
          targetMoves: fullMoves,
          P,
          gen,
          versionGroup,
        });
        if (mounted) {
          setVersusValues(result);
        }
      }
    };

    getVersusValues();
    return () => {
      mounted = false;
    };
  }, [fullMoves, gen, pokemon, team, versionGroup]);

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
          {versusValues
            .slice(0, 2)
            .map((score, i) =>
              score?.scores.length ? (
                <VersusLabel dataCy={`score-${i}`} key={i} score={score} />
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
