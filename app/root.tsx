import { useEffect, useState } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import reactTooltipStylesheetUrl from "react-tooltip/dist/react-tooltip.css";

import type { IPokemonFull, IPokeSkeleton, IProfile } from "./interfaces";
import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "./utils/pokeapi-service";
import {
  compileTeamValues,
  makeTeamDefensiveValues,
  makeTeamOffensiveValues,
  sumCompiledTeamValues,
} from "./utils/helpers";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: reactTooltipStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const [pokemonIdCounter, setPokemonIdCounter] = useState(0);
  const [gen, setGen] = useState("");
  const [versionGroup, setVersionGroup] = useState("");
  const [team, setTeam] = useState<IPokeSkeleton[]>([]);
  const [bench, setBench] = useState<IPokeSkeleton[]>([]);
  const [focusedPokemon, setFocusedPokemon] = useState<
    IPokemonFull | undefined
  >(undefined);
  const [teamDefScores, setTeamDefScores] = useState({
    final: 0,
    raw: {},
    processed: {},
  });
  const [teamOffScores, setTeamOffScores] = useState({
    final: 0,
    raw: {},
    processed: {},
  });

  const [profileIds, setProfileIds] = useState({ active: -1, counter: 1 });

  useEffect(() => {
    const P = new PokeAPIService();
    const getTeamDefScores = async () => {
      const currentScores = await makeTeamDefensiveValues(team, P);
      setTeamDefScores({
        raw: currentScores.raw,
        final: sumCompiledTeamValues(compileTeamValues(currentScores.raw)),
        processed: currentScores.final,
      });
    };
    const getTeamOffScores = async () => {
      const currentScores = await makeTeamOffensiveValues(team, P);
      setTeamOffScores({
        raw: currentScores.raw,
        final: sumCompiledTeamValues(compileTeamValues(currentScores.raw)),
        processed: currentScores.final,
      });
    };
    getTeamDefScores();
    getTeamOffScores();
  }, [team]);

  const getActiveProfile = () => {
    return JSON.parse(
      localStorage.getItem(`profile-${profileIds.active}`) || "{}"
    );
  };

  const saveCurrentProfile = (name?: string) => {
    const storedProfile = getActiveProfile();
    if (Object.keys(storedProfile).length) {
      const profile = {
        name: name || storedProfile.name,
        values: { team, bench, gen, versionGroup, pokemonIdCounter },
      };
      localStorage.setItem(
        `profile-${profileIds.active}`,
        JSON.stringify(profile)
      );
    }
  };

  useEffect(() => {
    if (profileIds.active !== -1) {
      saveCurrentProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bench, gen, pokemonIdCounter, team, versionGroup]);

  const addNewProfile = () => {
    const profile = {
      team: [],
      bench: [],
      gen: "",
      versionGroup: "",
      pokemonIdCounter: 0,
    };
    localStorage.setItem(
      `profile-${profileIds.counter}`,
      JSON.stringify({ name: "", values: profile })
    );
    setProfileIds({
      active: profileIds.counter,
      counter: profileIds.counter + 1,
    });
  };

  const incrementPokemonId = () => {
    const newId = pokemonIdCounter + 1;
    setPokemonIdCounter(newId);
  };

  const mergeIntoTeam = (target: IPokeSkeleton) => {
    let newList;
    const foundIndex = team.findIndex(
      ({ id: existingId }) => existingId === target.id
    );
    if (foundIndex !== -1) {
      newList = [...team];
      newList[foundIndex] = target;
    } else {
      newList = [...team, target];
    }
    setTeam(newList);
    removeFromBench(target);
    incrementPokemonId();
  };

  const mergeIntoBench = (target: IPokeSkeleton) => {
    let newList;
    const foundIndex = bench.findIndex(
      ({ id: existingId }) => existingId === target.id
    );
    if (foundIndex !== -1) {
      newList = [...bench];
      newList[foundIndex] = target;
    } else {
      newList = [...bench, target];
    }
    setBench(newList);

    removeFromTeam(target);
    incrementPokemonId();
  };

  const removeFromBench = (target: IPokeSkeleton) => {
    const newBench = bench.filter(({ id: pokeId }) => pokeId !== target.id);
    if (bench.length !== newBench.length) {
      setBench(newBench);
    }
  };

  const removeFromTeam = (target: IPokeSkeleton) => {
    const newTeam = team.filter(({ id: pokeId }) => pokeId !== target.id);
    if (team.length !== newTeam.length) {
      setTeam(newTeam);
    }
  };

  useEffect(() => {
    if (profileIds.active !== -1) {
      localStorage.setItem("activeProfileId", `${profileIds.active}`);
      localStorage.setItem("profileIdCounter", `${profileIds.counter}`);
      const profile = JSON.parse(
        localStorage.getItem(`profile-${profileIds.active}`) || "{}"
      ) as IProfile;
      if (Object.keys(profile).length) {
        const { values } = profile;
        setTeam(values.team || []);
        setBench(values.bench || []);
        setGen(values.gen || "");
        setVersionGroup(values.versionGroup || "");
        setPokemonIdCounter(+values.pokemonIdCounter || 0);
      }
    } else {
      const foundProfileId = localStorage.getItem("activeProfileId");
      const foundProfileCounter = localStorage.getItem("profileIdCounter");
      setProfileIds({
        active: foundProfileId !== null ? +foundProfileId : 0,
        counter: foundProfileCounter !== null ? +foundProfileCounter : 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileIds]);

  return (
    <PokemonContext.Provider
      value={{
        gen,
        setGen,
        team,
        bench,
        idCounter: pokemonIdCounter,
        mergeIntoTeam,
        mergeIntoBench,
        versionGroup,
        setVersionGroup,
        removeFromBench,
        removeFromTeam,
        focusedPokemon,
        setFocusedPokemon,
        teamDefScores,
        setTeamDefScores,
        teamOffScores,
        setTeamOffScores,
        activeProfileId: profileIds.active,
        setActiveProfileId: (id) =>
          setProfileIds({ ...profileIds, active: id }),
        addNewProfile,
      }}
    >
      <html lang="en" className="h-full">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="m-5 h-full bg-white text-black">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </PokemonContext.Provider>
  );
}
