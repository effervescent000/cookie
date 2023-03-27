import { useContext } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import useWindowSize from "~/utils/hooks/use-window-size";

import CoverageWrapper from "../pokedex-coverage/coverage-wrapper";
import ElementalFramesWrapper from "./elemental-frames/elemental-frames-wrapper";
import FocusedCard from "./focused-view/focused-card";

import PokemonFrame from "./pokemon-frame";

const PokemonFrameWrapper = ({
  allPokemon,
}: {
  allPokemon: (IPokemonFull | IResourceListItem)[];
}) => {
  const { team, bench } = useContext(PokemonContext);
  const { windowSize } = useWindowSize();

  return (
    <div className="flex justify-between gap-10">
      <div>
        <PokemonFrame pokemon={team} location="team" />
        <PokemonFrame pokemon={bench} location="bench" />
      </div>
      <FocusedCard />
      {windowSize > 1080 && <CoverageWrapper allPokemon={allPokemon} />}
      <ElementalFramesWrapper />
    </div>
  );
};

export default PokemonFrameWrapper;
