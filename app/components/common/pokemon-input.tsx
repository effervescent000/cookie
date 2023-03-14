import Select from "./select";

const PokemonInput = ({
  pokemonOptions,
  id,
}: {
  pokemonOptions: string[];
  id: number;
}) => {
  return (
    <div>
      <div>
        <Select
          options={pokemonOptions.map((opt) => ({ value: opt, name: opt }))}
          placeholder="Species"
        />
      </div>
    </div>
  );
};

export default PokemonInput;
