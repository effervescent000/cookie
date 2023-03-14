import type { IOptions } from "~/interfaces";

const Select = ({
  options,
  placeholder,
  label,
  callback = () => {},
}: {
  options?: IOptions[];
  placeholder?: string;
  label?: string;
  callback?: (arg0: string) => void;
}) => {
  return (
    <div>
      <span>{label}</span>
      <select
        placeholder={placeholder}
        onChange={(e) => callback(e.target.value)}
      >
        {options?.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
