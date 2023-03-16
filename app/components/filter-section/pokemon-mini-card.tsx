const PokemonMiniCard = ({
  full = false,
  pokeName,
}: {
  full?: boolean;
  pokeName: string;
}) => {
  return <div>{pokeName}</div>;
};

export default PokemonMiniCard;
