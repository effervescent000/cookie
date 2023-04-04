import _ from "lodash";
import { useEffect, useState } from "react";
import sortArray from "sort-array";

import type {
  IMove,
  IMoveScores,
  IPokemonFull,
  IPokeSkeleton,
} from "~/interfaces";
import { filterMovesByVersionGroup } from "../helpers";
import PokeAPIService from "../pokeapi-service";
import { properCase } from "../text-utils";

export const useMoveList = ({
  fullPokemon,
  versionGroup,
  targetPoke,
  moveScores,
}: {
  fullPokemon: IPokemonFull;
  versionGroup: string;
  targetPoke: IPokeSkeleton;
  moveScores?: IMoveScores;
}) => {
  const [prevEvoMoves, setPrevEvoMoves] = useState<IMove[]>([]);
  const [moveList, setMoveList] = useState<{ name: string; value: string }[]>(
    []
  );

  useEffect(() => {
    const P = new PokeAPIService();
    const makePrevEvoMoves = async (
      pokemon: IPokemonFull
    ): Promise<IMove[]> => {
      const species = await P.getSpecies(pokemon.species.name);
      if (species.evolves_from_species) {
        const parentSpecies = await P.getSpecies(
          species.evolves_from_species.name
        );
        // we dont have a way to tell from the API which varieties evolve to/from which, so
        // we're forced to just check moves for all the varieties
        const parentSpeciesVarieties = await P.getPokemonByName(
          parentSpecies.varieties.map(
            ({ pokemon: parentVariety }) => parentVariety.name
          )
        );
        const immediateParentMoves = _.uniqBy(
          _.flatten(
            parentSpeciesVarieties.map((parent) =>
              filterMovesByVersionGroup(parent.moves, versionGroup)
            )
          ),
          "move.name"
        );
        return [
          ...immediateParentMoves,
          ..._.flatten(
            await Promise.all(
              parentSpeciesVarieties.map(
                async (parent) => await makePrevEvoMoves(parent)
              )
            )
          ),
        ];
      }
      return [];
    };

    const getPrevEvoMakes = async (fullPokemon: IPokemonFull) =>
      setPrevEvoMoves(await makePrevEvoMoves(fullPokemon));

    if (fullPokemon.id) getPrevEvoMakes(fullPokemon);
  }, [fullPokemon, versionGroup]);

  useEffect(() => {
    const { moves } = fullPokemon;
    if (!moves) {
      setMoveList([]);
    } else {
      const filteredMoves = _.uniqBy(
        [...prevEvoMoves, ...filterMovesByVersionGroup(moves, versionGroup)],
        "move.name"
      ).map(({ move: { name } }) => ({
        name: `${properCase(name)}${
          moveScores
            ? ` (${
                _.get(moveScores, `[${targetPoke.id}].moves[${name}].score`) ||
                "---"
              })`
            : ""
        }`,
        value: name,
      }));
      sortArray(filteredMoves, { by: "value" });
      filteredMoves.push({ name: "Other", value: "_other" });
      setMoveList(filteredMoves);
    }
  }, [fullPokemon, moveScores, prevEvoMoves, targetPoke.id, versionGroup]);

  return moveList;
};
