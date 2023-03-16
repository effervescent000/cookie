import PokemonMiniCard from "./pokemon-mini-card";

const ResultsWrapper = ({ output }: { output: { name: string }[] }) => {
  return (
    <div>
      {output.map(({ name }) => (
        <PokemonMiniCard key={name} pokeName={name} />
      ))}
    </div>
  );
};

export default ResultsWrapper;
