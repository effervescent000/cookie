import type { IIndividualValues, IType } from "~/interfaces";

const ElementCard = ({
  label,
  type,
  value,
}: {
  label: string;
  type: IType;
  value: IIndividualValues;
}) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        style={{ background: type.bgColor }}
        className="w-full rounded-md p-0.5 text-center text-white"
      >
        {label}
      </div>
      <div
        className={`${
          (value.finalValue < 0 && "text-red") ||
          (value.finalValue > 0 && "text-green")
        }`}
      >
        {value.finalValue}
      </div>
    </div>
  );
};

export default ElementCard;
