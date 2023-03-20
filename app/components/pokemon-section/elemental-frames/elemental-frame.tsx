import { useContext, useEffect, useState } from "react";

import {
  DEFENSIVE_KEY,
  TYPES,
  DAMAGE_RELATION_VALUES,
} from "~/constants/types-constants";
import { PokemonContext } from "~/pokemon-context";
import { makeDefensiveValues } from "~/utils/helpers";
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
    const P = new PokeAPIService();
    const newValues: { [key: string]: number } = {};
    if (tableType === DEFENSIVE_KEY) {
      const makeValues = async () => {
        const pokemonToQuery = await P.getPokemonByName(
          team.map(({ name }) => name)
        );
        for await (const pokemon of pokemonToQuery) {
          const thisPokeValues = await makeDefensiveValues(pokemon, P);
          Object.entries(thisPokeValues).forEach(([key, value]) => {
            newValues[key] = (newValues[key] || 0) + value;
          });
        }
        setValues(newValues);
      };

      makeValues();
    } else {
      const makeValues = async () => {
        for (const pokemon of team) {
          const thisPokeValues: { [key: string]: number } = {};
          const selectedMoves = await Promise.all(
            Object.values(pokemon.moves)
              .filter((move) => !!move)
              .map(async (move) => {
                return await P.getMove(move);
              })
          );
          for (const move of selectedMoves) {
            const moveTypeResponse = await P.getType(move.type.name);
            Object.entries(moveTypeResponse.damage_relations).forEach(
              ([damage_level, relatedTypes]) => {
                if (damage_level.includes("_to")) {
                  relatedTypes.forEach((relatedType) => {
                    if (
                      thisPokeValues[relatedType.name] === undefined ||
                      thisPokeValues[relatedType.name] <
                        DAMAGE_RELATION_VALUES[damage_level]
                    ) {
                      thisPokeValues[relatedType.name] =
                        DAMAGE_RELATION_VALUES[damage_level];
                    }
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
