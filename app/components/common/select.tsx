import { IOptions } from "~/interfaces";

const Select = ({
  options,
  placeholder,
  label,
}: {
  options?: IOptions[];
  placeholder?: string;
  label?: string;
}) => {
  return (
    <select placeholder={placeholder}>
      {options?.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
