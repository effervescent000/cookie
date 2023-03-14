import { useContext, useState } from "react";
import type { IOptions } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";
import Select from "../common/select";

const PokemonInput = ({ pokemonOptions }: { pokemonOptions: IOptions[] }) => {
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const { mergeIntoBench, idCounter } = useContext(PokemonContext);

  const selectTarget = (target: string) => {
    if (target && target !== selectedPokemon) {
      const P = new PokeAPIService();
      P.getPokemonByName(target)
        .then((pokemon) => {
          mergeIntoBench({ ...pokemon, id: idCounter });
          setSelectedPokemon(target);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <div>
        <Select
          options={pokemonOptions}
          placeholder="Species"
          callback={selectTarget}
          selection={selectedPokemon}
        />
      </div>
    </div>
  );
};

export default PokemonInput;
