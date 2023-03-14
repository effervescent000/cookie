import { useState } from "react";
// import { useOptionalUser } from "~/utils";

import type { IPokemon } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";

import FilterSection from "~/components/filter-section/filter-section";
import PokemonSection from "~/components/pokemon-section/pokemon-card-wrapper";
import GenPicker from "~/components/gen-picker/gen-picker-main";

export default function Index() {
  // const user = useOptionalUser();
  const [idCounter, setIdCounter] = useState(0);
  const [gen, setGen] = useState(8);
  const [selectedRegion, setSelectedRegion] = useState("galar");
  const [team, setTeam] = useState<IPokemon[]>([]);
  const [bench, setBench] = useState<IPokemon[]>([]);

  const incrementId = () => setIdCounter(idCounter + 1);

  const mergeIntoTeam = (target: IPokemon) => {
    const found = team.find(({ id: pokeId }) => pokeId === target.id);
    if (!found) {
      setTeam([...team, target]);
      incrementId();
    }
  };

  const mergeIntoBench = (target: IPokemon) => {
    const found = bench.find(({ id: pokeId }) => pokeId === target.id);
    if (!found) {
      setBench([...bench, target]);
      incrementId();
    }
  };

  return (
    <PokemonContext.Provider
      value={{ gen, team, bench, idCounter, mergeIntoTeam, mergeIntoBench }}
    >
      <div>
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
