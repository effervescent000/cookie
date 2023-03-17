import FilterSection from "~/components/filter-section/filter-and-results-wrapper";
import PokemonSection from "~/components/pokemon-section/pokemon-frame-wrapper";
import GenPicker from "~/components/gen-picker/gen-picker-wrapper";

export default function Index() {
  return (
    <div className="flex flex-col gap-5">
      <GenPicker />
      <PokemonSection />
      <FilterSection />
    </div>
  );
}
