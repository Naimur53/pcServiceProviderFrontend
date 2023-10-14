import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  if (!user?.email) {
    router.push({
      pathname: "/signIn",
      query: { from: router.pathname },
    });
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateLayout;
