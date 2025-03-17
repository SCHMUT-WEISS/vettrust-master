/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export function useWindowDimension(props?: {
  onlyX?: boolean;
  onlyY?: boolean;
}) {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDimensionDebounced = useCallback(
    debounce(() => {
      if (props?.onlyX && window.innerWidth !== dimension.width) {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        return;
      }

      if (props?.onlyY && window.innerHeight !== dimension.height) {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        return;
      }

      if (!props?.onlyX && !props?.onlyY) {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
      }
    }, 150), // 100ms
    []
  );

  useEffect(() => {
    window.addEventListener("resize", setDimensionDebounced);
    return () => window.removeEventListener("resize", setDimensionDebounced);
  }, []); // Note this empty array. this effect should run only on mount and unmount

  return dimension;
}
