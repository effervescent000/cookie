import { getTypes } from "~/constants/types-constants";
import { makeLookup } from "~/utils/general-utils";

import TypeLabel from "~/components/common/type-label";

const TypeWeaknessCard = ({
  label,
  types,
}: {
  label: string;
  types: string[];
}) => {
  const typeLookup = makeLookup(getTypes(), "key");
  return (
    <>
      <div>{label}</div>
      <div className="flex flex-wrap gap-1">
        {types.map((type) => (
          <TypeLabel key={type} type={typeLookup[type]} />
        ))}
      </div>
    </>
  );
};

export default TypeWeaknessCard;
