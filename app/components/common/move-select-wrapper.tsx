import _ from "lodash";
import { useContext } from "react";

import { PokemonContext } from "~/pokemon-context";

import SingleMove from "./single-move";

const MoveSelectWrapper = ({
  moveList,
  existingMoves,
  merge,
  classes,
}: {
  moveList: { name: string; value: string }[];
  existingMoves: { [slot: number]: string };
  merge: (move: string, i: number) => void;
  classes?: string;
}) => {
  const { allMoves } = useContext(PokemonContext);

  return (
    <div className={`grid ${classes}`}>
      {_.range(4).map((i) => (
        <SingleMove
          key={i}
          thisMove={existingMoves[i]}
          slot={i}
          moveList={moveList}
          allMoves={allMoves}
          merge={merge}
        />
      ))}
    </div>
  );
};

export default MoveSelectWrapper;
