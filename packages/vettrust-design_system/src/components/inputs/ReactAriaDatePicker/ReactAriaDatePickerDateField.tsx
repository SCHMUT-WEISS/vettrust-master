/* eslint-disable no-use-before-define,react/no-array-index-key */
import React, { useRef } from "react";
import { useDateFieldState } from "react-stately";
import { useDateField, useDateSegment, useLocale } from "react-aria";
import { createCalendar } from "@internationalized/date";

export function ReactAriaDatePickerDateField(props: any) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });

  const ref = useRef();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref as any} className="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

function DateSegment({ segment, state }: any) {
  const ref = useRef();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref as any}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? `${String(segment.maxValue).length}ch`
            : undefined
      }}
      className={`box-content tabular-nums text-center p-0 outline-none rounded-sm focus:text-darkBlue group w-fit ${
        !segment.isEditable
          ? "text-gray-sand-pressed"
          : "text-darkBlue focus:bg-magenta/5"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full italic text-gray-sand-pressed group-focus:bg-magenta/5"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none"
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}
