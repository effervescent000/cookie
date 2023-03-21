import { useContext } from "react";

import type { IType } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import { TYPES } from "~/constants/types-constants";
import { properCase } from "~/utils/text-utils";

import TypeLabel from "~/components/common/type-label";

const FocusedCard = () => {
  const { focusedPokemon: pokemon } = useContext(PokemonContext);

  if (!pokemon) return <></>;

  return (
    <div className="border border-light-blue">
      <div className="flex">
        <div>{properCase(pokemon.species.name)}</div>
        <div className="flex">
          {pokemon.types.map(({ type: { name } }) => (
            <TypeLabel
              key={name}
              type={TYPES.find(({ key }) => key === name) as IType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FocusedCard;
