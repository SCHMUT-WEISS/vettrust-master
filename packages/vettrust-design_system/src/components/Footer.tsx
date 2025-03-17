/* eslint-disable react/require-default-props */
import React from "react";
import { Logo2, Facebook, Instagram, Youtube } from "../assets/icons";
import { UseVtTranslateType, VTPlatformURLS } from "../@types";

const Footer: React.FC<{
  useVtTranslate: UseVtTranslateType;
  logo?: JSX.Element;
  vtPlatformUrl?: VTPlatformURLS;
}> = ({ useVtTranslate, logo, vtPlatformUrl }) => {
  const { t, i18n } = useVtTranslate("common");

  const getHref = (url: string) => {
    return `/${i18n.language}${url}`;
  };

  return (
    <React.Fragment>
      <footer className="bg-darkBlue py-10 border-t border-t-darkBlue z-[12] mt-10">
        <div className="container-wrapper ">
          <div className="lg:flex flex-row justify-between text-[16px] leading-[24px] text-white ">
            <div className="flex flex-row justify-center pt-[36px] lg:pt-[86px]">
              {logo || <Logo2 className="" />}
            </div>
            <ul className="pt-[36px] lg:pt-[86px] leading-[35px]">
              <li className="text-[18px] leading-[28px]">
                {t("FOOTER.PET_OWNERS.TITLE")}
              </li>
              <li className="mt-[28px] opacity-70  hover:text-magenta">
                <a href={getHref("/locations")}>
                  {t("FOOTER.PET_OWNERS.LOCATIONS")}
                </a>
              </li>
              <li className="opacity-70 hover:text-magenta">
                <a href={getHref("/about")}>
                  {t("FOOTER.PET_OWNERS.ABOUT_US")}
                </a>
              </li>
              <li className="opacity-70 hover:text-magenta">
                <a href={getHref("/blog")}>{t("FOOTER.PET_OWNERS.BLOG")}</a>
              </li>
              {/* {vtPlatformUrl === VTPlatformURLS.VETTRUST && (
                <li className="opacity-70 hover:text-magenta">
                  <a href={getHref("/news")}>{t("FOOTER.PET_OWNERS.NEWS")}</a>
                </li>
              )} */}
            </ul>
            <ul className="pt-[36px] lg:pt-[86px] leading-[35px]">
              <li className="text-[18px] leading-[28px]">
                {t("FOOTER.VETERINARIANS.TITLE")}
              </li>
              {vtPlatformUrl === VTPlatformURLS.VETTRUST && (
                <li className="mt-[28px] opacity-70 hover:text-magenta">
                  <a href={getHref("/career")}>
                    {t("FOOTER.VETERINARIANS.CAREER")}
                  </a>
                </li>
              )}
              {vtPlatformUrl === VTPlatformURLS.CLINICA_ALPINA && (
                <li className="mt-[28px] opacity-70 hover:text-magenta">
                  <a href={`tel:${t("FOOTER.VETTRUST.TELEPHONE_NUMBER")}`}>
                    Scuol: {t("FOOTER.VETTRUST.TELEPHONE_NUMBER")}
                  </a>
                </li>
              )}
              {vtPlatformUrl === VTPlatformURLS.CLINICA_ALPINA && (
                <li className="opacity-70 hover:text-magenta">
                  <a href={`tel:${t("FOOTER.VETTRUST.TELEPHONE_NUMBER_2")}`}>
                    Celerina: {t("FOOTER.VETTRUST.TELEPHONE_NUMBER_2")}
                  </a>
                </li>
              )}
              {vtPlatformUrl === VTPlatformURLS.VETTRUST && (
                <li className="opacity-70 hover:text-magenta">
                  <a href={getHref("/about/become-a-part-of-vettrust")}>
                    {t("FOOTER.VETERINARIANS.VETTRUST_PARTNER")}
                  </a>
                </li>
              )}
            </ul>
            <ul className="pt-[36px] lg:pt-[86px] leading-[35px]">
              <li className="text-[18px] leading-[28px] mb-[28px] ">
                {t("FOOTER.VETTRUST.TITLE")}
              </li>
              {vtPlatformUrl === VTPlatformURLS.VETTRUST && (
                <li className="opacity-70">
                  {t("FOOTER.VETTRUST.ADMINISTRATION_MANAGEMENT")}
                </li>
              )}
              <li className="opacity-70">
                {t("FOOTER.VETTRUST.CITY")}
              </li>
              <li className="opacity-70">{t("FOOTER.VETTRUST.ADDRESS")}</li>
              <li className="opacity-70">{t("FOOTER.VETTRUST.COUNTRY")}</li>

              {vtPlatformUrl === VTPlatformURLS.CLINICA_ALPINA && (
                <li className="opacity-70 pb-[40px] lg:pb-0">
                  {t("FOOTER.VETTRUST.EMAIL_LABEL")}&nbsp;
                  <a href={`mailto:${t("FOOTER.VETTRUST.EMAIL")}`}>
                    {t("FOOTER.VETTRUST.EMAIL")}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </footer>
      <div className="bg-white ">
        <div className="container-wrapper h-[160px] lg:h-[56px] flex flex-row lg:flex-col justify-center text-light">
          <div className="flex flex-col lg:flex-row justify-between pb-[32px] pt-[26px] lg:pb-[unset] lg:pt-[unset]">
            <div className="flex gap-[21.26px] ml-[36px] lg:ml-0">
              <a
                href={t("FOOTER.VETTRUST.FACEBOOK") as unknown as string}
                target="_blank"
                rel="noreferrer"
              >
                <Facebook />
              </a>
              {vtPlatformUrl !== VTPlatformURLS.CLINICA_ALPINA && (
                <React.Fragment>
                  <a
                    href={t("FOOTER.VETTRUST.INSTAGRAM") as unknown as string}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Instagram />
                  </a>
                  <a
                    href={t("FOOTER.VETTRUST.YOUTUBE") as unknown as string}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Youtube className="mt-[1px]" />
                  </a>
                </React.Fragment>
              )}
            </div>
            <div className="text-[12px]">
              © Copyright {new Date().getFullYear()} VetTrust AG
            </div>
            <div className="flex flex-row gap-[16px] text-[12px]">
              <span className="hover:text-magenta">
                <a href={getHref("/imprint")}>{t("FOOTER.IMPRINT")}</a>
              </span>
              <span className="hover:text-magenta">
                <a href={getHref("/data-protection")}>{t("FOOTER.PRIVACY")}</a>
              </span>
              <span className="hover:text-magenta">
                {vtPlatformUrl === VTPlatformURLS.CLINICA_ALPINA && (
                  <a href={`mailto:${t("FOOTER.VETTRUST.EMAIL")}`}>{t("FOOTER.EMAIL")}</a>
                )}
                {vtPlatformUrl === VTPlatformURLS.VETTRUST && (
                  <a href={getHref("/kontakt")}>{t("FOOTER.CONTACT")}</a>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
