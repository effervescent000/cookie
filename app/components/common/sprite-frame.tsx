const SpriteFrame = ({ sprites }: { sprites: (string | null)[] }) => {
  return (
    <div className="flex justify-center">
      {sprites
        .filter((sprite) => !!sprite)
        .map((sprite) => (
          <img key={sprite} src={sprite} />
        ))}
    </div>
  );
};

export default SpriteFrame;
