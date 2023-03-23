import { useMemo, useContext, useState, useEffect, useCallback } from "react";
import _ from "lodash";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { properCase, sortObjectByValue } from "~/utils/text-utils";

import Select from "../common/select";
import { PokemonContext } from "~/pokemon-context";
import EditIcons from "./edit-icons";
import PokeAPIService from "~/utils/pokeapi-service";
import SpriteFrame from "../common/sprite-frame";
import { makeTotalsStats, scoreMoves } from "~/utils/helpers";
import { isFullPokemon } from "~/utils/type-guards";
import ScoreCard from "./score-card";

const PokemonInput = ({
  targetPoke,
  currentLocation,
}: {
  targetPoke: IPokeSkeleton;
  currentLocation: string;
}) => {
  const { versionGroup, mergeIntoBench, mergeIntoTeam } =
    useContext(PokemonContext);
  const [fullPoke, setFullPoke] = useState<IPokemonFull>({} as IPokemonFull);
  const [loading, setLoading] = useState(true);

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

  const getMoveScores = useCallback(async () => {
    if (isFullPokemon(fullPoke)) {
      const result = await scoreMoves(fullPoke, versionGroup);
      return Object.values(result).reduce((total, cur) => total + cur, 0);
    }
    return 0;
  }, [fullPoke, versionGroup]);

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
            <ScoreCard callback={getMoveScores} />
            <ScoreCard callback={async () => makeTotalsStats(fullPoke)} />
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
