import { useState } from "react";
// import { useOptionalUser } from "~/utils";

import type { IPokemonFull } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";

import FilterSection from "~/components/filter-section/filter-section";
import PokemonSection from "~/components/pokemon-section/pokemon-card-wrapper";
import GenPicker from "~/components/gen-picker/gen-picker-main";

export default function Index() {
  // const user = useOptionalUser();
  const [idCounter, setIdCounter] = useState(0);
  const [gen, setGen] = useState(8);
  const [selectedRegion, setSelectedRegion] = useState("galar");
  const [team, setTeam] = useState<IPokemonFull[]>([]);
  const [bench, setBench] = useState<IPokemonFull[]>([]);

  const incrementId = () => setIdCounter(idCounter + 1);

  const mergeIntoTeam = (target: IPokemonFull) => {
    const found = team.find(({ id: pokeId }) => pokeId === target.id);
    if (!found) {
      setTeam([...team, target]);
      incrementId();
    }
  };

  const mergeIntoBench = (target: IPokemonFull) => {
    const found = bench.find(({ id: pokeId }) => pokeId === target.id);
    if (!found) {
      setBench([...bench, target]);
      incrementId();
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        gen,
        region: selectedRegion,
        team,
        bench,
        idCounter,
        mergeIntoTeam,
        mergeIntoBench,
      }}
    >
      <div className="flex flex-col gap-5">
        <GenPicker gen={gen} setGen={setGen} />
        <PokemonSection selectedRegion={selectedRegion} />
        <FilterSection
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </div>
    </PokemonContext.Provider>
  );
}
