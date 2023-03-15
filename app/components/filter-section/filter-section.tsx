import type { Dispatch, SetStateAction } from "react";
import { REGIONS } from "~/constants/versions-constants";
import { properCase } from "~/utils/text-utils";
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
        options={REGIONS.map((r) => ({ name: properCase(r), value: r }))}
        placeholder="Region"
        callback={setSelectedRegion}
        selection={selectedRegion}
      />
    </div>
  );
};

export default FilterSection;
