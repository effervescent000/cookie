import { TYPES } from "~/constants/types-constants";
import type { IFilters } from "~/interfaces";
import { properCase } from "~/utils/text-utils";
import Select from "../common/select";

const FilterWrapper = ({
  filters,
  mergeFilters,
}: {
  filters: IFilters;
  mergeFilters: (target: { [key: string]: any }) => void;
}) => {
  return (
    <div>
      <Select
        label="Type 1"
        callback={(value) => mergeFilters({ type1: value })}
        options={TYPES.map(({ key }) => ({
          name: properCase(key),
          value: key,
        }))}
        selection={filters.type1}
      />
      <Select
        label="Type 2"
        callback={(value) => mergeFilters({ type2: value })}
        options={TYPES.map(({ key }) => ({
          name: properCase(key),
          value: key,
        }))}
        selection={filters.type2}
      />
    </div>
  );
};

export default FilterWrapper;
