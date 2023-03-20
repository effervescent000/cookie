import { Tooltip } from "react-tooltip";

import type { IIndividualValues, IType } from "~/interfaces";
import { properCase } from "~/utils/text-utils";

const ElementCard = ({
  label,
  type,
  value,
  tooltipKey,
}: {
  label: string;
  type: IType;
  value: IIndividualValues;
  tooltipKey: string;
}) => {
  return (
    <div
      className="flex w-full flex-col items-center"
      data-tooltip-id={tooltipKey}
    >
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
        {value.finalValue || 0}
      </div>
      <Tooltip id={tooltipKey}>
        <>
          {value.details &&
            value.details
              .filter(([key, value]) => !!value)
              .map(([key, value]) => (
                <div key={key} className="grid grid-cols-[3fr_1fr]">
                  <span>{properCase(key)}</span>
                  <span className="justify-self-end">{value}</span>
                </div>
              ))}
        </>
      </Tooltip>
    </div>
  );
};

export default ElementCard;
