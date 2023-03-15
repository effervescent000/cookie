const GenListing = ({
  label,
  value,
  setGen,
  selectedGen,
}: {
  label: string;
  value: number;
  setGen: (arg0: number) => void;
  selectedGen: number;
}) => {
  return (
    <span
      onClick={() => setGen(value)}
      className={`${selectedGen === value && "underline"}`}
    >
      {label}
    </span>
  );
};

export default GenListing;
