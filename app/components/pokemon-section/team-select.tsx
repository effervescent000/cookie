import PokemonInput from "./pokemon-input";

const TeamSelect = ({ pokemonList }: { pokemonList: string[] }) => {
  return (
    <div>
      {[...Array(6)].map((_, i) => (
        <PokemonInput pokemonOptions={pokemonList} id={i} key={i} />
      ))}
    </div>
  );
};

export default TeamSelect;
