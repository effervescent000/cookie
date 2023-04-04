import { useContext, useState, useEffect } from "react";
import _ from "lodash";
import sortArray from "sort-array";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";
import { isFullPokemon } from "~/utils/type-guards";

import { properCase } from "~/utils/text-utils";
import { PokemonContext } from "~/pokemon-context";
import {
  makeDefensiveValues,
  makeDelta,
  scoreValues,
} from "~/utils/scoring-helpers";
import { DEF_SCORING_VALUES } from "~/constants/scoring-constants";
import PokeAPIService from "~/utils/pokeapi-service";

import EditIcons from "./edit-icons";
import SpriteFrame from "../common/sprite-frame";
import ScoreCard from "./score-card";
import EvolutionSelector from "./evolution-selector";
import MoveSelectWrapper from "../common/move-select-wrapper";
import { useMoveList } from "~/utils/hooks/use-move-list";

const PokemonCard = ({
  targetPoke,
  currentLocation,
}: {
  targetPoke: IPokeSkeleton;
  currentLocation: string;
}) => {
  const {
    versionGroup,
    mergeIntoBench,
    mergeIntoTeam,
    team,
    teamDefScores,
    teamOffScores,
    moveScores,
    statScores,
    gen,
  } = useContext(PokemonContext);
  const [fullPoke, setFullPoke] = useState<IPokemonFull>({} as IPokemonFull);
  const [loading, setLoading] = useState(true);
  const [deltas, setDeltas] = useState<{ id: number; delta: number }[]>([]);
  const moveList = useMoveList({
    fullPokemon: fullPoke,
    versionGroup,
    targetPoke,
    moveScores,
  });

  useEffect(() => {
    const P = new PokeAPIService();
    const getFullPoke = async () => {
      const result = (await P.getPokemonByName([targetPoke.name]))[0];
      setFullPoke(result);
      setLoading(false);
    };
    setLoading(true);
    getFullPoke();
  }, [targetPoke.name, versionGroup]);

  useEffect(() => {
    const calcDeltas = async () => {
      if (isFullPokemon(fullPoke)) {
        setDeltas([]);
        const P = new PokeAPIService();
        const thisPokeDefValues = {
          name: targetPoke.name,
          values: scoreValues({
            values: await makeDefensiveValues({ pokemon: fullPoke, P, gen }),
            scores: DEF_SCORING_VALUES,
          }),
        };
        const result = team.map((teamPoke) => {
          return {
            id: teamPoke.id,
            delta: makeDelta({
              teamDefScores,
              scoringPokeDefValues: thisPokeDefValues,
              teamPokemon: teamPoke,
              scoringPokemon: targetPoke,
              moveScores,
              statScores,
            }),
          };
        });
        sortArray(result, { by: "delta", order: "desc" });
        setDeltas(result);
      }
    };

    if (
      Object.keys(teamDefScores.raw).length &&
      Object.keys(moveScores).length &&
      Object.keys(statScores).length
    )
      calcDeltas();
  }, [
    fullPoke,
    gen,
    moveScores,
    statScores,
    targetPoke,
    team,
    teamDefScores,
    teamOffScores,
  ]);

  const mergeMove = (value: string, moveIndex: number) => {
    if (currentLocation === "team") {
      mergeIntoTeam({
        ...targetPoke,
        moves: { ...targetPoke.moves, [moveIndex]: value },
      });
    } else {
      mergeIntoBench({
        ...targetPoke,
        moves: { ...targetPoke.moves, [moveIndex]: value },
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex" data-cy={`poke-card-${targetPoke.name}`}>
      <div>
        <div>
          <span
            className={`${
              targetPoke.name.length >= 12
                ? targetPoke.name.length >= 20
                  ? "text-xs"
                  : "text-sm"
                : ""
            }`}
          >
            {properCase(targetPoke.name)}
          </span>
        </div>
        <div>
          <SpriteFrame pokemon={fullPoke} />
          <div className="flex items-end justify-between">
            <ScoreCard
              label="Move score"
              value={_.get(moveScores, `[${targetPoke.id}].final`) || 0}
              dataCy="move-score-card"
            />
            {currentLocation === "bench" ? (
              <ScoreCard
                label={
                  deltas.length
                    ? `Switched for ${
                        team.find(({ id: teamId }) => deltas[0].id === teamId)
                          ?.name
                      }`
                    : undefined
                }
                value={deltas.length ? deltas[0].delta : 0}
                dataCy="delta-card"
              />
            ) : (
              <EvolutionSelector
                pokemon={fullPoke}
                evolve={(newSpecies: string) =>
                  mergeIntoTeam({ ...targetPoke, name: newSpecies })
                }
              />
            )}
            <ScoreCard
              label="Stat score"
              value={statScores[targetPoke.id] || 0}
              dataCy="stat-card"
            />
          </div>
          <EditIcons
            currentLocation={currentLocation}
            pokemon={targetPoke}
            fullPoke={fullPoke}
          />
        </div>
      </div>
      <MoveSelectWrapper
        moveList={moveList}
        merge={mergeMove}
        existingMoves={targetPoke.moves}
        classes="grid-cols-1"
      />
    </div>
  );
};

export default PokemonCard;
