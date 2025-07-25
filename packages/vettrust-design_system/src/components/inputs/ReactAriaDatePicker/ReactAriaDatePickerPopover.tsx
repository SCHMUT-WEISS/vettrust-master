import * as React from "react";
import { usePopover, DismissButton, Overlay } from "@react-aria/overlays";

export function ReactAriaDatePickerPopover(props: any) {
  const ref = React.useRef(null);
  const { state, children } = props;

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div
        {...popoverProps}
        ref={ref}
        className="absolute top-full bg-white border border-sand-pressed rounded-md shadow-lg mt-2 p-8 z-10"
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
