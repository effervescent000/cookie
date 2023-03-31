import { useContext, useEffect, useState } from "react";

import type { IValues } from "~/interfaces";

import { DEFENSIVE_KEY, getTypes } from "~/constants/types-constants";
import { PokemonContext } from "~/pokemon-context";

import ElementCard from "./element-card";
import { sumValues } from "~/utils/scoring-helpers";

const ElementalFrame = ({
  title,
  tableType,
}: {
  title: string;
  tableType: string;
}) => {
  const { team, teamDefScores, teamOffScores, gen } =
    useContext(PokemonContext);
  const [values, setValues] = useState<IValues>({});

  useEffect(() => {
    if (tableType === DEFENSIVE_KEY) {
      const makeValues = async () => {
        setValues(teamDefScores.processed);
      };

      makeValues();
    } else {
      const makeValues = async () => {
        setValues(teamOffScores.processed);
      };

      makeValues();
    }
  }, [tableType, team, teamDefScores, teamOffScores]);

  if (!values) return <div>Loading...</div>;

  return (
    <div className="w-max">
      <div className="flex justify-between text-lg">
        <span>{title}</span>
        <span>{values && Math.round(sumValues(values))}</span>
      </div>
      <div className="grid grid-cols-6 gap-x-2">
        {getTypes(gen).map((type) => (
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
