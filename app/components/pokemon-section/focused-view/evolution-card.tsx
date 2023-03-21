import { useState, useEffect } from "react";
import _ from "lodash";

import type { IEvolutionChainLink } from "~/interfaces";

import { TRIGGER_MATCH } from "~/constants/evolution-constants";
import { properCase } from "~/utils/text-utils";

const EvolutionCard = ({
  link,
  recursionLevel = 0,
}: {
  link: IEvolutionChainLink;
  recursionLevel?: number;
}) => {
  const [conditions, setConditions] = useState<string[]>([]);

  useEffect(() => {
    if (link) {
      // const foundConditions = link.evolution_details.map((detail) =>
      //   Object.entries(detail)
      //     .filter(([key, value]) => !!value)
      //     .map(([key, value]) => ({ [key]: value }))
      //     .reduce((acc, cur) => ({ ...acc, ...cur }), {})
      // );
      // // console.log("foundConditions", foundConditions);
      // const matchedConditions = foundConditions.map((c) => {
      //   const possibleMatches = TRIGGER_MATCH[c.trigger.name];
      //   // console.log("pm", possibleMatches);
      //   // console.log("keys", Object.keys(c));
      //   const match = possibleMatches.find((pm) =>
      //     Object.keys(c).includes(pm.split(".")[0])
      //   );
      //   if (match) {
      //     return _.get(c, match);
      //   }
      //   return undefined;
      // });
      // // console.log("matchedConditions", matchedConditions);
      // setConditions(matchedConditions);

      const foundConditions = link.evolution_details.map((detail) =>
        Object.entries(detail)
          .filter(([_key, value]) => !!value)
          .map(([key, value]) => ({ [key]: value }))
          .reduce((acc, cur) => ({ ...acc, ...cur }), {})
      );
      console.log("foundConditions", foundConditions);
      const matchedConditions = foundConditions.map((c) => {
        const match = TRIGGER_MATCH[c.trigger.name];

        if (match) {
          const value = match.find(([key, _value]) => !!_.get(c, key));
          if (value) {
            return value[1](_.get(c, value[0]));
          }
        }
        return undefined;
      });
      setConditions(matchedConditions.filter((c) => !!c) as string[]);
    }
  }, [link]);

  return (
    <div style={{ marginLeft: `${10 * recursionLevel}px` }}>
      <div>
        {properCase(link.species.name)} @{" "}
        {conditions.length ? <span>{conditions.join(", ")}</span> : "0"}
      </div>
      {link.evolves_to.map((subLink) => (
        <EvolutionCard
          key={subLink.species.name}
          link={subLink}
          recursionLevel={recursionLevel + 1}
        />
      ))}
    </div>
  );
};

export default EvolutionCard;
