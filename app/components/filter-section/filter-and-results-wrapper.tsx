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
      const checkedResults = pokemonResult.map((poke) => {
        if (!isFullPokemon(poke)) return { value: poke, include: true };
        const moves = poke.moves.slice(0, 5);
        const checkedMoves = moves.map((move) => {
          return !!move.version_group_details.find(
            ({ version_group }) => versionGroup === version_group.name
          );
        });
        return {
          value: poke,
          include: checkedMoves.some((foundBool) => foundBool),
        };
      });
      setAllPokemon(
        checkedResults
          .filter(({ include }) => include)
          .map(({ value }) => value)
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
