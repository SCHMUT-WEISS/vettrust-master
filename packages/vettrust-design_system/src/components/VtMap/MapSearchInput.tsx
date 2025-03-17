/* eslint-disable camelcase */
/* eslint-disable react/require-default-props,jsx-a11y/no-noninteractive-tabindex,jsx-a11y/no-autofocus,react-hooks/rules-of-hooks */
import React, { useRef, useState } from "react";
import { useFocus } from "react-aria";
import { useAtom } from "jotai";
import { getMapBounds } from "./VetTrustMap";
import { FormSearchInputProps } from "../../@types/components/inputs";
import { CFCollectionLocation } from "../../@types/content/CFClollectionLocation";
import MapsCompassIcon from "./MapsCompassIcon";
import { VTAtom } from "../../@types";

interface MapSearchInputProps extends FormSearchInputProps {
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  customUseAtom: typeof useAtom;
}

const MapSearchInput = ({
  labelKey,
  forText,
  isRequired,
  tabIndex,
  placeHolder,
  style,
  onSearchClicked,
  onChange,
  value,
  autoFocus,
  allLocationsAtom,
  customUseAtom
}: MapSearchInputProps) => {
  const autoCompleteRef = useRef<any>(null);
  const inputInternalRef = useRef<HTMLInputElement>(null);
  const [allLocations] = customUseAtom(allLocationsAtom);
  const [focussed, setFocussed] = React.useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const { focusProps } = useFocus({
    onFocusChange: (isFocused) => {
      if (isFocused) {
        setFocussed(true);
        // eslint-disable-next-line no-unused-expressions
        inputInternalRef.current?.focus();
      }
    }
  });

  const getBounds = () => {
    if (allLocations.length !== 0)
      return getMapBounds(
        allLocations.map(
          (el) =>
            ({
              lat: el.fields.address.lat,
              lng: el.fields.address.lon
            } as any)
        )
      );

    return undefined;
  };

  React.useEffect(() => {
    if(!inputInternalRef.current || autoCompleteRef.current) return;
    const options = {
      fields: ["place_id", "geometry", "formatted_address"],
      types: ["geocode"],
      bounds: getBounds()
    };

    if(currentValue !== value && currentValue && currentValue !== "" && currentValue?.length >= 2) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputInternalRef.current,
        options
      );

      autoCompleteRef.current.setBounds(getBounds());

      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();
        onSearchClicked(place);
      });
    }
  }, [inputInternalRef, currentValue]);

  return (
    <div
      className="font-semibold bg-white rounded-[12px] relative group"
      style={style}
      tabIndex={0}
      {...focusProps}
    >
      {labelKey && (
        <label
          htmlFor={forText}
          className="font-semibold text-[16px] md:text-base mb-[12px] block font-NotoSans text-darkBlue"
        >
          {labelKey}
          {isRequired && <span className="text-red-600 ml-[4px]">*</span>}
        </label>
      )}
      {focussed && (
        <div className="absolute w-[calc(100%_+_8px)] h-[calc(100%_+_8px)] border border-[2px] border-magenta/50 z-[-1] left-[-4px] top-[-4px] rounded-[15px]">
          &nbsp;
        </div>
      )}
      <>
        <input
          ref={inputInternalRef}
          type="text"
          id={forText}
          tabIndex={tabIndex}
          placeholder={(placeHolder || labelKey) as any}
          className="rounded-[12px] pl-[16px] pr-[40px] h-[48px] w-full outline-none border border-sand-pressed input focus:bg-magenta/5 focus:border-magenta"
          autoFocus={autoFocus}
          value={currentValue}
          onChange={(e) => {
            setCurrentValue(e.target.value);
            if (onChange)
              onChange(e.target.value, e);
          }}
        />
      </>
      <MapsCompassIcon />
    </div>
  );
};

export default MapSearchInput;
