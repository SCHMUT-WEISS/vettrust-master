import { useAtom } from "jotai";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CFCollectionLocation,
  LocationsPlacedData,
  UseVtTranslateType,
  VTAtom
} from "../../@types";

const useAllLocations = ({
  allLocationsAtom,
  allLocationsGPlacesDataAtom,
  allLocationsLoadingAtom,
  useVtTranslate,
  customUseAtom
}: UseAllLocationsProps) => {
  const { i18n } = useVtTranslate();
  const [allLocations, setAllLocations] = customUseAtom(allLocationsAtom);
  const [, setAllLocationsLoading] = customUseAtom(allLocationsLoadingAtom);
  const [, setGooglePlacesData] = customUseAtom(allLocationsGPlacesDataAtom);

  useEffect(
    () => {
      const getAllLocations = async (): Promise<CFCollectionLocation[]> => {
        try {
          const res = await axios.get(
            `/api/locations?&locale=${i18n?.language}`
          );

          return res.data.data;
        } catch (e) {
          return [];
        }
      };

      if (allLocations.length === 0) {
        setAllLocationsLoading(true);
        getAllLocations().then((data) => {
          setAllLocations(data);
          setAllLocationsLoading(false);
          // axios
          //   .post<{ data: LocationsPlacedData[] }>("/api/locations/places", {
          //     locations: data.map((location) => ({
          //       id: location.sys.id,
          //       googlePlaceId: location.fields.googlePlaceId
          //     })),
          //     locale: i18n?.language,
          //     cache: false,
          //   })
          //   .then((res) => {
          //     setGooglePlacesData(res.data.data);
          //   })
          //   .catch(() => {
          //     toast.error("Something went wrong while loading opening hours");
          //   });
        });
      } else {
        setAllLocationsLoading(true);
        getAllLocations().then((data) => {
          const tempLoc = data[0];
          const tempLocRelative = allLocations.find(
            (loc) => loc.sys.id === tempLoc.sys.id
          );
          if (
            !tempLocRelative ||
            tempLocRelative.sys.locale !== tempLoc.sys.locale
          ) {
            setAllLocations(data);
          }
          setAllLocationsLoading(false);
        });
      }
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  return allLocations;
};

interface UseAllLocationsProps {
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default useAllLocations;
