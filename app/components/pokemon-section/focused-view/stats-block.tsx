import type { IPokemonFull } from "~/interfaces";
import { makeTotalsStats } from "~/utils/helpers";
import StatCard from "./stat-card";

const StatBlock = ({ pokemon }: { pokemon: IPokemonFull }) => {
  return (
    <div>
      <div>
        {pokemon.stats.map((stat) => (
          <StatCard
            key={stat.stat.name}
            label={stat.stat.name}
            amount={stat.base_stat}
            maxAmount={150}
          />
        ))}
      </div>
      <div>Total: {makeTotalsStats(pokemon)}</div>
    </div>
  );
};

export default StatBlock;
