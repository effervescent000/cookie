import { useContext } from "react";

import { VERSIONS } from "~/constants/versions-constants";
import { PokemonContext } from "~/pokemon-context";

export const useVersion = () => {
  const { region, gen } = useContext(PokemonContext);
  if (gen === 1) return { version: VERSIONS.RB };
  if (gen === 2) return { version: VERSIONS.GS };
  if (gen === 3) {
    if (region === "kanto") return { version: VERSIONS.FRLG };
    return { version: VERSIONS.RS };
  }
  if (gen === 4) {
    if (region === "hoenn") return { version: VERSIONS.HGSS };
    return { version: VERSIONS.DP };
  }

  if (gen === 8) {
    return { version: VERSIONS.SS };
  }
  return { version: "NOT FOUND" };
};
