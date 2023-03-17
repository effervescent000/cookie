import { useState } from "react";
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
import type { IPokemonFull } from "./interfaces";

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
  const [gen, setGen] = useState("VIII");
  const [selectedRegion, setSelectedRegion] = useState("galar");
  const [versionGroup, setVersionGroup] = useState("");
  const [team, setTeam] = useState<IPokemonFull[]>([]);
  const [bench, setBench] = useState<IPokemonFull[]>([]);

  const incrementId = () => setIdCounter(idCounter + 1);

  const mergeIntoTeam = (target: IPokemonFull) => {
    const found = team.find(({ id: pokeId }) => pokeId === target.id);
    if (!found) {
      setTeam([...team, target]);
      removeFromBench(target);
      incrementId();
    }
  };

  const mergeIntoBench = (target: IPokemonFull) => {
    const found = bench.find(({ id: pokeId }) => pokeId === target.id);
    if (!found) {
      setBench([...bench, target]);
      removeFromTeam(target);
      incrementId();
    }
  };

  const removeFromBench = (target: IPokemonFull) => {
    setBench(bench.filter(({ id: pokeId }) => pokeId !== target.id));
  };

  const removeFromTeam = (target: IPokemonFull) => {
    setTeam(team.filter(({ id: pokeId }) => pokeId !== target.id));
  };

  return (
    <PokemonContext.Provider
      value={{
        gen,
        setGen,
        region: selectedRegion,
        team,
        bench,
        idCounter,
        mergeIntoTeam,
        mergeIntoBench,
        setRegion: setSelectedRegion,
        versionGroup,
        setVersionGroup,
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
