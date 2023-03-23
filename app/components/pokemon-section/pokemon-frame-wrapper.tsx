import { useContext, useState, useEffect } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";
import { makeDefensiveValues, scoreDefValues } from "~/utils/helpers";

import CoverageWrapper from "../pokedex-coverage/coverage-wrapper";
import ElementalFramesWrapper from "./elemental-frames/elemental-frames-wrapper";
import FocusedCard from "./focused-view/focused-card";

import PokemonFrame from "./pokemon-frame";

const PokemonFrameWrapper = ({
  allPokemon,
}: {
  allPokemon: (IPokemonFull | IResourceListItem)[];
}) => {
  const { team, bench } = useContext(PokemonContext);

  const [scores, setScores] = useState({});

  useEffect(() => {
    const P = new PokeAPIService();
    const makeScores = async () => {
      if ([...team, ...bench].length) {
        const mergedPokemon = await P.getPokemonByName(
          [...team, ...bench].map(({ name }) => name)
        );
        const results = await Promise.all(
          mergedPokemon.map(async (pokemon) => ({
            id: pokemon.id,
            values: scoreDefValues(await makeDefensiveValues(pokemon, P)),
          }))
        );
        const typeScores = results.reduce((acc, cur) => ({
          ...acc,
          [cur.id]: Object.values(cur.values).reduce((x, y) => x + y, 0),
        }));
        setScores({ ...scores, type: typeScores });
      }
    };
    makeScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, bench]);

  return (
    <div className="flex justify-between gap-10">
      <div>
        <PokemonFrame pokemon={team} location="team" scores={scores} />
        <PokemonFrame pokemon={bench} location="bench" scores={scores} />
      </div>
      <FocusedCard />
      <CoverageWrapper allPokemon={allPokemon} />
      <ElementalFramesWrapper />
    </div>
  );
};

export default PokemonFrameWrapper;
