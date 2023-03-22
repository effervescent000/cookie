import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import { isFullPokemon } from "~/utils/type-guards";

const SpriteFrame = ({
  pokemon,
}: {
  pokemon: IPokemonFull | IResourceListItem;
}) => {
  if (isFullPokemon(pokemon)) {
    const sprites = [
      pokemon.sprites.front_default,
      pokemon.sprites.front_female,
    ];
    return (
      <div className="flex justify-center">
        {sprites
          .filter((sprite) => !!sprite)
          .map((sprite) => (
            <img key={sprite} src={sprite || undefined} alt="Sprite" />
          ))}
      </div>
    );
  }
  return <></>;
};

export default SpriteFrame;
