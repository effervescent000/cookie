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
    <div className={`cursor-pointer ${classes}`}>
      <FontAwesomeIcon icon={icon} onClick={onClick} />
    </div>
  );
};

export default Icon;
