/* eslint-disable sonarjs/cognitive-complexity */
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
// import Script from "next/script";
import { ToastContainer } from "react-toastify";
import TimeAgo from "javascript-time-ago";
import de from "javascript-time-ago/locale/de";
import en from "javascript-time-ago/locale/en-CA";
import fr from "javascript-time-ago/locale/fr-CA";
import { useJsApiLoader } from "@react-google-maps/api";
import Head from "next/head";
import {
  GTMPageView,
  Header,
  Footer,
  AppLoader,
  ModalsContainer,
  CookiebotMessage,
  DEFAULT_VETTRUST_META_IMAGE,
  AllLocationsPlaceHolder,
  AlarmCircleDanger,
  CheckCircle,
  AlarmCircle,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import Link from "next/link";
import muiTheme from "../shared/utils/mui-theme";
import ErrorBoundary from "../components/shared/ErrorBoundary";
import VTHead from "../components/shared/VTHead";
import { allAtomsAndI18n } from "../shared/utils/designSystem";
import { NAV_PAGES_LIST } from "../shared/constants";
import { LOCATION_NAV_LIST } from "../shared/constants/locations";
import loader from "../assets/json/Loader.json";
import useVtTranslate from "../shared/utils/useVtTranslate";
import HomeIcon from "../assets/icons/logo-big.svg";
import HomeSmallIcon from "../assets/icons/log-nav.svg";
import HomeFooterLogoIcon from "../assets/icons/logo-footer.svg";
import getSeoMetadata from "../shared/utils/seoMetadata";

const googleMapsLibraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const routesWithStickyElements = ["/locations", "/locations/search-results"];

function VetTrust({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [pageTransitionLoading, setPageTransitionLoading] = useState(false);
  const [applicationLoading, setApplicationLoading] = useState(false);

  const { isLoaded: isGmapsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: googleMapsLibraries,
  });

  useEffect(() => {
    const handleStart = () => setPageTransitionLoading(true);
    const handleComplete = () => setPageTransitionLoading(false);
    const handleApplicationLoaded = () => setApplicationLoading(true);

    // Initiate GTM
    const handleGTMRouteChange = (url: string) => GTMPageView(url);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", (url: string) => {
      handleComplete();
      handleGTMRouteChange(url);
    });
    router.events.on("routeChangeError", handleComplete);
    handleApplicationLoaded();

    if ((TimeAgo as any).getDefaultLocale() !== "de") {
      TimeAgo.addDefaultLocale(de);
    }

    TimeAgo.addLocale(en);
    TimeAgo.addLocale(fr);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", (url: string) => {
        handleComplete();
        handleGTMRouteChange(url);
      });
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const HEADER_HEIGHT = "80px";

  const globalParentDivOverflowClass = routesWithStickyElements.includes(
    router.pathname
  )
    ? ""
    : "overflow-hidden";

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VTHead
        title={pageProps?.pageSeoMetadata?.title as string}
        description={pageProps?.pageSeoMetadata?.description as string}
        image={pageProps?.pageSeoMetadata?.image as string}
      />
      <AllLocationsPlaceHolder {...allAtomsAndI18n} />
      {applicationLoading ? (
        <div className={globalParentDivOverflowClass}>
          <ThemeProvider theme={muiTheme}>
            <Header
              NAV_PAGES_LIST={NAV_PAGES_LIST}
              LOCATION_NAV_LIST={LOCATION_NAV_LIST}
              router={router}
              height={HEADER_HEIGHT}
              isSearchHidden
              homeIcon={<HomeIcon />}
              homeSmallIcon={<HomeSmallIcon />}
              platformUrl={VTPlatformURLS.CLINICA_ALPINA}
              Link={Link}
              {...allAtomsAndI18n}
            />
            <main
              style={{
                marginTop: HEADER_HEIGHT,
              }}
            >
              {pageTransitionLoading || !isGmapsLoaded ? (
                <AppLoader className="fixed bg-vtBG" loader={loader} />
              ) : (
                <ErrorBoundary>
                  <Component {...pageProps} />
                  <ModalsContainer
                    muiTheme={muiTheme as any}
                    router={router}
                    platformUrl={VTPlatformURLS.CLINICA_ALPINA}
                    {...(allAtomsAndI18n as any)}
                  />
                </ErrorBoundary>
              )}
            </main>
            {!pageTransitionLoading && isGmapsLoaded && (
              <>
                <Footer
                  useVtTranslate={useVtTranslate}
                  logo={<HomeFooterLogoIcon />}
                  vtPlatformUrl={VTPlatformURLS.CLINICA_ALPINA}
                />
              </>
            )}
            {/* <Script
              id="CookieDeclaration"
              src="https://consent.cookiebot.com/224eaec9-bd9d-4dc2-bdfb-e523bf3d704e/cd.js"
              type="text/javascript"
              async
              strategy="lazyOnload"
            /> */}
          </ThemeProvider>
          <ToastContainer
            hideProgressBar
            closeButton={false}
            position="bottom-left"
            className=""
            autoClose={3000}
            toastClassName="rounded-[12px] border"
            icon={({ type }) => {
              if (type === "success") {
                return (
                  <CheckCircle className="text-vtGreen w-[20px] h-[20px]" />
                );
              }

              if (type === "warning") {
                return (
                  <AlarmCircle className="text-sand-pressed w-[20px] h-[20px]" />
                );
              }

              return <AlarmCircleDanger className="w-[20px] h-[20px]" />;
            }}
          />
          <CookiebotMessage useVtTranslate={useVtTranslate} router={router} />
        </div>
      ) : (
        <AppLoader className="relative z-[10000]" loader={loader} />
      )}
    </>
  );
}

(VetTrust as any).getInitialProps = async ({ ctx }: any) => {
  let pageSeoMetadata = {
    title: "VetTrust",
    description: "Wir sind Ihre Partnerin für Tiergesundheit",
    image: DEFAULT_VETTRUST_META_IMAGE,
  };

  try {
    const res = await getSeoMetadata(ctx.asPath, ctx.locale);

    if (res)
      pageSeoMetadata = res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return { pageProps: { pageSeoMetadata } };
};

export default appWithTranslation(VetTrust);
