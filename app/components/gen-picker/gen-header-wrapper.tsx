import { useContext } from "react";
import { VERSIONS } from "~/constants/versions-constants";
import { PokemonContext } from "~/pokemon-context";
import GenHeader from "./gen-header";

const GenHeaderWrapper = () => {
  const { gen: selectedGen, setGen } = useContext(PokemonContext);
  return (
    <div className="flex gap-3">
      {VERSIONS.map((vrs) => (
        <GenHeader
          key={vrs.name}
          version={vrs.name}
          selectedVersion={selectedGen}
          setVersion={setGen}
          versionKey={vrs.name}
        />
      ))}
    </div>
  );
};

export default GenHeaderWrapper;
