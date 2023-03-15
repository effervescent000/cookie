import { useContext } from "react";
import { PokemonContext } from "~/pokemon-context";

import GenListing from "./gen";

const GenPicker = () => {
  const { gen: selectedGen, setGen } = useContext(PokemonContext);

  const genList = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
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
