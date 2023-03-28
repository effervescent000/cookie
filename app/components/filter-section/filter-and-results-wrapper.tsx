import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import FilterWrapper from "./filters-wrapper";
import ResultsWrapper from "./results-wrapper";

const FilterSection = ({
  allPokemon,
  merge,
  filters,
  mergeFilters,
}: {
  allPokemon: (IPokemonFull | IResourceListItem)[];
  merge: (target: IPokemonFull) => void;
  filters: { name: string; type1: string; type2: string };
  mergeFilters: (arg0: { [key: string]: string }) => void;
}) => {
  return (
    <div>
      <FilterWrapper filters={filters} mergeFilters={mergeFilters} />
      <ResultsWrapper output={allPokemon} filters={filters} merge={merge} />
    </div>
  );
};

export default FilterSection;
