import type { ISpeciesResponse } from "~/interfaces";

const CatchRateCard = ({ pokemon }: { pokemon: ISpeciesResponse }) => {
  const captureChance = (ballModifier: number) =>
    Math.round(((pokemon.capture_rate * ballModifier) / 255) * 100);
  return (
    <div>{[1, 1.5, 2].map((num) => `${captureChance(num)}%`).join(" / ")}</div>
  );
};

export default CatchRateCard;
