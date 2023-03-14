import type { Dispatch, SetStateAction } from "react";

import GenListing from "./gen";

const GenPicker = ({
  setGen,
  gen: selectedGen,
}: {
  setGen: Dispatch<SetStateAction<number>>;
  gen: number;
}) => {
  const genList = ["RB", "GS", "RS", "DP", "BW", "XY", "SM", "SS", "SV"];
  return (
    <div className="flex gap-3">
      {genList.map((opt, i) => (
        <GenListing
          key={opt}
          label={opt}
          selectedGen={selectedGen}
          value={i + 1}
          setGen={setGen}
        />
      ))}
    </div>
  );
};

export default GenPicker;
