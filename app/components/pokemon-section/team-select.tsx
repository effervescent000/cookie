import PokemonInput from "./pokemon-input";

const TeamSelect = () => {
  return (
    <div>
      {[...Array(6)].map((_, i) => (
        <PokemonInput pokemonOptions={["test"]} id={i} key={i} />
      ))}
    </div>
  );
};

export default TeamSelect;
