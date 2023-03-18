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
    <div className="w-full">
      <div style={{ background: type.bgColor }} className="w-full text-white">
        {label}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default ElementCard;
