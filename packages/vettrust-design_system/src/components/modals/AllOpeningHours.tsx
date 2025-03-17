/* eslint-disable camelcase,react/jsx-indent */
import React from "react";
import { useAtom } from "jotai";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import Section from "../shared/Section";

const AllOpeningHours: React.FC<ComponentProps<AllOpeningHoursProps>> = ({
  locationGooglePlacesDataAtom,
  useVtTranslate,
  customUseAtom,
}) => {
  const { t, i18n } = useVtTranslate("location");
  const [googlePlacesData] = customUseAtom(locationGooglePlacesDataAtom);
  const andWord = i18n.language === "en" ? "and" : "und";

  return (
    <Section
      title={{
        text: t("ALL_OPENING_HOURS_MODAL.TITLE"),
        level: "h3"
      }}
      className="bgw-white default-radius p-[20px] lg:p-[40px] min-w-[calc(100vw-40px)] sm:min-w-[calc(100vw-160px)] md:min-w-[unset]"
    >
      {googlePlacesData?.opening_hours?.weekday_text.map((day, index) => {
        const [dayName, ...hours] = day.split(":");
        const hoursString = hours.join(":").replace(",", ` ${andWord} `);

        return (
          <div key={Math.random().toString()}>
            <div className="flex flex-row flex-wrap justify-between md:gap-[132px] font-NotoSans">
              <div className="w-[100px] font-semibold">{dayName}</div>
              <div className="[font-weight:400] w-[283px] text-right opening-hours-description">
                {hoursString}
              </div>
            </div>
            {index !==
              (googlePlacesData?.opening_hours?.weekday_text as any).length -
                1 && (
              <hr className="my-[12px] bg-sand-pressed border-sand-pressed " />
            )}
          </div>
        );
      })}
    </Section>
  );
};

interface AllOpeningHoursProps {
  locationGooglePlacesDataAtom: ReturnType<
    VTAtom<Partial<PlaceData> | null>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default AllOpeningHours;
