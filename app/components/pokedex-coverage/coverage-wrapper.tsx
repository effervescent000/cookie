import { useContext, useState, useEffect, useMemo } from "react";
import _ from "lodash";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import { isFullPokemon } from "~/utils/type-guards";
import { makeDefensiveValues, scoreDefValues } from "~/utils/helpers";
import PokeAPIService from "~/utils/pokeapi-service";
import { PokemonContext } from "~/pokemon-context";

import PokemonMiniCard from "../filter-section/pokemon-mini-card";

const CoverageWrapper = ({
  allPokemon,
}: {
  allPokemon: (IPokemonFull | IResourceListItem)[];
}) => {
  const { team } = useContext(PokemonContext);
  const [coverageData, setCoverageData] = useState<{
    count: number;
    uncoveredPokemon: IPokemonFull[];
  }>({ count: 0, uncoveredPokemon: [] });
  const [loading, setLoading] = useState(true);
  const P = new PokeAPIService();

  const readyPokemon = useMemo(
    () => allPokemon.filter((poke) => isFullPokemon(poke)),
    [allPokemon]
  ) as IPokemonFull[];

  useEffect(() => {
    setLoading(true);
    let count = 0;
    const uncoveredPokemon: IPokemonFull[] = [];
    const makeCoverageData = async () => {
      const moveTypes = _.uniq(
        _.flatten(
          await Promise.all(
            team.map(async (poke) => {
              const response = await Promise.all(
                Object.values(poke.moves)
                  .filter((move) => !!move)
                  .map(async (move) => await P.getMove(move))
              );
              return response.map((move) => move.type.name);
            })
          )
        )
      );

      const defValuesByPoke = await Promise.all(
        readyPokemon.map(async (poke) => ({
          fullPoke: poke,
          values: scoreDefValues(await makeDefensiveValues(poke, P)),
        }))
      );
      defValuesByPoke.forEach((poke) => {
        let covered = false;
        for (const moveType of moveTypes) {
          if (poke.values[moveType] < 0) {
            count++;
            covered = true;
            break;
          }
        }
        if (!covered) uncoveredPokemon.push(poke.fullPoke);
      });
      setCoverageData({ count, uncoveredPokemon });
      setLoading(false);
    };

    makeCoverageData();
  }, [team, readyPokemon]);

  return (
    <div className="max-h-96 w-40 overflow-auto border border-light-blue">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{`${Math.round(
            (coverageData.count / readyPokemon.length) * 100
          )}%`}</div>
          <div>
            {coverageData.uncoveredPokemon.map((poke) => (
              <PokemonMiniCard key={poke.id} poke={poke} hideIcons api={P} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoverageWrapper;
