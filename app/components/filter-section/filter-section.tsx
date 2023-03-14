import type { Dispatch, SetStateAction } from "react";
import { REGIONS } from "~/constants/constants";
import Select from "../common/select";

const FilterSection = ({
  selectedRegion,
  setSelectedRegion,
}: {
  selectedRegion: string;
  setSelectedRegion: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      <Select
        options={REGIONS.map((r) => ({ name: r, value: r }))}
        placeholder="Region"
        callback={setSelectedRegion}
      />
    </div>
  );
};

export default FilterSection;
