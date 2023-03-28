import { useContext } from "react";

import useWindowSize from "~/utils/hooks/use-window-size";

import { PokemonContext } from "~/pokemon-context";

import ElementalFrame from "./elemental-frame";

const ElementalFramesWrapper = () => {
  const { windowSize } = useWindowSize();
  const { focusedPokemon } = useContext(PokemonContext);

  return (
    <div className={`${focusedPokemon && windowSize <= 1080 ? "hidden" : ""}`}>
      <ElementalFrame title="Defensive" tableType="defensive" />
      <ElementalFrame title="Offensive" tableType="offensive" />
    </div>
  );
};

export default ElementalFramesWrapper;
