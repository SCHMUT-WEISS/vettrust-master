/* eslint-disable no-use-before-define,react-hooks/exhaustive-deps,indent,@typescript-eslint/ban-ts-ignore,react/jsx-indent */
import React, { useEffect, useState } from "react";
import { GoogleMap, InfoBox, Marker, InfoWindow } from "@react-google-maps/api";

import { useAtom } from "jotai";
import { LightTheme } from "./mapStyles";
import {
  ComponentProps,
  VTAtom,
  VtMapInstance,
  VtMapPinCoordinates,
  CFCollectionLocation,
  LocationFields,
  LocationsPlacedData,
  ModalsState,
  UseVtTranslateType
} from "../../@types";
import MapLocationPinDescriptor from "./MapLocationPinDescriptor";
import { NextRouter } from "../../@types/next";

// Return map bounds based on list of places
export const getMapBounds = (places: VtMapPinCoordinates[]) => {
  const bounds = new window.google.maps.LatLngBounds();

  places.forEach(({ lat, lng }) => {
    bounds.extend(new window.google.maps.LatLng(lat as any, lng as any));
  });
  return bounds;
};

const containerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 46.9546211,
  lng: 7.2514138
} as any;

const defaultPolygon = [
  {
    lat: 47.7084536,
    lng: 9.0816671
  },
  {
    lat: 46.2048584,
    lng: 6.1255293
  },
  {
    lat: 45.9906107,
    lng: 7.6717963
  },
  {
    lat: 46.48621,
    lng: 9.7719426
  }
] as any[];

const VetTrustMap: React.FC<ComponentProps<VtMapProps>> = ({
  isLoading,
  displayedPins,
  pinIcon,
  withoutLocationDescriptors,
  allLocationsAtom,
  allLocationsGPlacesDataAtom,
  currentlyDisplayedLocationAtom,
  currentModalAtom,
  router,
  useVtTranslate,
  customUseAtom,
  isPracticeSearchModalDisplayedAtom
}) => {
  const [mapInstance, setMapInstance] = React.useState<VtMapInstance | null>(
    null
  );

  const onLoad = React.useCallback(
    (map: VtMapInstance) => {
      const bounds = getMapBounds(displayedPins);
      map.fitBounds(bounds);

      setMapInstance(map);
    },
    [displayedPins]
  );

  const onUnmount = React.useCallback(() => {
    setMapInstance(null);
  }, []);

  const onInfoLoad = () => {
    // console.log("InfoBox: ", infoBox);
  };

  const infoBoxOptions = { closeBoxURL: "", enableEventPropagation: true };

  useEffect(() => {
    if (!isLoading && mapInstance) {
      const bounds = getMapBounds(
        displayedPins.length === 0 ? [center] : displayedPins
      );
      mapInstance.fitBounds(bounds, 0);
    }
  }, [isLoading, mapInstance]);

  const onMarkerLoad = () => {
    // console.log("Marker: ", marker);
  };

  const pinsToDisplay = displayedPins.map((pin, index) => ({
    ...pin,
    id: `${index}-${pin.lat}-${pin.lng}`
  }));

  const [activeMarker, setActiveMarker] = useState<VtMapPinCoordinates | null>(
    null
  );

  const icon =
    pinIcon === "default"
      ? {
          path: "M12 29.6663C12 29.6663 24 21.6663 24 12.333C24 9.15041 22.7357 6.09816 20.4853 3.84773C18.2348 1.59729 15.1826 0.333008 12 0.333008C8.8174 0.333008 5.76515 1.59729 3.51472 3.84773C1.26428 6.09816 0 9.15041 0 12.333C0 21.6663 12 29.6663 12 29.6663ZM16 12.333C16 14.5421 14.2091 16.333 12 16.333C9.79086 16.333 8 14.5421 8 12.333C8 10.1239 9.79086 8.33301 12 8.33301C14.2091 8.33301 16 10.1239 16 12.333Z",
          fillColor: "#D52F89",
          fillOpacity: 1,
          scale: 1,
          strokeColor: "#D52F89",
          strokeWeight: 2
        }
      : {
          path: "M12 29.6663C12 29.6663 24 21.6663 24 12.333C24 9.15041 22.7357 6.09816 20.4853 3.84773C18.2348 1.59729 15.1826 0.333008 12 0.333008C8.8174 0.333008 5.76515 1.59729 3.51472 3.84773C1.26428 6.09816 0 9.15041 0 12.333C0 21.6663 12 29.6663 12 29.6663ZM16 12.333C16 14.5421 14.2091 16.333 12 16.333C9.79086 16.333 8 14.5421 8 12.333C8 10.1239 9.79086 8.33301 12 8.33301C14.2091 8.33301 16 10.1239 16 12.333Z",
          fillColor: "#132F55",
          fillOpacity: 1,
          scale: 1,
          strokeColor: "#132F55",
          strokeWeight: 2
        };

  return (
    // @ts-ignore
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: LightTheme,
        panControl: false,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        minZoom: 4,
        maxZoom: pinsToDisplay.length === 0 ? 7 : 16,
        gestureHandling: "greedy"
      }}
      onClick={() => setActiveMarker(null)}
    >
      {pinsToDisplay.length !== 0
        ? pinsToDisplay.map((pin) => (
            // @ts-ignore
            <Marker
              onLoad={onMarkerLoad}
              position={pin}
              icon={icon}
              onClick={() => {
                if (!withoutLocationDescriptors) {
                  setActiveMarker(pin);
                }
              }}
              key={pin.id}
            >
              {activeMarker?.id === pin.id ? (
                // @ts-ignore
                <InfoWindow onLoad={onMarkerLoad} position={pin}>
                  <MapLocationPinDescriptor
                    pin={pin}
                    allLocationsAtom={allLocationsAtom}
                    allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
                    currentlyDisplayedLocationAtom={
                      currentlyDisplayedLocationAtom
                    }
                    currentModalAtom={currentModalAtom}
                    router={router}
                    useVtTranslate={useVtTranslate}
                    customUseAtom={customUseAtom}
                    isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
                  />
                </InfoWindow>
              ) : null}
            </Marker>
          ))
        : defaultPolygon.map((nextCenter) => (
            // @ts-ignore
            <InfoBox
              onLoad={onInfoLoad}
              options={infoBoxOptions}
              position={nextCenter}
              key={Math.random().toString()}
            >
              <React.Fragment>&nbsp;</React.Fragment>
            </InfoBox>
          ))}
    </GoogleMap>
  );
};

interface VtMapProps {
  isLoading?: boolean;
  displayedPins: VtMapPinCoordinates[];
  pinIcon: "default" | "all-locations";
  withoutLocationDescriptors?: boolean;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
}

export default React.memo(VetTrustMap);
