import type { IOptions } from "~/interfaces";
import Select from "../common/select";

const PokemonInput = ({
  pokemonOptions,
  id,
}: {
  pokemonOptions: IOptions[];
  id: number;
}) => {
  return (
    <div>
      <div>
        <Select options={pokemonOptions} placeholder="Species" />
      </div>
    </div>
  );
};

export default PokemonInput;
