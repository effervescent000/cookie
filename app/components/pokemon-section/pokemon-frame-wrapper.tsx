import { useEffect, useState, useContext } from "react";
import { PokemonContext } from "~/pokemon-context";
import ElementalFramesWrapper from "./elemental-frames/elemental-frames-wrapper";

import PokemonFrame from "./pokemon-frame";

const PokemonSection = () => {
  const { team, bench } = useContext(PokemonContext);

  return (
    <div className="flex">
      <div>
        <PokemonFrame pokemon={team} location="team" />
        <PokemonFrame pokemon={bench} location="bench" />
      </div>
      <ElementalFramesWrapper />
    </div>
  );
};

export default PokemonSection;
