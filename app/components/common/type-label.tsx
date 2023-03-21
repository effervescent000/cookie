import type { IType } from "~/interfaces";

import { properCase } from "~/utils/text-utils";

const TypeLabel = ({ type, mini }: { type: IType; mini?: boolean }) => {
  return (
    <div
      style={{ background: type.bgColor }}
      className="w-full rounded-md p-0.5 text-center text-white"
    >
      {properCase(mini ? type.abbr || type.key : type.key)}
    </div>
  );
};

export default TypeLabel;
