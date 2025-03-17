/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * This is needed because Moving from page to page does not fire the GA tag!
 * This will be used with a custom event on Google Tag Manager
 * */

interface PageEventProps {
  event: string;
  page: string;
}

export const GTMPageView = (url: string) => {
  const pageEvent: PageEventProps = {
    event: "pageNavigation",
    page: url
  };

  if (window && (window as any).dataLayer) {
    (window as any).dataLayer.push(pageEvent);
  }

  return pageEvent;
};
