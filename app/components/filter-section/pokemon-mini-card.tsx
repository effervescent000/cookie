import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";

const PokemonMiniCard = ({
  full = false,
  pokeName,
}: {
  full?: boolean;
  pokeName: string;
}) => {
  const { mergeIntoBench } = useContext(PokemonContext);

  const selectPokemon = async () => {
    const P = new PokeAPIService();
    const fullPoke = await P.getPokemonByName(pokeName);
    mergeIntoBench(fullPoke);
  };

  return (
    <div className="flex w-40 justify-between">
      <div>{pokeName}</div>
      <div>
        <FontAwesomeIcon icon={faCheck} onClick={selectPokemon} />
      </div>
    </div>
  );
};

export default PokemonMiniCard;
