import { useState } from "react";

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
  value: string;
  classes?: string;
  dataCy?: string;
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowOptions(event.target.value.length > 1);
  };

  const onClick = (opt: string) => {
    setInputValue(opt);
    callback(opt);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <span>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className={`m-1 rounded-md border border-light-blue bg-gray p-1 ${classes}`}
        data-cy={dataCy}
        value={inputValue}
      />
      {showOptions && (
        <ul className="absolute rounded-sm border border-gray bg-light-blue text-sm">
          {options
            .filter((opt) =>
              opt.replace("-", " ").includes(inputValue.toLowerCase())
            )
            .map((opt) => (
              <li
                key={opt}
                onClick={() => onClick(opt)}
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
