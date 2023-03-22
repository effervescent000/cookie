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
    const P = new PokeAPIService();
    const uncoveredPokemon: IPokemonFull[] = [];
    const makeCoverageData = async () => {
      let moveTypes: string[] = [];
      for (const poke of team) {
        for (const move of Object.values(poke.moves).filter((move) => !!move)) {
          const fullMove = await P.getMove(move);
          moveTypes.push(fullMove.type.name);
        }
      }
      moveTypes = _.uniq(moveTypes);
      checkPoke: for (const targetPoke of readyPokemon) {
        const thisPokeValues = scoreDefValues(
          await makeDefensiveValues(targetPoke, P)
        );
        for (const moveType of moveTypes) {
          if (thisPokeValues[moveType] < 0) {
            count++;
            continue checkPoke;
          }
        }
        uncoveredPokemon.push(targetPoke);
      }
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
