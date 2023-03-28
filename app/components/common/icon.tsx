import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const Icon = ({
  icon,
  onClick = () => {},
  classes,
  dataCy,
}: {
  icon: IconProp;
  onClick?: () => void;
  classes?: string;
  dataCy?: string;
}) => (
  <div>
    <FontAwesomeIcon
      icon={icon}
      onClick={onClick}
      className={`cursor-pointer ${classes}`}
      data-cy={dataCy}
    />
  </div>
);

export default Icon;
