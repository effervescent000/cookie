import { useContext, useEffect, useState } from "react";

import type { IValues } from "~/interfaces";

import {
  DEFENSIVE_KEY,
  TYPES,
  DAMAGE_RELATION_VALUES,
} from "~/constants/types-constants";
import { PokemonContext } from "~/pokemon-context";

import PokeAPIService from "~/utils/pokeapi-service";
import { scoreOffValues, sumValues } from "~/utils/helpers";

import ElementCard from "./element-card";

const ElementalFrame = ({
  title,
  tableType,
}: {
  title: string;
  tableType: string;
}) => {
  const { team, teamDefScores, teamOffScores } = useContext(PokemonContext);
  const [values, setValues] = useState<IValues>({});

  useEffect(() => {
    if (tableType === DEFENSIVE_KEY) {
      const makeValues = async () => {
        setValues(teamDefScores);
      };

      makeValues();
    } else {
      const makeValues = async () => {
        setValues(teamOffScores);
      };

      makeValues();
    }
  }, [tableType, team, teamDefScores, teamOffScores]);

  return (
    <div className="w-max">
      <div className="flex justify-between text-lg">
        <span>{title}</span>
        <span>{values && Math.round(sumValues(values))}</span>
      </div>
      <div className="grid grid-cols-6 gap-x-2">
        {TYPES.map((type) => (
          <ElementCard
            key={type.key}
            type={type}
            value={values[type.key] || {}}
            tooltipKey={`${tableType}-${type.key}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementalFrame;
