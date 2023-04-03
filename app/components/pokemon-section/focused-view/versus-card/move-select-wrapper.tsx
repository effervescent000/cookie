import _ from "lodash";
import Select from "~/components/common/select";

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
}) => (
  <div className={`grid ${classes}`}>
    {_.range(4).map((i) => (
      <Select
        key={i}
        options={moveList}
        callback={(value) => merge(value, i)}
        selection={existingMoves[i]}
        dataCy={`move-${i}`}
      />
    ))}
  </div>
);

export default MoveSelectWrapper;
