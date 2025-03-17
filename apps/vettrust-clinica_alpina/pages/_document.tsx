/* eslint-disable react/no-danger,@next/next/no-script-in-document,@next/next/no-title-in-document-head,@next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";

class VetTrustDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="224eaec9-bd9d-4dc2-bdfb-e523bf3d704e"
            // data-blockingmode="auto"
            type="text/javascript"
          />
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.GTM_ID}');
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default VetTrustDocument;
