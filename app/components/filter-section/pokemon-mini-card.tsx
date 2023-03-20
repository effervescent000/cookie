import { useContext, useState } from "react";
import {
  faCircleUp,
  faDownload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import type PokeAPIService from "~/utils/pokeapi-service";

import { PokemonContext } from "~/pokemon-context";
import { properCase } from "~/utils/text-utils";
import { isFullPokemon } from "~/utils/type-guards";

import Icon from "../common/icon";

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
  const [loading, setLoading] = useState(false);

  const selectPokemon = async () => {
    mergeIntoBench({
      name: poke.name,
      moves: { 0: "", 1: "", 2: "", 3: "" },
      id: idCounter,
    });
  };

  const queryAndAddPokemon = async (target: string) => {
    setLoading(true);
    const fullPokemon = await api.getPokemonByName([target]);
    merge(fullPokemon[0]);
    setLoading(false);
  };

  return (
    <div className="flex w-full justify-between">
      <div>{properCase(poke.name)}</div>
      {!hideIcons && (
        <div className="grid grid-cols-2 gap-1">
          <Icon icon={faCircleUp} onClick={selectPokemon} />
          {loading && <Icon icon={faSpinner} classes="animate-spin" />}
          {!loading && !isFullPokemon(poke) && (
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
