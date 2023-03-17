import { useContext } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import type { IPokemonFull, IPokemonMini } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";
import Icon from "../common/icon";
import { properCase } from "~/utils/text-utils";

const PokemonMiniCard = ({
  full = false,
  poke,
}: {
  full?: boolean;
  poke: IPokemonFull | IPokemonMini;
}) => {
  const { mergeIntoBench } = useContext(PokemonContext);

  const selectPokemon = async () => {
    const P = new PokeAPIService();
    const fullPoke = await P.getPokemonByName(poke.name);
    mergeIntoBench(fullPoke);
  };

  return (
    <div className="flex w-full justify-between">
      <div>{properCase(poke.name)}</div>
      <div>
        <Icon icon={faCheck} onClick={selectPokemon} />
      </div>
    </div>
  );
};

export default PokemonMiniCard;
