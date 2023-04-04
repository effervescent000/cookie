import type { IPokeSkeleton } from "~/interfaces";
import { properCase } from "~/utils/text-utils";

const VersusLabel = ({
  score: { pokemon, scores },
  dataCy,
}: {
  score: { pokemon: IPokeSkeleton; scores: { [key: string]: any }[] };
  dataCy?: string;
}) => {
  return (
    <div data-cy={dataCy}>
      Use {properCase(pokemon.name)} with {properCase(scores[0].name)} (
      {scores[0].score} pts)
    </div>
  );
};

export default VersusLabel;
