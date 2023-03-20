import { useState } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import FilterSection from "~/components/filter-section/filter-and-results-wrapper";
import PokemonSection from "~/components/pokemon-section/pokemon-frame-wrapper";
import GenPicker from "~/components/gen-picker/gen-picker-wrapper";

export default function Index() {
  const [allPokemon, setAllPokemon] = useState<
    Array<IPokemonFull | IResourceListItem>
  >([]);
  return (
    <div className="flex flex-col gap-5">
      <GenPicker />
      <PokemonSection allPokemon={allPokemon} />
      <FilterSection allPokemon={allPokemon} setAllPokemon={setAllPokemon} />
    </div>
  );
}
