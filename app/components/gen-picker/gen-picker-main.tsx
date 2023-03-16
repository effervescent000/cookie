import { useContext } from "react";
import { VERSIONS } from "~/constants/versions-constants";
import { PokemonContext } from "~/pokemon-context";
import GenHeader from "./gen-header";

const GenPicker = () => {
  const { gen: selectedGen, setGen } = useContext(PokemonContext);

  return (
    <div className="flex gap-3">
      {VERSIONS.map((vrs) => (
        <GenHeader
          key={vrs.name}
          gen={vrs.name}
          selectedGen={selectedGen}
          setGen={setGen}
        />
      ))}
    </div>
  );
};

export default GenPicker;
