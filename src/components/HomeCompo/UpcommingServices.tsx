import React from "react";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { PcService, ServiceAvailability } from "@/types/common";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";

type Props = {};

const UpcommingServices = (props: Props) => {
  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetPcServiceQuery(
      `limit=3&availability=${ServiceAvailability.UNAVAILABLE}`
    );
  let content = null;

  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    content = (
      <div>
        <div className="grid grid-cols-1   xl:grid-cols-2 2xl:grid-cols-3 gap-3">
          {data.data.map((single: PcService) => (
            <ServiceCard key={single.id} {...single} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-40">
      <h2 className="text-center font-bold text-4xl">Our Upcoming Services</h2>
      <p className="text-center mt-2 text-xl">
        we are thrilled to announce that we have listed down a few requested
        services that are now under process{" "}
      </p>
      <div className="flex justify-center pb-20"></div>
      <div>{content}</div>
    </div>
  );
};

export default UpcommingServices;
