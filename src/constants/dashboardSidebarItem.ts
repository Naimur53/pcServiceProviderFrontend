import {
  faCoffee,
  faBorderAll,
  faTags,
  faBox,
  faFileLines,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const adminItems = [
  {
    name: "Overview",
    to: "",
    matchUrl: "/dashboard",
    icon: faBorderAll,
  },
  {
    name: "All Services",
    to: "/allService",
    matchUrl: "/dashboard/allService",
    icon: faTags,
  },
  {
    name: "Add Service",
    to: "/addService",
    matchUrl: "/dashboard/addService",
    icon: faBox,
  },
  {
    name: "payments",
    to: "/payments",
    matchUrl: "payments",
    icon: faFileLines,
  },
  {
    name: "profile settings",
    to: "/profileSettings",
    matchUrl: "profileSettings",
    icon: faGear,
  },
];

export const dashboardSidebarItem = {
  adminItems,
};
