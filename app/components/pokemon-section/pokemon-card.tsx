import { useMemo, useContext, useState, useEffect } from "react";
import _ from "lodash";
import sortArray from "sort-array";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { properCase } from "~/utils/text-utils";
import { PokemonContext } from "~/pokemon-context";
import {
  filterKey,
  makeTotalsStats,
  scoreMoves,
  compileTeamValues,
  sumCompiledTeamValues,
  makeDefensiveValues,
  makeOffensiveValues,
  scoreDefValues,
  scoreOffValues,
} from "~/utils/helpers";
import { isFullPokemon } from "~/utils/type-guards";
import PokeAPIService from "~/utils/pokeapi-service";

import Select from "../common/select";
import EditIcons from "./edit-icons";
import SpriteFrame from "../common/sprite-frame";
import ScoreCard from "./score-card";

const PokemonInput = ({
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
  } = useContext(PokemonContext);
  const [fullPoke, setFullPoke] = useState<IPokemonFull>({} as IPokemonFull);
  const [loading, setLoading] = useState(true);
  const [moveScores, setMoveScores] = useState<{ [key: string]: number }>({});
  const [statTotal, setStatTotal] = useState(0);
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
    const getMoveScores = async () => {
      const result = await scoreMoves(fullPoke, versionGroup);
      setMoveScores(result);
    };

    if (isFullPokemon(fullPoke)) {
      getMoveScores();
      setStatTotal(makeTotalsStats(fullPoke));
    }
  }, [fullPoke, versionGroup]);

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
          team.map(async (teamPoke, i) => {
            // const newTeam = [...team];
            // newTeam[i] = targetPoke;
            // const newDefValues = await makeTeamDefensiveValues(newTeam, P);
            const newDefValues = filterKey(teamDefScores.raw, teamPoke.name);
            newDefValues[targetPoke.name] = thisPokeDefValues;
            // const newOffValues = await makeTeamOffensiveValues(newTeam, P);
            const newOffValues = filterKey(teamOffScores.raw, teamPoke.name);
            newOffValues[targetPoke.name] = thisPokeOffValues;
            // debugger;
            return {
              id: teamPoke.id,
              delta:
                sumCompiledTeamValues(compileTeamValues(newDefValues)) -
                teamDefScores.final +
                (sumCompiledTeamValues(compileTeamValues(newOffValues)) -
                  teamOffScores.final),
            };
          })
        );
        sortArray(result, { by: "delta", order: "desc" });
        setDeltas(result);
      }
    };

    if (Object.keys(teamOffScores).length && Object.keys(teamDefScores).length)
      calcDeltas();
  }, [fullPoke, targetPoke, team, teamDefScores, teamOffScores]);

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
              moveScores[name]
                ? Math.round(Math.round(moveScores[name] * 15) / 15)
                : "---"
            })`,
            value: name,
          };
        return undefined;
      })
      .filter((move) => !!move) as { name: string; value: string }[];
    sortArray(filteredMoves, { by: "value" });
    return filteredMoves;
  }, [fullPoke, versionGroup, moveScores]);

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
        <div className="w-[192px]">
          <SpriteFrame pokemon={fullPoke} />
          <div className="flex justify-between">
            <ScoreCard
              label="Move score"
              value={Object.values(moveScores).reduce((x, y) => x + y, 0) / 10}
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
              <></>
            )}
            <ScoreCard label="Stat score" value={statTotal / 100} />
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
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonInput;
