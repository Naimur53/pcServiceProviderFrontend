import DropdownMessage from "./DropdownMessage";
import DropdownUser from "./DropdownUser";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import "./Header";
import Link from "next/link";
import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky header-wrap top-0 z-30 min-w-[200px] z-999 flex w-full bg-white dark:bg-black   ">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="flex items-center  gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <!-- Hamburger Toggle BTN --> */}

          <Logo></Logo>
        </div>
        <div className="hidden lg:block"></div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
