import { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Icon from "../common/icon";

const ScoreCard = ({ callback }: { callback: () => Promise<number> }) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    callback().then((n) => {
      setValue(Math.round(n));
      setLoading(false);
    });
  }, [callback]);

  return (
    <div>
      {loading ? <Icon classes="animate-spin" icon={faSpinner} /> : value}
    </div>
  );
};

export default ScoreCard;
