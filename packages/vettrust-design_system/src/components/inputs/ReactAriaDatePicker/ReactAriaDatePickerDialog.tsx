import { useDialog } from "react-aria";
import React from "react";

export function ReactAriaDatePickerDialog({ children, ...props }: any) {
  const ref = React.useRef();
  const { dialogProps } = useDialog(props, ref as any);

  return (
    <div {...dialogProps} ref={ref as any}>
      {children}
    </div>
  );
}
