import { useState, useEffect } from "react";

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
  const [conditions, setConditions] = useState<(number | string)[]>([]);

  useEffect(() => {
    const conditions = link.evolution_details.map((detail) =>
      Object.entries(detail)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => ({ [key]: value }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    );
    const matchedConditions = conditions.map((c) => {
      const possibleMatches = TRIGGER_MATCH[c.trigger.name];
      const match = possibleMatches.find((pm: string) =>
        Object.keys(c).includes(pm)
      );
      if (match) {
        return c[match];
      }
      return undefined;
    });
    console.log(matchedConditions);
    setConditions(matchedConditions);
  }, [link]);

  return (
    <div style={{ marginLeft: `${10 * recursionLevel}px` }}>
      <div>
        {properCase(link.species.name)} @{" "}
        {conditions.length
          ? conditions.map((c, i) => <span key={i}>{c}</span>)
          : "0"}
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
