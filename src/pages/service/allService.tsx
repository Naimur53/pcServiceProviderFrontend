import AllFilterAbleService from "@/components/AllFilterAbleService/AllFilterAbleService";
import HomeLayout from "@/layout/HomeLayout";
import Link from "next/link";
import React from "react";

type Props = {};

const AllService = (props: Props) => {
  return (
    <HomeLayout>
      <div className="min-h-[60vh] bg-black all-service-banner-wrap bg-cover bg-center px-4 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-bold text-white">
          We Provide Best Service for your Pc
        </h2>
        <Link
          href={"#all-service"}
          className=" font-bold rounded bg-main-primary px-4 py-2 mt-5"
        >
          Find Service
        </Link>
      </div>
      <div id="all-service" className="mt-10 ">
        <div className="flex flex-col justify-center items-center ">
          <h4 className="text-3xl font-bold text-center">All service</h4>
          <p>Find your desire service from our best service</p>
        </div>
        <AllFilterAbleService></AllFilterAbleService>
      </div>
    </HomeLayout>
  );
};

export default AllService;
