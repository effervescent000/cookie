import { useMemo, useContext } from "react";
import _ from "lodash";

import type { IPokemonFull } from "~/interfaces";

import { properCase, sortObjectByValue } from "~/utils/text-utils";

import Select from "../common/select";
import { PokemonContext } from "~/pokemon-context";

const PokemonInput = ({
  targetPoke: { name: targetName, id: targetId, moves: targetMoves },
}: {
  targetPoke: IPokemonFull;
}) => {
  const { versionGroup } = useContext(PokemonContext);

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
        {/* sprite goes here */}
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
