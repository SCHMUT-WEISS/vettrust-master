/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { debounce } from "lodash";

const useRefSize = (target: React.RefObject<HTMLElement>) => {
  const [size, setSize] = React.useState<DOMRect>();
  const debouncedSetSize = React.useCallback(
    debounce((newRect: DOMRect) => {
      setSize(newRect);
    }, 150), // 1s
    []
  );

  React.useLayoutEffect(() => {
    debouncedSetSize(target.current?.getBoundingClientRect() as DOMRect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSetSize, target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => debouncedSetSize(entry.contentRect));
  return size;
};

export default useRefSize;
