import { useContext, useState, useEffect } from "react";
import {
  faCircleUp,
  faDownload,
  faExpand,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import type PokeAPIService from "~/utils/pokeapi-service";

import { PokemonContext } from "~/pokemon-context";
import { properCase } from "~/utils/text-utils";
import { isFullPokemon } from "~/utils/type-guards";

import Icon from "../common/icon";
import SpriteFrame from "../common/sprite-frame";

const PokemonMiniCard = ({
  full = false,
  poke,
  api,
  hideIcons,
  merge = () => {},
}: {
  full?: boolean;
  poke: IPokemonFull | IResourceListItem;
  hideIcons?: boolean;
  api?: PokeAPIService;
  merge?: (target: IPokemonFull) => void;
}) => {
  const { mergeIntoBench, idCounter, setFocusedPokemon } =
    useContext(PokemonContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (full && !isFullPokemon(poke)) {
      queryAndAddPokemon(poke.name);
    }
  }, [full, poke]);

  const selectPokemon = async () => {
    if (!isFullPokemon(poke)) {
      await queryAndAddPokemon(poke.name);
    }
    mergeIntoBench({
      name: poke.name,
      moves: { 0: "", 1: "", 2: "", 3: "" },
      id: idCounter,
    });
  };

  const queryAndAddPokemon = async (target: string) => {
    if (api) {
      setLoading(true);
      const fullPokemon = await api.getPokemonByName([target]);
      merge(fullPokemon[0]);
      setLoading(false);
      return fullPokemon[0];
    } else {
      console.log("No API service found!");
    }
  };

  const focusPokemon = async () => {
    if (!isFullPokemon(poke)) {
      const result = await queryAndAddPokemon(poke.name);
      setFocusedPokemon(result);
    } else {
      setFocusedPokemon(poke as IPokemonFull);
    }
  };

  if (full)
    return (
      <div data-cy={`mini-card-${poke.name}`}>
        <div className="flex justify-center gap-5">
          <div>{properCase(poke.name)}</div>

          <div className="grid grid-cols-3 gap-1">
            <Icon icon={faExpand} onClick={focusPokemon} />
            {!hideIcons && (
              <>
                <Icon
                  icon={faCircleUp}
                  onClick={selectPokemon}
                  dataCy="add-to-bench"
                />
              </>
            )}
          </div>
        </div>
        <SpriteFrame pokemon={poke} />
      </div>
    );

  return (
    <div
      className="flex w-full justify-between"
      data-cy={`mini-card-${poke.name}`}
    >
      <div>{properCase(poke.name)}</div>

      <div className="grid grid-cols-3 gap-1">
        <Icon icon={faExpand} onClick={focusPokemon} />
        {!hideIcons && (
          <>
            <Icon
              icon={faCircleUp}
              onClick={selectPokemon}
              dataCy="add-to-bench"
            />
            {loading && <Icon icon={faSpinner} classes="animate-spin" />}
            {!loading && !isFullPokemon(poke) && (
              <Icon
                icon={faDownload}
                onClick={() => queryAndAddPokemon(poke.name)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonMiniCard;
