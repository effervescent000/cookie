import { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Icon from "../common/icon";

const ScoreCard = ({ value, label }: { value: number; label?: string }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [value]);

  return (
    <div className="flex max-w-[50px] flex-col flex-wrap text-center">
      <div className="text-xs">{label}</div>
      {loading ? <Icon classes="animate-spin" icon={faSpinner} /> : value}
    </div>
  );
};

export default ScoreCard;
