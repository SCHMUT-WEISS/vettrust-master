/* eslint-disable no-use-before-define */
import React from "react";
import Section from "../shared/Section";
import { ComponentProps } from "../../@types";
import UserCard from "./UserCard";
import { CfCollectionEmployee } from "../../@types/content/CFCollectionEmployee";
import ManagementCarousel from "./ManagementTeamCarousel";

const UserCardsGrid: React.FC<ComponentProps<UserCardGridProps>> = ({
  title,
  className,
  employees = [],
  deviceType
}) => (
  <React.Fragment>
    <div className="container-wrapper">
      <Section
        title={{
          text: title,
          level: "h2",
          className: ""
        }}
        backgroundColor=""
        className={className}
        dividerClassName="mb-[24px] mt-[16px]"
        dividerSmallClassName="mb-[24px] mt-[16px]"
        childrenContainerClassname="pt-[16px]"
      >
        <div className="grid-cols-3 gap-[32px] justify-center hidden lg:grid">
          {employees.map((employee) => (
            <UserCard
              key={employee.sys.id}
              className="mt-[32px] lg:mt-0"
              employee={employee}
            />
          ))}
        </div>
      </Section>
    </div>
    <ManagementCarousel
      employees={employees}
      deviceType={deviceType}
      className="site-wrapper lg:hidden"
    />
  </React.Fragment>
);

interface UserCardGridProps {
  className?: string;
  title: string;
  employees: CfCollectionEmployee[];
  deviceType: string;
}

export default UserCardsGrid;
