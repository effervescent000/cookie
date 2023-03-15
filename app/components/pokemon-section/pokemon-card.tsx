import { useContext, useState, useEffect, useMemo } from "react";
import _ from "lodash";

import type { IOptions } from "~/interfaces";

import { useVersion } from "~/utils/hooks/useVersion";
import { properCase } from "~/utils/text-utils";

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
    if (!moves) return [];
    const filteredMoves = moves
      .map(({ move: { name }, version_group_details }) => {
        const match = version_group_details.find(
          (detail) => detail.version_group.name === version
        );
        if (match) return { name: properCase(name), value: name };
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
    <div className="flex">
      <div>
        <Select
          options={pokemonOptions}
          placeholder="Species"
          callback={selectTarget}
          selection={selectedPokemon.name}
        />
        {/* sprite goes here */}
      </div>
      <div>
        {_.range(4).map((i) => (
          <Select key={`${selectedPokemon.id}-${i}`} options={moveList} />
        ))}
      </div>
    </div>
  );
};

export default PokemonInput;
