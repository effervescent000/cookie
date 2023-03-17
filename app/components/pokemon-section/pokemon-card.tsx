import { useMemo, useContext } from "react";
import _ from "lodash";

import type { IPokemonFull } from "~/interfaces";

import { properCase, sortObjectByValue } from "~/utils/text-utils";

import Select from "../common/select";
import { PokemonContext } from "~/pokemon-context";
import EditIcons from "./edit-icons";

const PokemonInput = ({
  targetPoke,
  currentLocation,
}: {
  targetPoke: IPokemonFull;
  currentLocation: string;
}) => {
  const { versionGroup } = useContext(PokemonContext);
  const { name: targetName, id: targetId, moves: targetMoves } = targetPoke;

  const moveList = useMemo(() => {
    const moves = targetMoves;
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
  }, [targetMoves, versionGroup]);

  return (
    <div className="flex">
      <div>
        <div>
          <span>{properCase(targetName)}</span>
        </div>
        <div>
          {/* sprite goes here */}
          <EditIcons currentLocation={currentLocation} pokemon={targetPoke} />
        </div>
      </div>
      <div>
        {_.range(4).map((i) => (
          <Select key={`${targetId}-${i}`} options={moveList} />
        ))}
      </div>
    </div>
  );
};

export default PokemonInput;
