import { useMemo } from "react";
import _ from "lodash";

import type { IPokemonFull } from "~/interfaces";

import { useVersion } from "~/utils/hooks/useVersion";
import { properCase } from "~/utils/text-utils";

import Select from "../common/select";

const PokemonInput = ({
  targetPoke: { name: targetName, id: targetId, moves: targetMoves },
}: {
  targetPoke: IPokemonFull;
}) => {
  const { version } = useVersion();

  const moveList = useMemo(() => {
    const moves = targetMoves;
    if (!moves) return [];
    const filteredMoves = moves
      .map(({ move: { name }, version_group_details }) => {
        const match = version_group_details.find(
          (detail) => detail.version_group.name === version
        );
        if (match) return { name: properCase(name), value: name };
        return undefined;
      })
      .filter((move) => !!move);
    return filteredMoves;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetName, version, targetId]);

  return (
    <div className="flex">
      <div>{/* sprite goes here */}</div>
      <div>
        {_.range(4).map((i) => (
          <Select key={`${targetId}-${i}`} options={moveList} />
        ))}
      </div>
    </div>
  );
};

export default PokemonInput;
