import { useEffect, useState } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
// import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
// import { getUser } from "./session.server";

import { PokemonContext } from "~/pokemon-context";
import type { IPokemonFull, IPokeSkeleton } from "./interfaces";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

// export async function loader({ request }: LoaderArgs) {
//   return json({
//     user: await getUser(request),
//   });
// }

export default function App() {
  const [idCounter, setIdCounter] = useState(0);
  const [gen, setGen] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("galar");
  const [versionGroup, setVersionGroup] = useState("");
  const [team, setTeam] = useState<IPokeSkeleton[]>([]);
  const [bench, setBench] = useState<IPokeSkeleton[]>([]);

  const saveGen = (targetGen: string) => {
    setGen(targetGen);
    localStorage.setItem("gen", targetGen);
  };

  const saveVersionGroup = (targetVersionGroup: string) => {
    setVersionGroup(targetVersionGroup);
    localStorage.setItem("game", targetVersionGroup);
  };

  const incrementId = () => setIdCounter(idCounter + 1);

  const mergeIntoTeam = (target: IPokeSkeleton) => {
    const filteredTeam = team.filter(
      ({ id: existingId }) => existingId !== target.id
    );
    const newTeam = [...filteredTeam, target];
    setTeam(newTeam);
    saveTeamToLocal(newTeam);
    removeFromBench(target);
    incrementId();
  };

  const mergeIntoBench = (target: IPokeSkeleton) => {
    const filteredBench = bench.filter(
      ({ id: existingId }) => existingId !== target.id
    );
    const newBench = [...filteredBench, target];
    setBench(newBench);
    saveBenchToLocal(newBench);
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
    setBench(newBench);
    saveBenchToLocal(newBench);
  };

  const removeFromTeam = (target: IPokeSkeleton) => {
    const newTeam = team.filter(({ id: pokeId }) => pokeId !== target.id);
    setTeam(newTeam);
    saveTeamToLocal(newTeam);
  };

  useEffect(() => {
    setGen(localStorage.getItem("gen") || "VIII");
    setVersionGroup(localStorage.getItem("game") || "sword-shield");
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
