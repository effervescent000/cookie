import type { IType } from "~/interfaces";

import { properCase } from "~/utils/text-utils";

const TypeLabel = ({
  type,
  mini,
  full,
}: {
  type: IType;
  mini?: boolean;
  full?: boolean;
}) => {
  return (
    <div
      style={{ background: type.bgColor }}
      className={`rounded-md py-0.5 px-1 text-center text-white ${
        full && "w-full"
      }`}
    >
      {properCase(mini ? type.abbr || type.key : type.key)}
    </div>
  );
};

export default TypeLabel;
