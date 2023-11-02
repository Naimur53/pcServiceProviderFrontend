import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";
import React from "react";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { PcService, ServiceAvailability } from "@/types/common";
import ServiceCard from "../ServiceCard/ServiceCard";
import Link from "next/link";

type Props = {};

const HomeService = (props: Props) => {
  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetPcServiceQuery(
      `limit=6&availability=${ServiceAvailability.TWENTY_FOUR_SEVEN}`
    );
  let content = null;

  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    content = (
      <div>
        <div className="grid grid-cols-1   xl:grid-cols-2 2xl:grid-cols-3 gap-10">
          {data.data.map((single: PcService) => (
            <ServiceCard key={single.id} {...single} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container py-20 bg-yellow-300">
      <h2 className="text-center font-bold text-4xl ">Our Services</h2>
      <p className="text-center text-xl">Here is our few services for you!</p>
      <div className="flex justify-center pb-20 ">
        <Link
          className="inline-block px-4 py-1 rounded bg-main-primary text-white mt-3"
          href={"/service/allService"}
        >
          Find All
        </Link>
      </div>
      <div className="md:px-4">{content}</div>
    </div>
  );
};

export default HomeService;
