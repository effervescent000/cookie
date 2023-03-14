import { useState } from "react";
import FilterSection from "~/components/filter-section/filter-section";
// import { useOptionalUser } from "~/utils";

// import GenPicker from "~/components/gen-picker/gen-picker-main";
import PokemonSection from "~/components/pokemon-section/pokemon-section";

export default function Index() {
  // const user = useOptionalUser();
  // const [gen, setGen] = useState(8);
  const [selectedRegion, setSelectedRegion] = useState("galar");
  return (
    <div>
      {/* <GenPicker gen={gen} setGen={setGen} /> */}
      <PokemonSection selectedRegion={selectedRegion} />
      <FilterSection
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
}
