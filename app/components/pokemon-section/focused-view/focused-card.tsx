import TypeLabel from "~/components/common/type-label";
import { TYPES } from "~/constants/types-constants";
import type { IPokemonFull, IType } from "~/interfaces";

import { properCase } from "~/utils/text-utils";

const FocusedCard = ({ pokemon }: { pokemon: IPokemonFull }) => {
  return (
    <div>
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
  );
};

export default FocusedCard;
