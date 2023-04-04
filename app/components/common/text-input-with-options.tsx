import { properCase } from "~/utils/text-utils";

const TextInputWithOptions = ({
  label,
  callback,
  placeholder,
  options,
  value,
  classes,
  dataCy,
}: {
  label?: string;
  callback: (value: string) => void;
  placeholder?: string;
  options: string[];
  value?: string;
  classes?: string;
  dataCy?: string;
}) => {
  return (
    <div className="relative">
      <span>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => callback(e.target.value)}
        className={`m-1 w-48 rounded-md border border-light-blue bg-gray p-1 ${classes}`}
        data-cy={dataCy}
      />
      {value && value.trim().length > 0 && (
        <ul className="absolute text-sm">
          {options
            .filter((opt) =>
              opt.replace("-", " ").includes(value.toLowerCase())
            )
            .map((opt) => (
              <li
                key={opt}
                onClick={() => callback(opt)}
                data-cy={`custom-move-${opt}`}
              >
                {properCase(opt)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default TextInputWithOptions;
