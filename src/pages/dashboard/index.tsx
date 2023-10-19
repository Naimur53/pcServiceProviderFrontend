import Loading from "@/components/Loading/Loading";
import AdminOverView from "@/components/Overviews/AdminOverView";
import UserOverView from "@/components/Overviews/UserOverView";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Dashboard = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  let content = null;
  if (!user) {
    content = <Loading></Loading>;
  } else if (user.role === UserRole.Customer) {
    content = <UserOverView userId={user.id}></UserOverView>;
  } else {
    content = <AdminOverView></AdminOverView>;
  }
  return <DashboardLayout>{content}</DashboardLayout>;
};

export default Dashboard;
