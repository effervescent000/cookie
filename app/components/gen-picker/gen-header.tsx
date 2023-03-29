const GenHeader = ({
  version,
  selectedVersion,
  setVersion,
  versionKey,
}: {
  version: string;
  selectedVersion: number | string;
  setVersion: <Type>(arg0: Type) => void;
  versionKey: number | string;
}) => {
  return (
    <span
      className={`${versionKey === selectedVersion && "underline"}`}
      onClick={() => setVersion(versionKey)}
      data-cy={`version-${versionKey}`}
    >
      {version}
    </span>
  );
};

export default GenHeader;
