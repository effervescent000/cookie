import { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Icon from "../common/icon";

const ScoreCard = ({ value }: { value: number }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [value]);

  return (
    <div>
      {loading ? (
        <Icon classes="animate-spin" icon={faSpinner} />
      ) : (
        Math.round(value)
      )}
    </div>
  );
};

export default ScoreCard;
