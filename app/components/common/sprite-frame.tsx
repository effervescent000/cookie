import type { IPokemonFull, IResourceListItem } from "~/interfaces";
import useWindowSize from "~/utils/hooks/use-window-size";
import { isFullPokemon } from "~/utils/type-guards";

const SpriteFrame = ({
  pokemon,
}: {
  pokemon: IPokemonFull | IResourceListItem;
}) => {
  const { windowSize } = useWindowSize();
  if (isFullPokemon(pokemon)) {
    const sprites = [
      pokemon.sprites.front_default,
      pokemon.sprites.front_female,
    ];
    return (
      <div className="flex h-20 w-20 justify-center xl:w-40">
        <img key={sprites[0]} src={sprites[0] || undefined} alt="Sprite" />
        {sprites[1] && windowSize > 1080 && (
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
