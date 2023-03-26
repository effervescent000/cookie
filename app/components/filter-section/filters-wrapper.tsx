import _ from "lodash";

import type { IFilters } from "~/interfaces";

import { TYPES } from "~/constants/types-constants";
import { properCase } from "~/utils/text-utils";

import Select from "../common/select";
import TextInput from "../common/text-input";

const FilterWrapper = ({
  filters,
  mergeFilters,
}: {
  filters: IFilters;
  mergeFilters: (target: { [key: string]: any }) => void;
}) => (
  <div className="flex">
    <TextInput
      label="Name"
      callback={_.debounce((value) => mergeFilters({ name: value }), 250)}
    />
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

export default FilterWrapper;
