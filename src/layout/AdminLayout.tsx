import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import { UserRole } from "@/types/common";
import DashboardLayout from "./DashboardLayout";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  const notAdmin = user?.role !== UserRole.Admin;
  const notSuperAdmin = user?.role !== UserRole.SuperAdmin;
  if (notAdmin && notSuperAdmin) {
    router.push({
      pathname: "/dashboard",
      //   query: { from: router.pathname },
    });
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default AdminLayout;
