import { useMemo, useContext, useState, useEffect } from "react";
import _ from "lodash";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { properCase, sortObjectByValue } from "~/utils/text-utils";

import Select from "../common/select";
import { PokemonContext } from "~/pokemon-context";
import EditIcons from "./edit-icons";
import PokeAPIService from "~/utils/pokeapi-service";
import SpriteFrame from "../common/sprite-frame";
import { scoreMoves } from "~/utils/helpers";
import { isFullPokemon } from "~/utils/type-guards";

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
  const [moveScores, setMoveScores] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const P = new PokeAPIService();
    const getFullPoke = async () => {
      const result = await P.getPokemonByName([targetPoke.name]);
      setFullPoke(result[0]);
    };

    getFullPoke();
  }, [targetPoke.name]);

  useEffect(() => {
    const getMoveScores = async () => {
      if (isFullPokemon(fullPoke)) {
        const result = await scoreMoves(fullPoke, versionGroup);
        setMoveScores(result);
      }
    };
    getMoveScores();
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

  if (!fullPoke.id) {
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
            <span>
              {Math.round(
                Object.values(moveScores).reduce((total, cur) => total + cur, 0)
              )}
            </span>
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
