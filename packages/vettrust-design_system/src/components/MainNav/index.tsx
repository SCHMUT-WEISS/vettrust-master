/* eslint-disable no-underscore-dangle,indent,sonarjs/no-identical-functions,react-hooks/exhaustive-deps,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/jsx-curly-newline */
import React, { useCallback, useEffect } from "react";
import { AppBar, Drawer, Tooltip } from "@mui/material";
import { FocusRing } from "react-aria";
import { useAtom } from "jotai";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import {
  ComponentProps,
  PageList,
  VTAtom,
  ModalsOptions,
  ModalsState,
  NextJsStaticPath,
  CFPageLocationCommonMetadata,
  PracticeSearchSteps,
  CFCollectionLocation,
  UseVtTranslateType,
  VTPlatformURLS,
  MenuItem
} from "../../@types";
import { Logo3, Times, ArrowRightDanger, Search } from "../../assets/icons";
import Button from "../shared/Button";
import Heading from "../shared/Heading";
import LocationNavigation from "./LocationNavigation";
import Paragraph from "../shared/Paragraph";
import { ALL_CANTONS_WORD } from "../../shared/constants";
import { getEmergencyNumber, getNavigationParams } from "../../shared/utils";
import { NextRouter } from "../../@types/next";

// eslint-disable-next-line no-use-before-define
const Navigation: React.FC<ComponentProps<NavigationProps>> = (props) => {
  const { t, i18n } = props.useVtTranslate("common");
  const [locationPageMeta, setLocationPageMeta] = props.customUseAtom(
    props.locationPageMetaAtom
  );
  const [, setCurrentModal] = props.customUseAtom(props.currentModalAtom);
  const [, setCurrentSearchStep] = props.customUseAtom(
    props.currentPracticeSearchStepAtom
  );
  const [, setNavigationOpen] = props.customUseAtom(
    props.navigationDisplayAtom
  );
  const [, setIsPracticeSearchModalDisplayed] = props.customUseAtom(
    props.isPracticeSearchModalDisplayedAtom
  );
  const [globalFilters, setGlobalFilters] = props.customUseAtom(
    props.currentGlobalPracticeSearchFiltersAtom
  );

  const handleSearchOnLanguageChange = (locale: "de" | "en" | "fr") => {
    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.en &&
      locale === "de"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.de
      });
    }

    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.en &&
      locale === "fr"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.fr
      });
    }

    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.de &&
      locale === "en"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.en
      });
    }

    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.de &&
      locale === "fr"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.fr
      });
    }

    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.fr &&
      locale === "de"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.de
      });
    }

    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.fr &&
      locale === "en"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.en
      });
    }
  };

  const escapeHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    },
    [props.onClose]
  );

  useEffect(
    () => {
      document.addEventListener("keydown", escapeHandler, false);

      if (!locationPageMeta) {
        getEmergencyNumber(props.platformUrl || VTPlatformURLS.VETTRUST).then(
          (response) => {
            setLocationPageMeta(response);
          }
        );
      }

      return () => {
        document.removeEventListener("keydown", escapeHandler, false);
      };
    },
    // ⚠️ CAUTION ⚠️: Never update the dependency array otherwise it will lead to an infinite loop
    [escapeHandler, setLocationPageMeta]
  );

  const pagesNotToDisplayInTheNav = [
    "BecomeAVet",
    "DataProtection",
    "Imprint",
    "BlogArticle",
    "LocationHome",
    "LocationHomeTeamPage",
    "LocationForVetsPage",
    "PracticeSearchResults"
  ];

  const currentPageIndex = props
    .NAV_PAGES_LIST(t)
    .findIndex((page) => page.pathname === props.router.pathname);

  const _getHomePageStyle = (index: number) => {
    const borderTop =
      index === currentPageIndex ? "border-t-0" : "border-t-[1px]";
    return index === 0 ? `${borderTop} border-solid border-t-sand-pressed` : "";
  };

  const _getActivePageStyle = (index: number) =>
    index === currentPageIndex
      ? "bg-magenta/10 border-l-magenta border-l-[3px] rounded-r-[12px] [padding-left:17px_!important] lg:[padding-left:45px_!important]"
      : "";

  const _getDisabledPageStyle = (page: { disabled: boolean }) =>
    page.disabled ? "cursor-not-allowed" : "";

  const _getPreviousPageBorderStyle = (index: number) =>
    index === currentPageIndex - 1
      ? ""
      : "border-b-[1px] border-solid border-b-sand-pressed";

  const _getCurrentPageNavStyle = (
    index: number,
    page: { disabled: boolean }
  ) => `${_getActivePageStyle(index)} ${_getDisabledPageStyle(page)}`;

  const _getBorders = (index: number) =>
    `${_getHomePageStyle(index)} ${_getPreviousPageBorderStyle(index)}`;

  const [navigationSlugList] = props.customUseAtom(
    props.navigationDynamicSlugListAtom
  );

  const buttonElement = (page: MenuItem, index: number) => (
    <Button
      type="NONE"
      size="lg"
      disabled={page.disabled}
      url={page.pathname}
      router={props.router}
      onClick={() => props.onClose()}
      className={`block h-fit w-full hover:text-magenta cursor-pointer outline-none pl-[20px] lg:pl-[48px] text-darkBlue box-border ${_getCurrentPageNavStyle(
        index,
        page
      )} show-children-on-hover ${
        page.key === "GlobalPartners" ? "gtm-partner-link" : ""
      }`}
    >
      <div
        className={`${_getBorders(
          index
        )} pt-[16px] pb-[16px] flex flex-col justify-center gap-[4px]`}
        style={{
          borderBottom: index === currentPageIndex ? "none" : undefined
        }}
      >
        <div
          className={`font-NotoSans h-[24px] flex gap-[8px] text-left items-center font-[600] ${
            index === currentPageIndex ? "text-magenta" : ""
          } `}
        >
          {page.title} <ArrowRightDanger className="invisible" />
        </div>
        <div className="text-lightBlue-1.5 h-fit text-left text-[14px] leading-[20px] pr-[16px]">
          {page.description}
        </div>
      </div>
    </Button>
  );

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box"
        }
      }}
      className="vt-drawer"
    >
      <div className="pb-[33px] w-[100vw] md:w-[55vw] lg:w-[506px]">
        <AppBar
          position="fixed"
          sx={{
            // position: "fixed",
            height: "80px",
            backgroundColor: "transparent",
            width: {
              sm: "100vw",
              md: "55vw",
              lg: "506px"
            }
          }}
          elevation={0}
        >
          <div className="px-[20px] lg:px-[48px] flex flex-row justify-between h-[80px] items-center bg-vtBG w-[100vw] md:w-[55vw] lg:w-[506px]">
            <div className="flex flex-row gap-[16px] items-center text-gray-500">
              {props.homeSmallIcon || <Logo3 className="w-[51px] h-[36px]" />}
              <span className="">
                <FocusRing focusRingClass="ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] rounded-[4px]">
                  <Button
                    type="NONE"
                    size="lg"
                    className={`block ml-1 inline-flex items-center outline-none ${
                      i18n?.language === "de"
                        ? "underline text-darkBlue"
                        : "font-light text-gray-500"
                    }`}
                    router={props.router}
                    onClick={() => {
                      props.onClose();
                      const navigationParams = getNavigationParams(
                        props.router,
                        "de",
                        navigationSlugList
                      );
                      props.router
                        .push(
                          {
                            pathname: props.router.pathname,
                            query: navigationParams
                          },
                          undefined,
                          { locale: "de" }
                        )
                        .then(() => {
                          handleSearchOnLanguageChange("de");
                        });
                    }}
                  >
                    DE
                  </Button>
                </FocusRing>
                &nbsp;
                {" / "}
                <FocusRing focusRingClass="ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] rounded-[4px]">
                  <Button
                    type="NONE"
                    size="lg"
                    className={`block ml-1 inline-flex items-center outline-none ${
                      i18n?.language === "en"
                        ? "underline text-darkBlue"
                        : "font-light text-gray-500"
                    }`}
                    router={props.router}
                    onClick={() => {
                      props.onClose();
                      const navigationParams = getNavigationParams(
                        props.router,
                        "en",
                        navigationSlugList
                      );
                      props.router
                        .push(
                          {
                            pathname: props.router.pathname,
                            query: navigationParams
                          },
                          undefined,
                          { locale: "en" }
                        )
                        .then(() => {
                          handleSearchOnLanguageChange("en");
                        });
                    }}
                  >
                    EN
                  </Button>
                </FocusRing>
                &nbsp;
                {" / "}
                <FocusRing focusRingClass="ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] rounded-[4px]">
                  <Button
                    type="NONE"
                    size="lg"
                    className={`block ml-1 inline-flex items-center outline-none ${
                      i18n?.language === "fr"
                        ? "underline text-darkBlue"
                        : "font-light text-gray-500"
                    }`}
                    router={props.router}
                    onClick={() => {
                      props.onClose();
                      const navigationParams = getNavigationParams(
                        props.router,
                        "en",
                        navigationSlugList
                      );
                      props.router
                        .push(
                          {
                            pathname: props.router.pathname,
                            query: navigationParams
                          },
                          undefined,
                          { locale: "fr" }
                        )
                        .then(() => {
                          handleSearchOnLanguageChange("fr");
                        });
                    }}
                  >
                    FR
                  </Button>
                </FocusRing>
              </span>
            </div>
            <div className="flex flex-row">
              <Button
                type="TERTIARY"
                size="lg"
                iconLeft="PhonePlus"
                className="h-[40px] text-magenta navigation-emergency-button__big"
                onClick={() =>
                  setCurrentModal({
                    type: ModalsOptions.EMERGENCY,
                    minWidth: "md"
                  })
                }
                router={props.router}
              >
                {t("NAVIGATION.EMERGENCY")}
              </Button>
              <span>
                <Button
                  type="TERTIARY"
                  size="lg"
                  iconLeft="PhonePlus"
                  className="h-[40px] w-[40px] rounded-full text-magenta p-0 flex flex-row justify-center items-center navigation-emergency-button__small"
                  onClick={() =>
                    setCurrentModal({
                      type: ModalsOptions.EMERGENCY,
                      minWidth: "md"
                    })
                  }
                  router={props.router}
                />
              </span>
              <Tooltip
                title={t("NAVIGATION.CLOSE_BUTTON")}
                arrow
                placement="bottom-start"
              >
                <span className="ml-[16px]">
                  <Button
                    type="TERTIARY"
                    size="lg"
                    className="h-[40px] w-[40px] rounded-full p-0 flex flex-row justify-center items-center"
                    onClick={() => props.onClose()}
                    router={props.router}
                  >
                    <Times className="h-[16px] w-[16px]" />
                  </Button>
                </span>
              </Tooltip>
            </div>
          </div>
        </AppBar>
        <div className="min-h-[400] overflow-y-scroll mt-[80px]">
          {props.router.pathname.includes("/locations/[location_slug]") ? (
            <LocationNavigation {...props} />
          ) : (
            props.platformUrl !== VTPlatformURLS.CLINICA_ALPINA && (
              <div className="px-[20px] lg:px-[48px] min-h-[64px]">
                <div
                  className="bg-white flex flex-row justify-between h-[64px] items-center default-radius pr-[8px] pl-[24px] cursor-pointer"
                  onClick={() => {
                    setCurrentSearchStep(
                      PracticeSearchSteps.LOCATION_NAME_FILTER
                    );
                    setIsPracticeSearchModalDisplayed(true);
                    setNavigationOpen(false);
                  }}
                >
                  <Paragraph
                    type="body_2"
                    className="font-semibold text-darkBlue text-[16px]"
                  >
                    {t("NAVIGATION.SEARCH")}
                  </Paragraph>
                  <Button
                    type="TERTIARY"
                    size="lg"
                    className="bg-darkBlue text-white h-[40px] w-[40px] rounded-full p-0 flex flex-row justify-center items-center"
                    onClick={() => {
                      setCurrentSearchStep(
                        PracticeSearchSteps.LOCATION_NAME_FILTER
                      );
                      setIsPracticeSearchModalDisplayed(true);
                      setNavigationOpen(false);
                    }}
                    router={props.router}
                  >
                    <Search className="h-[16px] w-[16px]" />
                  </Button>
                </div>
              </div>
            )
          )}
          {/* {props.platformUrl === VTPlatformURLS.VETTRUST && (
            <div className="mt-10 px-5 lg:px-12">
              <Heading text={t("HEADER.VIDEO_CALL")} level="h3" />
              <FocusRing focusRingClass="ring ring-opacity-50 ring-magenta ring-[2px] rounded-r-[2px] navigation-ring-no-border">
              <Button
                type="NONE"
                size="lg"
                className={`block h-fit w-full hover:text-magenta cursor-pointer outline-none text-darkBlue box-border show-children-on-hover text-left`}
                router={props.router}
                onClick={() => {
                  props.onClose();
                  setCurrentModal({
                    type: ModalsOptions.CALENDLY_WIDGET,
                    minWidth: "md"
                  });
                }}
              >
                <Paragraph
                type="body_2"
                className="font-semibold text-base mt-8 leading-6 font-NotoSans"
                >
                  {t("NAVIGATION.VIDEOCALL.TITLE")}
                </Paragraph>
                <p className="text-lightBlue-1.5 font-normal text-sm mt-1">
                  {t("NAVIGATION.VIDEOCALL.DESCRIPTION")}
                </p>
              </Button>
              </FocusRing>
            </div>
          )} */}
          <div
            className={`${
              props.platformUrl === VTPlatformURLS.CLINICA_ALPINA
                ? "mt-[20px]"
                : "mt-[40px]"
            } flex flex-row justify-between items-center h-[32px] px-[20px] lg:px-[48px] `}
          >
            <Heading
              text={t("NAVIGATION.MENU_LIST.TITLE")}
              level="h4"
              className="lg:hidden"
            />
            <Heading
              text={t("NAVIGATION.MENU_LIST.TITLE")}
              level="h3"
              className="hidden lg:block"
            />
            {/* <span className="flex flex-row gap-[8.67px]">
              {props.storeUrl !== undefined && (
                <Button
                  type="TERTIARY"
                  size="lg"
                  disabled={false}
                  className="border-0 px-0"
                  iconLeft="Cart"
                  iconLeftClassName="h-[16px] w-[16px]"
                  url={props.storeUrl}
                  target="_blank"
                  router={props.router}
                >
                  {t("HEADER.STORE")}
                </Button>
              )}
            </span> */}
          </div>
          <div className="pr-[20px] lg:pr-[48px] mt-[16px] pb-[2px]">
            {props
              .NAV_PAGES_LIST(t)
              .filter(
                (navLink) =>
                  !pagesNotToDisplayInTheNav.includes(navLink.key) &&
                  (!navLink?.only || navLink?.only === i18n.language)
              )
              .map((page, index) => (
                <FocusRing
                  focusRingClass="ring ring-opacity-50 ring-magenta ring-[2px] rounded-r-[2px] navigation-ring-no-border"
                  key={page.key}
                >
                  {buttonElement(page, index)}
                </FocusRing>
              ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

interface NavigationProps {
  open: boolean;
  onClose: () => void;
  navigationDisplayAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  navigationDynamicSlugListAtom: ReturnType<
    VTAtom<NextJsStaticPath[]>["vTAtom"]
  >;
  locationPageMetaAtom: ReturnType<
    VTAtom<CFPageLocationCommonMetadata["fields"] | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentGlobalPracticeSearchFiltersAtom: ReturnType<
    VTAtom<{
      fullTextSearch: string;
      filters: string[];
    }>["vTAtom"]
  >;
  currentPracticeSearchStepAtom: ReturnType<
    VTAtom<PracticeSearchSteps | null>["vTAtom"]
  >;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  NAV_PAGES_LIST: PageList;
  locationGooglePlacesDataAtom: ReturnType<
    VTAtom<Partial<PlaceData> | null>["vTAtom"]
  >;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<CFCollectionLocation["fields"] | null>["vTAtom"]
  >;
  LOCATION_NAV_LIST: PageList;
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  homeSmallIcon?: JSX.Element;
  platformUrl?: VTPlatformURLS;
  storeUrl?: string;
}

export default Navigation;
export * from "./LocationNavigation";
export { default as LocationNavigation } from "./LocationNavigation";
