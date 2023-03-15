import { useContext } from "react";

import { REGIONS } from "~/constants/versions-constants";
import { PokemonContext } from "~/pokemon-context";
import { properCase } from "~/utils/text-utils";

import Select from "../common/select";

const FilterSection = () => {
  const { region: selectedRegion, setRegion: setSelectedRegion } =
    useContext(PokemonContext);
  return (
    <div>
      <Select
        options={REGIONS.map((r) => ({ name: properCase(r), value: r }))}
        placeholder="Region"
        callback={setSelectedRegion}
        selection={selectedRegion}
      />
    </div>
  );
};

export default FilterSection;
