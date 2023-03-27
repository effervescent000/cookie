import { Tooltip } from "react-tooltip";
import TypeLabel from "~/components/common/type-label";

import type { IIndividualValues, IType } from "~/interfaces";
import useWindowSize from "~/utils/hooks/use-window-size";
import { properCase } from "~/utils/text-utils";

const ElementCard = ({
  type,
  value,
  tooltipKey,
}: {
  type: IType;
  value: IIndividualValues;
  tooltipKey: string;
}) => {
  const { windowSize } = useWindowSize();

  return (
    <div
      className="flex w-full flex-col items-center"
      data-tooltip-id={tooltipKey}
    >
      <TypeLabel type={type} full mini={windowSize <= 1080} />
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
