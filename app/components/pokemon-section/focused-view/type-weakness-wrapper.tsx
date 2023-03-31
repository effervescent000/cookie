import { useContext, useEffect, useState } from "react";

import type { IPokemonFull } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";
import { makeDefensiveValues } from "~/utils/scoring-helpers";
import TypeWeaknessCard from "./type-weakness-card";

const TypeWeaknessWrapper = ({ pokemon }: { pokemon: IPokemonFull }) => {
  const { gen } = useContext(PokemonContext);
  const [defenses, setDefenses] = useState<{ [key: number]: string[] }>({});

  useEffect(() => {
    const P = new PokeAPIService();
    const getDefenses = async () => {
      setDefenses({});
      const result = await makeDefensiveValues({ pokemon, P, gen });
      const values = Object.entries(result).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [value]: [...(acc[value] || []), key],
        }),
        {} as { [key: number]: string[] }
      );
      setDefenses(values);
    };

    getDefenses();
  }, [gen, pokemon]);

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-2">
      {Object.entries(defenses).map(([key, value], i) => (
        <TypeWeaknessCard key={i} label={key} types={value} />
      ))}
    </div>
  );
};

export default TypeWeaknessWrapper;
