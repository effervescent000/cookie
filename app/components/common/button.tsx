const Button = ({
  classes,
  onClick,
  dataCy,
  children,
}: {
  classes?: string;
  onClick?: () => void;
  dataCy?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`text-very-light-blue rounded-md border border-blue bg-light-blue px-1 text-sm ${classes}`}
      onClick={onClick}
      data-cy={dataCy}
    >
      {children}
    </button>
  );
};

export default Button;
