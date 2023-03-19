import { useContext, useEffect, useState } from "react";

import {
  DEFENSIVE_KEY,
  TYPES,
  DAMAGE_RELATION_VALUES,
} from "~/constants/types-constants";
import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";

import { properCase } from "~/utils/text-utils";

import ElementCard from "./element-card";

const ElementalFrame = ({
  title,
  tableType,
}: {
  title: string;
  tableType: string;
}) => {
  const { team } = useContext(PokemonContext);
  const [values, setValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (tableType === DEFENSIVE_KEY) {
      const P = new PokeAPIService();
      const newValues: { [key: string]: number } = {};

      const makeValues = async () => {
        const pokemonToQuery = await P.getPokemonByName(
          team.map(({ name }) => name)
        );
        for await (const pokemon of pokemonToQuery) {
          const thisPokeValues: { [key: string]: number } = {};
          for (const typeObj of pokemon.types) {
            const typeName = typeObj.type.name;
            const typeResponse = await P.getType(typeName);
            Object.entries(typeResponse.damage_relations).forEach(
              ([damage_level, relatedTypes]) => {
                if (damage_level.includes("_from")) {
                  relatedTypes.forEach((relatedType) => {
                    thisPokeValues[relatedType.name] =
                      (thisPokeValues[relatedType.name] || 0) +
                      DAMAGE_RELATION_VALUES[damage_level];
                  });
                }
              }
            );
          }
          Object.entries(thisPokeValues).forEach(([key, value]) => {
            newValues[key] = (newValues[key] || 0) + value;
          });
        }
        setValues(newValues);
      };

      makeValues();
    }
  }, [tableType, team]);

  return (
    <div className="w-max">
      <div>{title}</div>
      <div className="grid grid-cols-6 gap-x-2">
        {TYPES.map((type) => (
          <ElementCard
            key={type.key}
            label={properCase(type.key)}
            type={type}
            value={values[type.key] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementalFrame;
