import { useContext } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";

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

  // const [scores, setScores] = useState({});

  // useEffect(() => {
  //   const P = new PokeAPIService();
  //   const makeDefScores = async () => {
  //     const pokemon = await P.getPokemonByName(
  //       [...team, ...bench].map(({ name }) => name)
  //     );
  //     const results = await Promise.all(
  //       pokemon.map(async (poke) => ({
  //         id: poke.id,
  //         values: scoreDefValues(await makeDefensiveValues(poke, P)),
  //       }))
  //     );
  //     const defScores = results.reduce((acc, cur) => ({
  //       ...acc,
  //       [cur.id]: Object.values(cur.values).reduce((x, y) => x + y, 0),
  //     }));
  //     setScores({...scores, defScores})
  //   };

  //   const makeOffScores = async () => {
  //     const results = await Promise.all(
  //       team.map(async (poke) => ({
  //         id: poke.id,
  //         values: scoreOffValues(await makeOffensiveValues(poke, P)),
  //       }))
  //     );
  //     const offScores = results.reduce((acc, cur) => ({...acc, [cur.id]: Object.values(cur.values).reduce((x, y) => x + y, 0)}))
  //     setScores({...scores, offScores})
  //   };

  //   const makeScores = async () => {
  //     if ([...team, ...bench].length) {
  //       makeDefScores();
  //       makeOffScores()
  //     }
  //   };
  //   makeScores();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [team, bench]);

  return (
    <div className="flex justify-between gap-10">
      <div>
        <PokemonFrame pokemon={team} location="team" />
        <PokemonFrame pokemon={bench} location="bench" />
      </div>
      <FocusedCard />
      <CoverageWrapper allPokemon={allPokemon} />
      <ElementalFramesWrapper />
    </div>
  );
};

export default PokemonFrameWrapper;
