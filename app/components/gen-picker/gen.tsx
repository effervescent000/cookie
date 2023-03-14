import type { Dispatch, SetStateAction } from "react";

const GenListing = ({
  label,
  value,
  setGen,
  selectedGen,
}: {
  label: string;
  value: number;
  setGen: Dispatch<SetStateAction<number>>;
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
