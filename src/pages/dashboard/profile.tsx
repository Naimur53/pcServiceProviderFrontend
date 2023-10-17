import Loading from "@/components/Loading/Loading";
import AdminLayout from "@/layout/AdminLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAppSelector } from "@/redux/hook";
import { Avatar } from "antd";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  const userInfo = useAppSelector((state) => state.user);
  if (!userInfo.user) {
    return (
      <DashboardLayout>
        <Loading></Loading>
      </DashboardLayout>
    );
  }
  const { address, contactNo, email, id, name, profileImg, role, isBlocked } =
    userInfo.user;
  return (
    <DashboardLayout>
      <h1 className="dashboard-title">Profile</h1>
      <div className="flex flex-col items-center mt-10 justify-center text-center">
        <div className="relative">
          <Avatar
            className="w-[120px] h-[120px] "
            src={profileImg}
            alt={name}
          />
          <span className="px-3 absolute translate-x-full bg-blue-500 text-white rounded-lg text-sm  py-1 capitalize  right-[10px] bottom-0">
            {role}
          </span>
        </div>
        <div>
          <div className=" ">
            <h2 className="font-bold text-3xl mt-5">{name}</h2>
          </div>
          <h3 className="font-bold text-lg text-center mt-2">{email}</h3>
        </div>
        <div className="w- mt-4">
          <div>
            <h4 className="text-lg font-bold">Address</h4>
            <p>{address}</p>
          </div>
          <div className="mt-5">
            <h4 className="text-lg font-bold">Contact No</h4>
            <p>{contactNo}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
