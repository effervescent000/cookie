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
      <div className="flex h-20 w-20 justify-center xl:w-40">
        {/* {sprites
          .filter((sprite) => !!sprite)
          .map((sprite) => (
            <img key={sprite} src={sprite || undefined} alt="Sprite" />
          ))} */}
        <img key={sprites[0]} src={sprites[0] || undefined} alt="Sprite" />
        {sprites[1] && (
          <img
            className="hidden xl:block"
            key={sprites[1]}
            src={sprites[1] || undefined}
            alt="Sprite"
          />
        )}
      </div>
    );
  }
  return <></>;
};

export default SpriteFrame;
