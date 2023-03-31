import { useMemo, useContext, useState, useEffect } from "react";
import _ from "lodash";
import sortArray from "sort-array";

import type { IMove, IPokemonFull, IPokeSkeleton } from "~/interfaces";
import { isFullPokemon } from "~/utils/type-guards";

import { properCase } from "~/utils/text-utils";
import { PokemonContext } from "~/pokemon-context";
import { filterMovesByVersionGroup } from "~/utils/helpers";
import PokeAPIService from "~/utils/pokeapi-service";

import Select from "../common/select";
import EditIcons from "./edit-icons";
import SpriteFrame from "../common/sprite-frame";
import ScoreCard from "./score-card";
import EvolutionSelector from "./evolution-selector";
import {
  makeDefensiveValues,
  makeDelta,
  makeOffensiveValues,
  scoreDefValues,
  scoreOffValues,
} from "~/utils/scoring-helpers";

const PokemonCard = ({
  targetPoke,
  currentLocation,
}: {
  targetPoke: IPokeSkeleton;
  currentLocation: string;
}) => {
  const {
    versionGroup,
    mergeIntoBench,
    mergeIntoTeam,
    team,
    teamDefScores,
    teamOffScores,
    moveScores,
    statScores,
    gen,
  } = useContext(PokemonContext);
  const [fullPoke, setFullPoke] = useState<IPokemonFull>({} as IPokemonFull);
  const [loading, setLoading] = useState(true);
  const [prevEvoMoves, setPrevEvoMoves] = useState<IMove[]>([]);
  const [deltas, setDeltas] = useState<{ id: number; delta: number }[]>([]);

  useEffect(() => {
    const P = new PokeAPIService();
    const getPrevEvoMoves = async (pokemon: IPokemonFull): Promise<IMove[]> => {
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
                async (parent) => await getPrevEvoMoves(parent)
              )
            )
          ),
        ];
      }
      return [];
    };

    const getFullPoke = async () => {
      const result = (await P.getPokemonByName([targetPoke.name]))[0];
      setPrevEvoMoves(await getPrevEvoMoves(result));
      setFullPoke(result);
      setLoading(false);
    };
    setLoading(true);
    getFullPoke();
  }, [targetPoke.name, versionGroup]);

  useEffect(() => {
    const calcDeltas = async () => {
      if (isFullPokemon(fullPoke)) {
        setDeltas([]);
        const P = new PokeAPIService();
        const thisPokeDefValues = {
          name: targetPoke.name,
          values: scoreDefValues(
            await makeDefensiveValues({ pokemon: fullPoke, P, gen })
          ),
        };
        const thisPokeOffValues = {
          name: targetPoke.name,
          values: scoreOffValues(await makeOffensiveValues(targetPoke, P)),
        };
        const result = team.map((teamPoke) => {
          return {
            id: teamPoke.id,
            delta: makeDelta({
              teamDefScores,
              teamOffScores,
              scoringPokeDefValues: thisPokeDefValues,
              scoringPokeOffValues: thisPokeOffValues,
              teamPokemon: teamPoke,
              scoringPokemon: targetPoke,
              moveScores,
              statScores,
            }),
          };
        });
        sortArray(result, { by: "delta", order: "desc" });
        setDeltas(result);
      }
    };

    if (
      Object.keys(teamOffScores).length &&
      Object.keys(teamDefScores).length &&
      Object.keys(moveScores).length &&
      Object.keys(statScores).length
    )
      calcDeltas();
  }, [
    fullPoke,
    gen,
    moveScores,
    statScores,
    targetPoke,
    team,
    teamDefScores,
    teamOffScores,
  ]);

  const moveList = useMemo(() => {
    const { moves } = fullPoke;
    if (!moves) return [];
    const filteredMoves = _.uniqBy(
      [...prevEvoMoves, ...filterMovesByVersionGroup(moves, versionGroup)],
      "move.name"
    ).map(({ move: { name } }) => ({
      name: `${properCase(name)} (${
        _.get(moveScores, `[${targetPoke.id}].moves[${name}].score`) || "---"
      })`,
      value: name,
    }));
    sortArray(filteredMoves, { by: "value" });
    return filteredMoves;
  }, [fullPoke, moveScores, prevEvoMoves, targetPoke.id, versionGroup]);

  const mergeMove = (value: string, moveIndex: number) => {
    if (currentLocation === "team") {
      mergeIntoTeam({
        ...targetPoke,
        moves: { ...targetPoke.moves, [moveIndex]: value },
      });
    } else {
      mergeIntoBench({
        ...targetPoke,
        moves: { ...targetPoke.moves, [moveIndex]: value },
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex" data-cy={`poke-card-${targetPoke.name}`}>
      <div>
        <div>
          <span>{properCase(targetPoke.name)}</span>
        </div>
        <div className="">
          <SpriteFrame pokemon={fullPoke} />
          <div className="flex items-end justify-between">
            <ScoreCard
              label="Move score"
              value={_.get(moveScores, `[${targetPoke.id}].final`) || 0}
              dataCy="move-score-card"
            />
            {currentLocation === "bench" ? (
              <ScoreCard
                label={
                  deltas.length
                    ? `Switched for ${
                        team.find(({ id: teamId }) => deltas[0].id === teamId)
                          ?.name
                      }`
                    : undefined
                }
                value={deltas.length ? deltas[0].delta : 0}
                dataCy="delta-card"
              />
            ) : (
              <EvolutionSelector
                pokemon={fullPoke}
                evolve={(newSpecies: string) =>
                  mergeIntoTeam({ ...targetPoke, name: newSpecies })
                }
              />
            )}
            <ScoreCard
              label="Stat score"
              value={statScores[targetPoke.id] || 0}
              dataCy="stat-card"
            />
          </div>
          <EditIcons
            currentLocation={currentLocation}
            pokemon={targetPoke}
            fullPoke={fullPoke}
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        {_.range(4).map((i) => (
          <Select
            key={`${targetPoke.id}-${i}`}
            options={moveList}
            callback={(value) => mergeMove(value, i)}
            selection={targetPoke.moves[i]}
            dataCy={`move-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
