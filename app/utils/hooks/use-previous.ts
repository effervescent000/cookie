import { useEffect, useRef } from "react";

const usePrevious = <Type>(value: Type): Type => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
