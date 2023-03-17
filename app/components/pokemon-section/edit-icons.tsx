import { useContext } from "react";
import {
  faCircleUp,
  faCircleDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import type { IPokemonFull } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import Icon from "../common/icon";

const EditIcons = ({
  currentLocation,
  pokemon,
}: {
  currentLocation: string;
  pokemon: IPokemonFull;
}) => {
  const { mergeIntoBench, mergeIntoTeam, removeFromBench, removeFromTeam } =
    useContext(PokemonContext);

  return (
    <div className="flex justify-between">
      {currentLocation === "bench" ? (
        <>
          <Icon icon={faCircleUp} onClick={() => mergeIntoTeam(pokemon)} />
          <Icon icon={faTrash} onClick={() => removeFromBench(pokemon)} />
        </>
      ) : (
        <>
          <Icon icon={faCircleDown} onClick={() => mergeIntoBench(pokemon)} />
          <Icon icon={faTrash} onClick={() => removeFromTeam(pokemon)} />
        </>
      )}
    </div>
  );
};

export default EditIcons;
