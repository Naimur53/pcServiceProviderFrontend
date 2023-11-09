import { useState } from "react";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { Avatar } from "antd";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header className="fixed w-full top-0 z-[500]">
      <div className="px-4 py-2 text-whdite flex  justify-between text-black bg-white/50 backdrop-blur-xl">
        <Logo></Logo>
        <div
          className={
            toggleMenu
              ? "md:flex  md:pt-0 pt-10 w-full md:w-auto"
              : "hidden md:flex"
          }
          id="menu"
        >
          <ul>
            <li className="md:inline-block cursor-pointer hover:opacity-[.8] border-b md:border-none py-2 px-3">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="dropdown md:inline-block cursor-pointer hover:opacity-[.8] border-b md:border-none py-2 px-3 relative">
              <Link href={"/service/allService"}>Services</Link>
            </li>
            <li className="md:inline-block cursor-pointer hover:opacity-[.8] border-b md:border-none py-2 px-3">
              <Link href={"/#blogs"}>Blogs</Link>
            </li>

            {user?.id ? (
              <>
                <li className="md:inline-block cursor-pointer hover:opacity-[.8] border-b md:border-none py-2 px-3">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>

                <li className="md:inline-block cursor-pointer hover:opacity-[.8] border-b md:border-none py-2 px-3">
                  <Link href={"/dashboard/profile"}>
                    <Avatar src={user.profileImg}></Avatar>
                    <span className="font-bold inline-block ml-2">
                      {user.name}
                    </span>
                  </Link>
                </li>
                <li className="md:inline-block cursor-pointer hover:opacity-[.8] border-b md:border-none py-2 px-3">
                  <button onClick={() => dispatch(userLoggedOut())}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="md:inline-block cursor-pointer hover:opacity-[.8] border-b md:border-none py-2 px-3">
                <Link href={"/signIn"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="cursor-pointer md:hidden">
          <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
          <label
            className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
            htmlFor="menu-btn"
          >
            <span
              onClick={handleToggle}
              className="navicon bg-white-darkest flex items-center relative"
            ></span>
          </label>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
