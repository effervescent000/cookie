import type { IType } from "~/interfaces";

const ElementCard = ({
  label,
  type,
  value,
}: {
  label: string;
  type: IType;
  value: number;
}) => {
  return (
    <div>
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
};

export default ElementCard;
