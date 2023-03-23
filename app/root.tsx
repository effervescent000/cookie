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

import type { IPokemonFull, IPokeSkeleton } from "./interfaces";
import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "./utils/pokeapi-service";
import {
  makeTeamDefensiveValues,
  makeTeamOffensiveValues,
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
  const [idCounter, setIdCounter] = useState(0);
  const [gen, setGen] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("galar");
  const [versionGroup, setVersionGroup] = useState("");
  const [team, setTeam] = useState<IPokeSkeleton[]>([]);
  const [bench, setBench] = useState<IPokeSkeleton[]>([]);
  const [focusedPokemon, setFocusedPokemon] = useState<
    IPokemonFull | undefined
  >(undefined);
  const [teamDefScores, setTeamDefScores] = useState({});
  const [teamOffScores, setTeamOffScores] = useState({});

  useEffect(() => {
    const P = new PokeAPIService();
    const getTeamDefScores = async () => {
      const currentScores = await makeTeamDefensiveValues(team, P);
      setTeamDefScores(currentScores);
    };
    const getTeamOffScores = async () => {
      const currentScores = await makeTeamOffensiveValues(team, P);
      setTeamOffScores(currentScores);
    };
    getTeamDefScores();
    getTeamOffScores();
  }, [team]);

  const saveGen = (targetGen: string) => {
    setGen(targetGen);
    localStorage.setItem("gen", targetGen);
  };

  const saveVersionGroup = (targetVersionGroup: string) => {
    setVersionGroup(targetVersionGroup);
    localStorage.setItem("game", targetVersionGroup);
  };

  const incrementId = () => {
    const newId = idCounter + 1;
    localStorage.setItem("id", `${newId}`);
    setIdCounter(newId);
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
    saveTeamToLocal(newList);
    removeFromBench(target);
    incrementId();
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
    saveBenchToLocal(newList);
    removeFromTeam(target);
    incrementId();
  };

  const saveTeamToLocal = (newTeam: IPokeSkeleton[]) => {
    localStorage.setItem("team", JSON.stringify(newTeam));
  };

  const saveBenchToLocal = (newBench: IPokeSkeleton[]) => {
    localStorage.setItem("bench", JSON.stringify(newBench));
  };

  const removeFromBench = (target: IPokeSkeleton) => {
    const newBench = bench.filter(({ id: pokeId }) => pokeId !== target.id);
    if (bench.length !== newBench.length) {
      setBench(newBench);
      saveBenchToLocal(newBench);
    }
  };

  const removeFromTeam = (target: IPokeSkeleton) => {
    const newTeam = team.filter(({ id: pokeId }) => pokeId !== target.id);
    if (team.length !== newTeam.length) {
      setTeam(newTeam);
      saveTeamToLocal(newTeam);
    }
  };

  useEffect(() => {
    setGen(localStorage.getItem("gen") || "VIII");
    setVersionGroup(localStorage.getItem("game") || "sword-shield");
    setIdCounter(+(localStorage.getItem("id") || 0));
    const foundTeam = localStorage.getItem("team");
    if (foundTeam) {
      setTeam(JSON.parse(foundTeam));
    }
    const foundBench = localStorage.getItem("bench");
    if (foundBench) {
      setBench(JSON.parse(foundBench));
    }
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        gen,
        setGen: saveGen,
        region: selectedRegion,
        team,
        bench,
        idCounter,
        mergeIntoTeam,
        mergeIntoBench,
        setRegion: setSelectedRegion,
        versionGroup,
        setVersionGroup: saveVersionGroup,
        removeFromBench,
        removeFromTeam,
        focusedPokemon,
        setFocusedPokemon,
        teamDefScores,
        setTeamDefScores,
        teamOffScores,
        setTeamOffScores,
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
