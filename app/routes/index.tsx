import { useState } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import FilterSection from "~/components/filter-section/filter-and-results-wrapper";
import PokemonFrameWrapper from "~/components/pokemon-section/pokemon-frame-wrapper";
import GenPicker from "~/components/gen-picker/gen-picker-wrapper";
import ProfileWrapper from "~/components/profiles/profile-wrapper";

export default function Index() {
  const [allPokemon, setAllPokemon] = useState<
    Array<IPokemonFull | IResourceListItem>
  >([]);

  const mergeIntoAllPokemon = (target: IPokemonFull) => {
    const foundIndex = allPokemon.findIndex(
      (pokemon) => pokemon.name === target.name
    );
    if (foundIndex !== -1) {
      const newList = [...allPokemon];
      newList[foundIndex] = target;
      setAllPokemon(newList);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <GenPicker />
      <ProfileWrapper />
      <PokemonFrameWrapper allPokemon={allPokemon} />
      <FilterSection
        allPokemon={allPokemon}
        setAllPokemon={setAllPokemon}
        merge={mergeIntoAllPokemon}
      />
    </div>
  );
}
