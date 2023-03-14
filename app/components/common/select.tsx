import type { IOptions } from "~/interfaces";

const Select = ({
  options,
  placeholder,
  label,
  callback = () => {},
  selection,
}: {
  options: IOptions[];
  placeholder?: string;
  label?: string;
  callback?: (arg0: string) => void;
  selection?: string;
}) => {
  return (
    <div>
      <span>{label}</span>
      <select
        placeholder={placeholder}
        onChange={(e) => callback(e.target.value)}
        value={selection}
        className="m-1 w-48 rounded-md border border-light-blue bg-gray p-1"
      >
        {[{ name: "---", value: "" }, ...options].map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
