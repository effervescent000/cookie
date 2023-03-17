import { useContext } from "react";
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";

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
  const { mergeIntoBench, mergeIntoTeam } = useContext(PokemonContext);

  return (
    <div className="flex justify-between">
      {currentLocation === "bench" ? (
        <Icon icon={faCircleUp} onClick={() => mergeIntoTeam(pokemon)} />
      ) : (
        <Icon icon={faCircleDown} onClick={() => mergeIntoBench(pokemon)} />
      )}
    </div>
  );
};

export default EditIcons;
