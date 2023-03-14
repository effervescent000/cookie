import { useState } from "react";
// import { useOptionalUser } from "~/utils";

import PokemonInput from "~/components/common/pokemon-input";
import GenPicker from "~/components/gen-picker/gen-picker-main";

export default function Index() {
  // const user = useOptionalUser();
  const [gen, setGen] = useState(8);
  return (
    <div>
      <GenPicker gen={gen} setGen={setGen} />
      <div>
        {[...Array(6)].map((_, i) => (
          <PokemonInput pokemonOptions={["test"]} id={i} key={i} />
        ))}
      </div>
    </div>
  );
}
