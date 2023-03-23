import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const Icon = ({
  icon,
  onClick = () => {},
  classes,
}: {
  icon: IconProp;
  onClick?: () => void;
  classes?: string;
}) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={icon}
        onClick={onClick}
        className={`cursor-pointer ${classes}`}
      />
    </div>
  );
};

export default Icon;
