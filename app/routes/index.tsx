import FilterSection from "~/components/filter-section/filter-section";
import PokemonSection from "~/components/pokemon-section/pokemon-card-wrapper";
import GenPicker from "~/components/gen-picker/gen-picker-wrapper";

export default function Index() {
  return (
    <div className="flex flex-col gap-5">
      <GenPicker />
      <FilterSection />
      <PokemonSection />
    </div>
  );
}
