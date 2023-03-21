import { useContext } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";

import CoverageWrapper from "../pokedex-coverage/coverage-wrapper";
import ElementalFramesWrapper from "./elemental-frames/elemental-frames-wrapper";
import FocusedCard from "./focused-view/focused-card";

import PokemonFrame from "./pokemon-frame";

const PokemonSection = ({
  allPokemon,
}: {
  allPokemon: (IPokemonFull | IResourceListItem)[];
}) => {
  const { team, bench } = useContext(PokemonContext);

  return (
    <div className="flex justify-between gap-10">
      <div className="">
        <PokemonFrame pokemon={team} location="team" />
        <PokemonFrame pokemon={bench} location="bench" />
      </div>
      <FocusedCard />
      <CoverageWrapper allPokemon={allPokemon} />
      <ElementalFramesWrapper />
    </div>
  );
};

export default PokemonSection;
