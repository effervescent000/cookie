import { useContext } from "react";
import {
  faCheck,
  faCircleUp,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import { properCase } from "~/utils/text-utils";

import Icon from "../common/icon";
import PokeAPIService from "~/utils/pokeapi-service";
import { isFullPokemon } from "~/utils/type-guards";

const PokemonMiniCard = ({
  full = false,
  poke,
  api,
  hideIcons,
  merge,
}: {
  full?: boolean;
  poke: IPokemonFull | IResourceListItem;
  hideIcons?: boolean;
  api: PokeAPIService;
  merge: (target: IPokemonFull) => void;
}) => {
  const { mergeIntoBench, idCounter } = useContext(PokemonContext);

  const selectPokemon = async () => {
    mergeIntoBench({
      name: poke.name,
      moves: { 0: "", 1: "", 2: "", 3: "" },
      id: idCounter,
    });
  };

  const queryAndAddPokemon = async (target: string) => {
    const fullPokemon = await api.getPokemonByName([target]);
    merge(fullPokemon[0]);
  };

  return (
    <div className="flex w-full justify-between">
      <div>{properCase(poke.name)}</div>
      {!hideIcons && (
        <div className="grid grid-cols-2 gap-1">
          <Icon icon={faCircleUp} onClick={selectPokemon} />
          {!isFullPokemon(poke) && (
            <Icon
              icon={faDownload}
              onClick={() => queryAndAddPokemon(poke.name)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonMiniCard;
