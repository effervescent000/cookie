import { useContext, useState, useEffect, useMemo } from "react";
import _ from "lodash";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import { PokemonContext } from "~/pokemon-context";
import { makeDefensiveValues } from "~/utils/helpers";
import PokeAPIService from "~/utils/pokeapi-service";
import { isFullPokemon } from "~/utils/type-guards";

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
        // const fullPoke = await P.getPokemonByName([poke.name]);
        for (const move of Object.values(poke.moves).filter((move) => !!move)) {
          const fullMove = await P.getMove(move);
          moveTypes.push(fullMove.type.name);
        }
      }
      moveTypes = _.uniq(moveTypes);
      console.log(moveTypes);
      checkPoke: for (const targetPoke of readyPokemon) {
        const thisPokeValues = await makeDefensiveValues(targetPoke, P);
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
    <div className="w-20 border border-light-blue">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{`${(coverageData.count / readyPokemon.length) * 100}%`}</div>
          <div>{coverageData.uncoveredPokemon.map(({ name }) => name)}</div>
        </>
      )}
    </div>
  );
};

export default CoverageWrapper;
