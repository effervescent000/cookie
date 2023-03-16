const GenHeader = ({
  gen,
  selectedGen,
  setGen,
}: {
  gen: string;
  selectedGen: string;
  setGen: (arg0: string) => void;
}) => {
  return (
    <span
      className={`${gen === selectedGen && "underline"}`}
      onClick={() => setGen(gen)}
    >
      {gen}
    </span>
  );
};

export default GenHeader;
