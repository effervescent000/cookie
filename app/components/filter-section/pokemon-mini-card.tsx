import { useContext } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";
import Icon from "../common/icon";
import { properCase } from "~/utils/text-utils";

const PokemonMiniCard = ({
  full = false,
  poke,
  hideMergeIcon,
}: {
  full?: boolean;
  poke: IPokemonFull | IResourceListItem;
  hideMergeIcon?: boolean;
}) => {
  const { mergeIntoBench, idCounter } = useContext(PokemonContext);

  const selectPokemon = async () => {
    mergeIntoBench({
      name: poke.name,
      moves: { 0: "", 1: "", 2: "", 3: "" },
      id: idCounter,
    });
  };

  return (
    <div className="flex w-full justify-between">
      <div>{properCase(poke.name)}</div>
      {!hideMergeIcon && (
        <div>
          <Icon icon={faCheck} onClick={selectPokemon} />
        </div>
      )}
    </div>
  );
};

export default PokemonMiniCard;
