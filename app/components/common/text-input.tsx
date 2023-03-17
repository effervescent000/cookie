const TextInput = ({
  label,
  callback,
  placeholder,
}: {
  label?: string;
  callback: (value: string) => void;
  placeholder?: string;
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
    </div>
  );
};

export default TextInput;
