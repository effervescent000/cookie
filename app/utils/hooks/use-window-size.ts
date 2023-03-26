import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(1080);
  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);
  return { windowSize };
};

export default useWindowSize;
