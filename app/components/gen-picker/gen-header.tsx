const GenHeader = ({
  version,
  selectedVersion,
  setVersion,
}: {
  version: string;
  selectedVersion: string;
  setVersion: (arg0: string) => void;
}) => {
  return (
    <span
      className={`${version === selectedVersion && "underline"}`}
      onClick={() => setVersion(version)}
    >
      {version}
    </span>
  );
};

export default GenHeader;
