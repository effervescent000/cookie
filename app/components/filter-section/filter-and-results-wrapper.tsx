import { useEffect, useState, useContext } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";

import PokeAPIService from "~/utils/pokeapi-service";
import { isFullPokemon } from "~/utils/type-guards";

import FilterWrapper from "./filters-wrapper";
import ResultsWrapper from "./results-wrapper";

const FilterSection = ({
  allPokemon,
  setAllPokemon,
  merge,
}: {
  allPokemon: (IPokemonFull | IResourceListItem)[];
  setAllPokemon: (pokemon: (IPokemonFull | IResourceListItem)[]) => void;
  merge: (target: IPokemonFull) => void;
}) => {
  const [filters, setFilters] = useState({ name: "", type1: "", type2: "" });
  const { versionGroup } = useContext(PokemonContext);

  const mergeFilters = (newFilter: { [key: string]: string }) =>
    setFilters({ ...filters, ...newFilter });

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      const pokemonResult = await P.getAllPokemon();
      const versions = (await P.getVersionGroup(versionGroup)).versions.map(
        ({ name }) => name
      );
      const queryResults = await Promise.all(
        pokemonResult.map(async (poke) => {
          if (!isFullPokemon(poke)) return { value: poke, include: true };
          const species = await P.getSpecies(poke.species.name);
          const match = species.flavor_text_entries.find(({ version }) =>
            versions.includes(version.name)
          );
          return { value: poke, include: !!match };
        })
      );
      setAllPokemon(
        queryResults.filter(({ include }) => include).map(({ value }) => value)
      );
    };
    if (versionGroup) fetchPokemon();
  }, [setAllPokemon, versionGroup]);

  return (
    <div>
      <FilterWrapper filters={filters} mergeFilters={mergeFilters} />
      <ResultsWrapper output={allPokemon} filters={filters} merge={merge} />
    </div>
  );
};

export default FilterSection;
