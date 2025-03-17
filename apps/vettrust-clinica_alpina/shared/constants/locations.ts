export const LOCATION_NAV_LIST = (t: (key: string) => any) => [
  {
    key: "Homepage",
    pathname: "/locations/[location_slug]",
    title: t("NAVIGATION.MENU_LIST.HOME_TITTLE"),
    // description: t("NAVIGATION.MENU_LIST.HOME_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "Services",
    pathname: "/locations/[location_slug]/services",
    title: t("NAVIGATION.MENU_LIST.SERVICES_TITTLE"),
    // description: t("NAVIGATION.MENU_LIST.SERVICES_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "OurTeam",
    pathname: "/locations/[location_slug]/team",
    title: t("NAVIGATION.MENU_LIST.OUR_TEAM_TITTLE"),
    // description: t("NAVIGATION.MENU_LIST.OUR_TEAM_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "OurPartners",
    pathname: "/locations/[location_slug]/partners",
    title: t("NAVIGATION.MENU_LIST.OUR_PARTNERS_TITTLE"),
    // description: t("NAVIGATION.MENU_LIST.OUR_TEAM_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "AppointmentAndContact",
    pathname: "/locations/[location_slug]/contact",
    title: t("NAVIGATION.MENU_LIST.APPOINTMENT_AND_CONTACT_TITTLE"),
    // description: t("NAVIGATION.MENU_LIST.APPOINTMENT_AND_CONTACT_DESCRIPTION"),
    disabled: false,
  },
];
