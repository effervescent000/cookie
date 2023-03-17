import { TYPES } from "~/constants/types-constants";

import { properCase } from "~/utils/text-utils";

import ElementCard from "./element-card";

const ElementalFrame = ({
  title,
  tableType,
}: {
  title: string;
  tableType: string;
}) => {
  return (
    <div>
      <div>{title}</div>
      <div className="grid grid-cols-6">
        {TYPES.map((type) => (
          <ElementCard
            key={type.key}
            label={properCase(type.key)}
            type={type}
            value={0}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementalFrame;
