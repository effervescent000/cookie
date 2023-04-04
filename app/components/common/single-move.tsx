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
  allMoves: string[];
}) => {
  const isCustomMove = thisMove.includes(CUSTOM_MOVE_KEY);
  const moveName = isCustomMove ? thisMove.split(":")[1] || "" : thisMove;

  return (
    <div>
      <Select
        key={slot}
        options={moveList}
        callback={(value) => merge(value, slot)}
        selection={isCustomMove ? "_other" : thisMove}
        dataCy={`move-${slot}`}
      />
      {isCustomMove ? (
        <TextInputWithOptions
          classes="ml-4 w-[10.25rem]"
          value={moveName}
          placeholder="Other move"
          callback={(value) => merge(`${CUSTOM_MOVE_KEY}:${value}`, slot)}
          options={allMoves}
          dataCy="custom-move-input"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleMove;
