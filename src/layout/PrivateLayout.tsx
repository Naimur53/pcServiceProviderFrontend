import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";

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
      query: { from: router.asPath },
    });
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }
  if (user.isBlocked) {
    return (
      <div className="text-center font-bold text-2xl">
        <h2>You are blocked by Admin</h2>
        <Link href={"/"} className="underline cursor-pointer">
          Back to Home
        </Link>
      </div>
    );
  }
  return <>{children}</>;
};

export default PrivateLayout;
