import { properCase } from "~/utils/text-utils";

const TextInputWithOptions = ({
  label,
  callback,
  placeholder,
  options,
  value,
}: {
  label?: string;
  callback: (value: string) => void;
  placeholder?: string;
  options: string[];
  value?: string;
}) => {
  return (
    <div>
      <span>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => callback(e.target.value)}
        className="m-1 w-48 rounded-md border border-light-blue bg-gray p-1"
      />
      {value && value.trim().length > 0 && (
        <ul>
          {options
            .filter((opt) =>
              opt.replace("-", " ").includes(value.toLowerCase())
            )
            .map((opt) => (
              <li key={opt} onClick={() => callback(opt)}>
                {properCase(opt)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default TextInputWithOptions;
