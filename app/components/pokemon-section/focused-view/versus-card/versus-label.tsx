import type { IPokeSkeleton } from "~/interfaces";
import { properCase } from "~/utils/text-utils";

const VersusLabel = ({
  score: { pokemon, move, score },
  dataCy,
}: {
  score: { pokemon: IPokeSkeleton; move: string; score: number };
  dataCy?: string;
}) => {
  return (
    <div data-cy={dataCy}>
      Use {properCase(pokemon.name)} with {properCase(move)} ({score} pts)
    </div>
  );
};

export default VersusLabel;
