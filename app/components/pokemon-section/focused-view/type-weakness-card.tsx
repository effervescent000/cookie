import TypeLabel from "~/components/common/type-label";
import { TYPE_LOOKUP } from "~/constants/types-constants";

const TypeWeaknessCard = ({
  label,
  types,
}: {
  label: string;
  types: string[];
}) => {
  return (
    <>
      <div>{label}</div>
      <div className="flex flex-wrap gap-1">
        {types.map((type) => (
          <TypeLabel key={type} type={TYPE_LOOKUP[type]} />
        ))}
      </div>
    </>
  );
};

export default TypeWeaknessCard;
