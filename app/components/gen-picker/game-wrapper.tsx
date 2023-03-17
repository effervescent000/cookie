import { useContext } from "react";
import { VERSIONS } from "~/constants/versions-constants";
import { PokemonContext } from "~/pokemon-context";
import GenHeader from "./gen-header";

const GameWrapper = () => {
  const { gen, versionGroup, setVersionGroup } = useContext(PokemonContext);
  const foundGen = VERSIONS.find(({ name }) => gen === name);

  return (
    <div className="flex gap-3">
      {foundGen &&
        foundGen.children.map((child) => (
          <GenHeader
            key={child.key}
            version={child.name}
            versionKey={child.key}
            setVersion={setVersionGroup}
            selectedVersion={versionGroup}
          />
        ))}
    </div>
  );
};

export default GameWrapper;
