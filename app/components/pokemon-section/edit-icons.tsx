import { useContext } from "react";
import {
  faCircleUp,
  faCircleDown,
  faTrash,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

import type { IPokemonFull, IPokeSkeleton } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import Icon from "../common/icon";

const EditIcons = ({
  currentLocation,
  pokemon,
  fullPoke,
}: {
  currentLocation: string;
  pokemon: IPokeSkeleton;
  fullPoke: IPokemonFull;
}) => {
  const {
    mergeIntoBench,
    mergeIntoTeam,
    removeFromBench,
    removeFromTeam,
    setFocusedPokemon,
  } = useContext(PokemonContext);

  return (
    <div className="flex justify-between">
      {currentLocation === "bench" ? (
        <>
          <Icon icon={faCircleUp} onClick={() => mergeIntoTeam(pokemon)} />
          <Icon icon={faExpand} onClick={() => setFocusedPokemon(fullPoke)} />
          <Icon icon={faTrash} onClick={() => removeFromBench(pokemon)} />
        </>
      ) : (
        <>
          <Icon icon={faCircleDown} onClick={() => mergeIntoBench(pokemon)} />
          <Icon icon={faExpand} onClick={() => setFocusedPokemon(fullPoke)} />
          <Icon icon={faTrash} onClick={() => removeFromTeam(pokemon)} />
        </>
      )}
    </div>
  );
};

export default EditIcons;
