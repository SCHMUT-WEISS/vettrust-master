export const NAV_PAGES_LIST = (t: (key: string) => any) => [
  {
    key: "Homepage",
    pathname: "/",
    title: t("NAVIGATION.MENU_LIST.HOME_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.HOME_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "Locations",
    pathname: "/locations",
    title: t("NAVIGATION.MENU_LIST.LOCATIONS_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.LOCATIONS_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "About",
    pathname: "/about",
    title: t("NAVIGATION.MENU_LIST.ABOUT_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.ABOUT_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "AnimalKnowledge",
    pathname: "/blog",
    title: t("NAVIGATION.MENU_LIST.ANIMAL_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.ANIMAL_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "GlobalPartners",
    pathname: "/global-partners",
    title: t("NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "Imprint",
    pathname: "/imprint",
    title: t("NAVIGATION.MENU_LIST.IMPRINT_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.IMPRINT_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "DataProtection",
    pathname: "/data-protection",
    title: t("NAVIGATION.MENU_LIST.DATA_PROTECTION_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.DATA_PROTECTION_DESCRIPTION"),
    disabled: false,
  },
  {
    key: "BecomeAVet",
    pathname: "/about/become-a-part-of-vettrust",
    title: t("NAVIGATION.MENU_LIST.BECOME_VET_TITTLE"),
    description: t("NAVIGATION.MENU_LIST.BECOME_VET_DESCRIPTION"),
    disabled: false,
  },

  /* Breadcrumbs:
   * ⚠️Always leave title and description falsy for the breadcrumb to display the right path ⚠️
   * */
  {
    key: "BlogArticle",
    pathname: "/blog/[blog_slug]",
    title: "",
    description: "",
    disabled: false,
  },
  {
    key: "LocationHome",
    pathname: "/locations/[location_slug]",
    title: "",
    description: "",
    disabled: false,
  },
  {
    key: "LocationHomeTeamPage",
    pathname: "/locations/[location_slug]/team",
    title: "",
    description: "",
    disabled: false,
  },
  {
    key: "LocationForVetsPage",
    pathname: "/locations/[location_slug]/for-vets",
    title: "",
    description: "",
    disabled: false,
  },
  {
    key: "PracticeSearchResults",
    pathname: "/locations/search-results",
    title: t("NAVIGATION.MENU_LIST.SEARCH_RESULTS_TITTLE"),
    description: t(""),
    disabled: false,
  },
];

export const PATHS_WITH_EXPANDED_DISPLAY = [
  "/about",
  "/career",
  "/",
  "/about/become-a-part-of-vettrust",
  "/locations/[location_slug]",
  "/locations",
];
