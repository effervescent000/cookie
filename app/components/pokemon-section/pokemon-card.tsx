import { useMemo, useContext, useState, useEffect } from "react";
import _ from "lodash";
import sortArray from "sort-array";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { properCase, sortObjectByValue } from "~/utils/text-utils";
import { PokemonContext } from "~/pokemon-context";
import {
  makeTeamDefensiveValues,
  makeTotalsStats,
  scoreMoves,
  sumValues,
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
  scores,
}: {
  targetPoke: IPokeSkeleton;
  currentLocation: string;
  scores: { [key: number]: { [key: string]: number } };
}) => {
  const { versionGroup, mergeIntoBench, mergeIntoTeam, team } =
    useContext(PokemonContext);
  const [fullPoke, setFullPoke] = useState<IPokemonFull>({} as IPokemonFull);
  const [loading, setLoading] = useState(true);
  const [moveScores, setMoveScores] = useState(0);
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
      setMoveScores(
        Object.values(result).reduce((total, cur) => total + cur, 0) / 10
      );
    };

    if (isFullPokemon(fullPoke)) {
      getMoveScores();
      setStatTotal(makeTotalsStats(fullPoke));
    }
  }, [fullPoke, versionGroup]);

  useEffect(() => {
    const calcDeltas = async () => {
      if (isFullPokemon(fullPoke)) {
        const P = new PokeAPIService();
        const currentScores = await makeTeamDefensiveValues(team, P);
        const result = await Promise.all(
          team.map(async (teamPoke, i) => {
            const newTeam = [...team];
            newTeam[i] = targetPoke;
            const newValues = await makeTeamDefensiveValues(newTeam, P);
            return {
              id: teamPoke.id,
              delta: sumValues(currentScores) - sumValues(newValues),
            };
          })
        );
        sortArray(result, { by: "delta", order: "desc" });
        setDeltas(result);
      }
    };

    calcDeltas();
  }, [fullPoke, targetPoke, team]);

  const moveList = useMemo(() => {
    const { moves } = fullPoke;
    if (!moves) return [];
    const filteredMoves = moves
      .map(({ move: { name }, version_group_details }) => {
        const match = version_group_details.find(
          (detail) => detail.version_group.name === versionGroup
        );
        if (match) return { name: properCase(name), value: name };
        return undefined;
      })
      .filter((move) => !!move) as { name: string; value: string }[];
    filteredMoves.sort(sortObjectByValue);
    return filteredMoves;
  }, [fullPoke, versionGroup]);

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
    <div className="flex">
      <div>
        <div>
          <span>{properCase(targetPoke.name)}</span>
        </div>
        <div className="w-[192px]">
          <SpriteFrame pokemon={fullPoke} />
          <div className="flex justify-between">
            <ScoreCard label="Move score" value={moveScores} />
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
