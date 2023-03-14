import { useState } from "react";
// import { useOptionalUser } from "~/utils";

// import GenPicker from "~/components/gen-picker/gen-picker-main";
import PokemonSection from "~/components/pokemon-section/pokemon-section";

export default function Index() {
  // const user = useOptionalUser();
  // const [gen, setGen] = useState(8);
  return (
    <div>
      {/* <GenPicker gen={gen} setGen={setGen} /> */}
      <PokemonSection />
    </div>
  );
}
