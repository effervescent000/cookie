import type { IMoveResponse, IResourceListItem } from "~/interfaces";

import Select from "./select";
import TextInputWithOptions from "./text-input-with-options";

const CUSTOM_MOVE_KEY = "_other";

const SingleMove = ({
  moveList,
  thisMove,
  merge,
  classes,
  slot,
  allMoves,
}: {
  moveList: { name: string; value: string }[];
  thisMove: string;
  merge: (move: string, i: number) => void;
  slot: number;
  classes?: string;
  allMoves: (IResourceListItem | IMoveResponse)[];
}) => {
  const isCustomMove = thisMove.includes(CUSTOM_MOVE_KEY);
  const moveName = isCustomMove ? thisMove.split(":")[1] || "" : thisMove;

  return (
    <div>
      <Select
        key={slot}
        options={moveList}
        callback={(value) => merge(value, slot)}
        selection={isCustomMove ? "other" : thisMove}
        dataCy={`move-${slot}`}
      />
      {isCustomMove ? (
        <TextInputWithOptions
          classes="ml-2"
          value={moveName}
          placeholder="Other move"
          callback={(value) => merge(`${CUSTOM_MOVE_KEY}:${value}`, slot)}
          options={allMoves.map(({ name }) => name)}
          dataCy="custom-move-input"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleMove;
