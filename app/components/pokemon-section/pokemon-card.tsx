import { useMemo, useContext, useState, useEffect } from "react";
import _ from "lodash";
import sortArray from "sort-array";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";
import { isFullPokemon } from "~/utils/type-guards";

import { properCase } from "~/utils/text-utils";
import { PokemonContext } from "~/pokemon-context";
import {
  filterKey,
  compileTeamValues,
  sumCompiledTeamValues,
  makeDefensiveValues,
  makeOffensiveValues,
  scoreDefValues,
  scoreOffValues,
} from "~/utils/helpers";
import PokeAPIService from "~/utils/pokeapi-service";

import Select from "../common/select";
import EditIcons from "./edit-icons";
import SpriteFrame from "../common/sprite-frame";
import ScoreCard from "./score-card";
import EvolutionSelector from "./evolution-selector";

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
  } = useContext(PokemonContext);
  const [fullPoke, setFullPoke] = useState<IPokemonFull>({} as IPokemonFull);
  const [loading, setLoading] = useState(true);
  const [deltas, setDeltas] = useState<{ id: number; delta: number }[]>([]);

  useEffect(() => {
    const getFullPoke = async () => {
      const P = new PokeAPIService();
      const result = (await P.getPokemonByName([targetPoke.name]))[0];
      setFullPoke(result);
      setLoading(false);
    };
    setLoading(true);
    getFullPoke();
  }, [targetPoke.name]);

  useEffect(() => {
    const calcDeltas = async () => {
      if (isFullPokemon(fullPoke)) {
        setDeltas([]);
        const P = new PokeAPIService();
        const thisPokeDefValues = {
          name: targetPoke.name,
          values: scoreDefValues(await makeDefensiveValues(fullPoke, P)),
        };
        const thisPokeOffValues = {
          name: targetPoke.name,
          values: scoreOffValues(await makeOffensiveValues(targetPoke, P)),
        };
        const result = await Promise.all(
          team.map(async (teamPoke) => {
            const newDefValues = filterKey(teamDefScores.raw, teamPoke.name);
            newDefValues[targetPoke.name] = thisPokeDefValues;
            const newOffValues = filterKey(teamOffScores.raw, teamPoke.name);
            newOffValues[targetPoke.name] = thisPokeOffValues;
            return {
              id: teamPoke.id,
              delta:
                sumCompiledTeamValues(compileTeamValues(newDefValues)) -
                teamDefScores.final +
                (sumCompiledTeamValues(compileTeamValues(newOffValues)) -
                  teamOffScores.final) +
                (moveScores[targetPoke.id].finalScore -
                  moveScores[teamPoke.id].finalScore) +
                (statScores[targetPoke.id] - statScores[teamPoke.id]),
            };
          })
        );
        sortArray(result, { by: "delta", order: "desc" });
        setDeltas(result);
      }
    };

    if (Object.keys(teamOffScores).length && Object.keys(teamDefScores).length)
      calcDeltas();
  }, [
    fullPoke,
    moveScores,
    statScores,
    targetPoke,
    team,
    teamDefScores,
    teamOffScores,
  ]);

  const moveList = useMemo(() => {
    const { moves } = fullPoke;
    if (!moves) return [];
    const filteredMoves = moves
      .map(({ move: { name }, version_group_details }) => {
        const match = version_group_details.find(
          (detail) => detail.version_group.name === versionGroup
        );
        if (match)
          return {
            name: `${properCase(name)} (${
              (moveScores[targetPoke.id] && moveScores[targetPoke.id][name]) ||
              "---"
            })`,
            value: name,
          };
        return undefined;
      })
      .filter((move) => !!move) as { name: string; value: string }[];
    sortArray(filteredMoves, { by: "value" });
    return filteredMoves;
  }, [fullPoke, moveScores, targetPoke.id, versionGroup]);

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
          <span>{properCase(targetPoke.name)}</span>
        </div>
        <div className="">
          <SpriteFrame pokemon={fullPoke} />
          <div className="flex items-end justify-between">
            <ScoreCard
              label="Move score"
              value={
                (moveScores[targetPoke.id] &&
                  moveScores[targetPoke.id].finalScore) ||
                0
              }
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
              />
            ) : (
              <EvolutionSelector
                pokemon={fullPoke}
                evolve={(newSpecies: string) =>
                  mergeIntoTeam({ ...targetPoke, name: newSpecies })
                }
              />
            )}
            <ScoreCard label="Stat score" value={statScores[targetPoke.id]} />
          </div>
          <EditIcons
            currentLocation={currentLocation}
            pokemon={targetPoke}
            fullPoke={fullPoke}
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        {_.range(4).map((i) => (
          <Select
            key={`${targetPoke.id}-${i}`}
            options={moveList}
            callback={(value) => mergeMove(value, i)}
            selection={targetPoke.moves[i]}
            dataCy={`move-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
