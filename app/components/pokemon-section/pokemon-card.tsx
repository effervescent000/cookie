import { useMemo, useContext, useState, useEffect } from "react";
import _ from "lodash";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { properCase, sortObjectByValue } from "~/utils/text-utils";

import Select from "../common/select";
import { PokemonContext } from "~/pokemon-context";
import EditIcons from "./edit-icons";
import PokeAPIService from "~/utils/pokeapi-service";

const PokemonInput = ({
  targetPoke,
  currentLocation,
}: {
  targetPoke: IPokeSkeleton;
  currentLocation: string;
}) => {
  const { versionGroup } = useContext(PokemonContext);
  const [fullPoke, setFullPoke] = useState<IPokemonFull>({});

  useEffect(() => {
    const getFullPoke = async () => {
      const P = new PokeAPIService();
      const result = await P.getPokemonByName([targetPoke.name]);
      setFullPoke(result[0]);
    };

    getFullPoke();
  }, [targetPoke.name]);

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
      .filter((move) => !!move);
    filteredMoves.sort(sortObjectByValue);
    return filteredMoves;
  }, [fullPoke, versionGroup]);

  return (
    <div className="flex">
      <div>
        <div>
          <span>{properCase(targetPoke.name)}</span>
        </div>
        <div>
          {/* sprite goes here */}
          <EditIcons currentLocation={currentLocation} pokemon={targetPoke} />
        </div>
      </div>
      <div>
        {_.range(4).map((i) => (
          <Select key={`${targetPoke.id}-${i}`} options={moveList} />
        ))}
      </div>
    </div>
  );
};

export default PokemonInput;
