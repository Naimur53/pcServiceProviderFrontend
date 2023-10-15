import {
  faCoffee,
  faBorderAll,
  faTags,
  faBox,
  faFileLines,
  faGear,
  faUsers,
  faPersonCircleQuestion,
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
    name: "Bookings",
    to: "/allBooking",
    matchUrl: "/dashboard/allBooking",
    icon: faFileLines,
  },
  {
    name: "Manage Faqs",
    to: "/faqs",
    matchUrl: "/dashboard/faqs",
    icon: faPersonCircleQuestion,
  },
  {
    name: "Manage Users",
    to: "/manageAllUser",
    matchUrl: "/dashboard/manageAllUser",
    icon: faUsers,
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
