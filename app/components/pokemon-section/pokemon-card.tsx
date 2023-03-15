import { useContext, useState, useEffect, useMemo } from "react";

import type { IOptions } from "~/interfaces";

import { useVersion } from "~/utils/hooks/useVersion";

import PokeAPIService from "~/utils/pokeapi-service";
import { PokemonContext } from "~/pokemon-context";

import Select from "../common/select";

const nakedConfig = {
  name: "",
  id: -1,
  moves: {},
};

const PokemonInput = ({ pokemonOptions }: { pokemonOptions: IOptions[] }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(nakedConfig);

  const { mergeIntoBench, idCounter, team, bench } = useContext(PokemonContext);

  const { version } = useVersion();

  const moveList = useMemo(() => {
    const foundPokemon = [...team, ...bench].find(
      ({ id }) => selectedPokemon.id === id
    );
    if (!foundPokemon) return [];
    const moves = foundPokemon.moves;
    const filteredMoves = moves
      .map(({ move: { name }, version_group_details }) => {
        const match = version_group_details.find(
          (detail) => detail.version_group.name === version
        );
        if (match) return name;
        return undefined;
      })
      .filter((move) => !!move);
    return filteredMoves;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPokemon.name, version, selectedPokemon.id]);

  const selectTarget = (target: string) => {
    if (target && target !== selectedPokemon.name) {
      const P = new PokeAPIService();
      P.getPokemonByName(target)
        .then((pokemon) => {
          setSelectedPokemon({ ...nakedConfig, name: target, id: idCounter });
          mergeIntoBench({ ...pokemon, id: idCounter });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="d-flex">
      <div>
        <Select
          options={pokemonOptions}
          placeholder="Species"
          callback={selectTarget}
          selection={selectedPokemon.name}
        />
        {/* sprite goes here */}
      </div>
      <div>{/* moves live in this div */}</div>
    </div>
  );
};

export default PokemonInput;
