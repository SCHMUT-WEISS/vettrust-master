/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
import React, { ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { ComponentProps } from "../../@types";
import { CFCollectionLocation } from "../../@types/content/CFClollectionLocation";

const ArrowRightDangerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
      fill="#D52F89"
    />
    <path
      d="M7 12H17M17 12L12 7M17 12L12 17"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AllLocationsResults: React.FC<
  ComponentProps<AllLocationsResultsProps>
> = ({ isLoading, locationsToShow, className, externalLinkIcon, Link }) => {
  return (
    <div className={`rounded-[12px] ${className}`}>
      {isLoading && (
        <div className="h-[100px] w-full grid justify-center items-center">
          <CircularProgress size={20} className="" color="primary" />
        </div>
      )}
      {!isLoading && (
        <React.Fragment>
          <div
            className="text-[16px] font-semibold font-NotoSans"
            itemType="body_2"
          >
            {locationsToShow
              .sort((a, b) =>
                a.fields.name
                  .toLowerCase()
                  .localeCompare(b.fields.name.toLowerCase())
              )
              .map((location) => {
                const locationNameWithoutVettrustWord =
                  location.fields.name.substring(
                    "vettrust".length + 1,
                    location.fields.name.length
                  );
                return (
                  <Link
                    href={
                      location.fields.hasExternalWebsite
                        ? location.fields.externalWebsiteUrl
                        : (`/locations/${location.fields.slug}` as any)
                    }
                    passHref
                  >
                    <a
                      className={`mb-[12px] flex flex-row items-center hover:underline flex-wrap leading-[24px] hover:text-magenta group w-fit ${
                        location.fields.hasExternalWebsite && "cursor-alias"
                      }`}
                      key={location.sys.id}
                      target={
                        location.fields.hasExternalWebsite
                          ? "_blank"
                          : undefined
                      }
                    >
                      {location.fields.prefixVetTrust ? (
                        <React.Fragment>
                          <span className="text-lightBlue-1.5 group-hover:text-magenta mr-[8px]">
                            VetTrust
                          </span>
                          {locationNameWithoutVettrustWord
                            ?.trim()
                            .split(" ")
                            .map((w, i) => (
                              <span
                                className="text-darkBlue leading-[24px] group-hover:text-magenta"
                                key={Math.random()}
                              >
                                {w}
                                {i !==
                                  locationNameWithoutVettrustWord
                                    ?.trim()
                                    .split(" ").length -
                                    1 && (
                                    <React.Fragment>&nbsp;</React.Fragment>
                                )}
                              </span>
                            ))}
                          {!location.fields.hasExternalWebsite && (
                            <span className="ml-[8px] hidden group-hover:inline-block">
                              <ArrowRightDangerIcon />
                            </span>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <span className="text-darkBlue group-hover:text-magenta">
                            {location.fields?.name}
                          </span>
                          {!location.fields.hasExternalWebsite && (
                            <span className="ml-[8px] hidden group-hover:inline-block">
                              <ArrowRightDangerIcon />
                            </span>
                          )}
                        </React.Fragment>
                      )}
                      {location.fields.hasExternalWebsite && (
                        <span className="ml-[8px] text-darkBlue group-hover:text-magenta">
                          {externalLinkIcon}
                        </span>
                      )}
                    </a>
                  </Link>
                );
              })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

interface AllLocationsResultsProps {
  isLoading: boolean;
  locationsToShow: CFCollectionLocation[];
  externalLinkIcon: ReactNode;
  Link: typeof Link;
}

export default AllLocationsResults;
