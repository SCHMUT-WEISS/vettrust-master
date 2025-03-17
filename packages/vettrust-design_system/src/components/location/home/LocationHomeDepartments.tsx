/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useMemo } from "react";
import {
  ComponentProps,
  CFCollectionLocation,
  CFCollectionDepartment,
  UseVtTranslateType
} from "../../../@types";
import LocationDepartmentCard from "../departments/LocationDepartmentCard";
import LocationDepartmentsCarousel from "../departments/LocationDepartmentsCarousel";

const LocationHomeDepartments: React.FC<
  ComponentProps<LocationHomeDepartmentsProps>
> = ({ location, className, router, useVtTranslate }) => {
  const departmentsNodes = useMemo(
    () =>
      location.fields.departments?.map((item) => (
        <LocationDepartmentCard
          department={item}
          locationSlug={location.fields.slug}
          key={Math.random().toString()}
          router={router}
          useVtTranslate={useVtTranslate}
          locationType={location?.fields?.type?.fields?.searchKey}
        />
      )),
    [location.fields.departments, location.fields.slug]
  );
  return (
    <React.Fragment>
      <div
        className={`container-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px] lg:gap-[32px] hidden md:grid ${className}`}
      >
        {departmentsNodes}
      </div>
      <LocationDepartmentsCarousel
        departments={location.fields.departments as CFCollectionDepartment[]}
        locationSlug={location.fields.slug}
        className={`md:hidden ${className}`}
        dotsClassName="md:hidden"
        router={router}
        useVtTranslate={useVtTranslate}
      />
    </React.Fragment>
  );
};

interface LocationHomeDepartmentsProps {
  location: CFCollectionLocation;
  useVtTranslate: UseVtTranslateType;
  router: any;
}

export default LocationHomeDepartments;
