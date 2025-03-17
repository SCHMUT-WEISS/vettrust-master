/* eslint-disable consistent-return,react-hooks/exhaustive-deps,@typescript-eslint/ban-ts-ignore */
import React from "react";

const useMutationObserver = (
  // The query selector of the element to observe
  ref: string,
  // eslint-disable-next-line no-undef
  callback: MutationCallback,
  // So this is basically a variable that you change for the observer to be added again to the element
  observerTriggerCondition: boolean,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  }
) => {
  React.useEffect(
    // @ts-ignore
    () => {
      const dropdownElement = document.querySelector(ref);
      if (dropdownElement) {
        const observer = new MutationObserver(callback);
        observer.observe(dropdownElement, options);
        return () => observer.disconnect();
      }
    },
    // ⚠️ Never add the ref in this array
    [callback, options, observerTriggerCondition]
  );
};

export default useMutationObserver;
