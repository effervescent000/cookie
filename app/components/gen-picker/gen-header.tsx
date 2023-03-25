const GenHeader = ({
  version,
  selectedVersion,
  setVersion,
  versionKey,
}: {
  version: string;
  selectedVersion: string;
  setVersion: (arg0: string) => void;
  versionKey: string;
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
