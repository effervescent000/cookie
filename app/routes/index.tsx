import { useEffect, useState, useContext } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import FilterSection from "~/components/filter-section/filter-and-results-wrapper";
import PokemonFrameWrapper from "~/components/pokemon-section/pokemon-frame-wrapper";
import GenPicker from "~/components/gen-picker/gen-picker-wrapper";
import ProfileWrapper from "~/components/profiles/profile-wrapper";
import PokeAPIService from "~/utils/pokeapi-service";
import { PokemonContext } from "~/pokemon-context";
import { isFullPokemon } from "~/utils/type-guards";

export default function Index() {
  const [allPokemon, setAllPokemon] = useState<
    Array<IPokemonFull | IResourceListItem>
  >([]);
  const [filteredPokemon, setFilteredPokemon] = useState<
    Array<IPokemonFull | IResourceListItem>
  >([]);
  const { versionGroup } = useContext(PokemonContext);
  const [filters, setFilters] = useState({ name: "", type1: "", type2: "" });

  const mergeFilters = (newFilter: { [key: string]: string }) =>
    setFilters({ ...filters, ...newFilter });

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      const pokemonResult = await P.getAllPokemon();
      setAllPokemon(pokemonResult);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const checkedResults = allPokemon.map((poke) => {
      if (!isFullPokemon(poke)) return { value: poke, include: true };
      const moves = poke.moves.slice(
        0,
        Math.max(Math.round(poke.moves.length * 0.2), 5)
      );
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
    setFilteredPokemon(
      checkedResults.filter(({ include }) => include).map(({ value }) => value)
    );
  }, [allPokemon, versionGroup]);

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
        allPokemon={filteredPokemon}
        merge={mergeIntoAllPokemon}
        filters={filters}
        mergeFilters={mergeFilters}
      />
    </div>
  );
}
