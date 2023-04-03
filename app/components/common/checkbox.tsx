const Checkbox = ({
  value,
  callback,
  children,
  dataCy,
}: {
  value: boolean;
  callback: (value: string) => void;
  children: React.ReactNode;
  dataCy?: string;
}) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => callback(event.target.value)}
        data-cy={dataCy}
      />
      {children}
    </div>
  );
};

export default Checkbox;
