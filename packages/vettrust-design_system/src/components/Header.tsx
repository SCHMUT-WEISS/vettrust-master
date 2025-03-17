/* eslint-disable jsx-a11y/anchor-is-valid,react/jsx-curly-newline */
import React from "react";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { useAtom } from "jotai";
import Link from "next/link";
import { Logo } from "../assets/icons";
import Button from "./shared/Button";
import Navigation from "./MainNav";
import VTBreadcrumbs from "./VTBreadcrumb";
import {
  ModalsOptions,
  ModalsState,
  ComponentProps,
  PageList,
  VTAtom,
  PracticeSearchSteps,
  CFCollectionLocation,
  CFPageLocationCommonMetadata,
  NextJsStaticPath,
  BlogArticleFields,
  UseVtTranslateType,
  VTPlatformURLS
} from "../@types";
import { NextRouter } from "../@types/next";

interface HeaderProps {
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentPracticeSearchStepAtom: ReturnType<
    VTAtom<PracticeSearchSteps | null>["vTAtom"]
  >;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  height: string;
  NAV_PAGES_LIST: PageList;
  navigationDisplayAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  LOCATION_NAV_LIST: PageList;
  locationGooglePlacesDataAtom: ReturnType<
    VTAtom<Partial<PlaceData> | null>["vTAtom"]
  >;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<CFCollectionLocation["fields"] | null>["vTAtom"]
  >;
  currentGlobalPracticeSearchFiltersAtom: ReturnType<
    VTAtom<{
      fullTextSearch: string;
      filters: string[];
    }>["vTAtom"]
  >;
  locationPageMetaAtom: ReturnType<
    VTAtom<CFPageLocationCommonMetadata["fields"] | null>["vTAtom"]
  >;
  navigationDynamicSlugListAtom: ReturnType<
    VTAtom<NextJsStaticPath[]>["vTAtom"]
  >;
  router: NextRouter;
  currentBlogArticleAtom: ReturnType<
    VTAtom<BlogArticleFields | null>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  isSearchHidden?: boolean;
  homeIcon?: JSX.Element;
  homeSmallIcon?: JSX.Element;
  platformUrl?: VTPlatformURLS;
  storeUrl: string;
  Link: typeof Link;
}

const Header: React.FC<ComponentProps<HeaderProps>> = (props) => {
  const { t } = props.useVtTranslate("common");
  const [isNavOpen, setNavOpen] = props.customUseAtom(
    props.navigationDisplayAtom
  );
  const [, setCurrentModal] = props.customUseAtom(props.currentModalAtom);
  const [, setCurrentSearchStep] = props.customUseAtom(
    props.currentPracticeSearchStepAtom
  );
  const [isAllLocationsLoading] = props.customUseAtom(
    props.allLocationsLoadingAtom
  );
  const [currentlyDisplayedLocation] = props.customUseAtom(
    props.currentlyDisplayedLocationAtom
  );

  const currentRouteMap = props
    .NAV_PAGES_LIST(t)
    .find(({ pathname }) => pathname === props.router.pathname);

  const [, setIsPracticeSearchModalDisplayed] = props.customUseAtom(
    props.isPracticeSearchModalDisplayedAtom
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-vtBG z-[1000] px-[10px] lg:px-0">
      <div className="content-wrapper">
        <Navigation
          open={isNavOpen}
          onClose={() => setNavOpen(false)}
          platformUrl={props.platformUrl}
          {...props}
        />
        <div
          className="flex flex-row justify-between items-center h-full"
          style={{
            height: props.height
          }}
        >
          <div>
            <Link href="/" passHref>
              <a>{props.homeIcon || <Logo className="cursor-pointer" />}</a>
            </Link>
            <span className="font-semibold text-[12px]">
              {currentRouteMap && currentRouteMap.pathname !== "/" ? (
                <VTBreadcrumbs {...props} />
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="flex flex-row gap-[16px]">
            {/* {props.storeUrl !== undefined && (
              <Button
                type="TERTIARY"
                size="lg"
                disabled={false}
                className="border-0 h-[40px] hidden lg:flex py-0 px-0 text-[14px] "
                iconLeft="Cart"
                url={props.storeUrl}
                target="_blank"
                iconLeftClassName="w-[16px] h-[16px]"
                router={props.router}
              >
                {t("HEADER.STORE")}
              </Button>
            )} */}
            {!props.isSearchHidden && (
              <Button
                type="TERTIARY"
                size="lg"
                disabled={isAllLocationsLoading}
                className="border-0 h-[40px] hidden lg:flex py-0 px-0 text-[14px]"
                iconLeft="Search"
                iconLeftClassName="w-[16px] h-[16px]"
                onClick={() => {
                  setCurrentSearchStep(
                    PracticeSearchSteps.LOCATION_NAME_FILTER
                  );
                  setIsPracticeSearchModalDisplayed(true);
                }}
                isLoading={isAllLocationsLoading}
                router={props.router}
              >
                {t("HEADER.LOCATION_SEARCH")}
              </Button>
            )}
            {/* {props.platformUrl === VTPlatformURLS.VETTRUST && (
              <Button
                type="TERTIARY"
                size="lg"
                className="border-0 text-sm h-10 hidden lg:flex gtm-video-consultation-header"
                iconLeft="VideoCall"
                iconLeftClassName="w-4 h-4"
                router={props.router}
                onClick={() => {
                  setCurrentModal({
                    type: ModalsOptions.CALENDLY_WIDGET,
                    minWidth: "md"
                  });
                }}
              >
                {t("HEADER.VIDEO_CALL")}
              </Button>
            )} */}
            <Button
              type="TERTIARY"
              size="lg"
              disabled={false}
              iconLeft="PhonePlus"
              className="h-[40px] hidden lg:flex text-magenta"
              iconLeftClassName="w-[16px] h-[16px]"
              onClick={() =>
                setCurrentModal({
                  type: ModalsOptions.EMERGENCY,
                  minWidth: "md"
                })
              }
              router={props.router}
            >
              {t("HEADER.EMERGENCY")}
            </Button>
            {props.platformUrl === VTPlatformURLS.VETTRUST &&
              currentlyDisplayedLocation?.offersReferals && (
                <Button
                  type="TERTIARY"
                  size="lg"
                  disabled={false}
                  className="h-[40px] hidden lg:flex"
                  iconLeftClassName="w-[16px] h-[16px]"
                  onClick={() =>
                    setCurrentModal({
                      type: ModalsOptions.REFERRAL_FORM,
                      minWidth: "lg"
                    })
                  }
                  router={props.router}
                >
                  {t("HEADER.REFERRAL")}
                </Button>
              )}
            <Button
              type="TERTIARY"
              size="lg"
              disabled={false}
              iconLeft="Menu"
              className="h-[40px]"
              onClick={() => setNavOpen(true)}
              router={props.router}
            >
              {t("HEADER.MENU")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
