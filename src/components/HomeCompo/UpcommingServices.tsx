import React from "react";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { PcService, ServiceAvailability } from "@/types/common";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";
import UpcommingServicesBackground from "./UpcommingServicesBackground";

type Props = {
  upComingServices: PcService[];
};

const UpcommingServices = ({ upComingServices }: Props) => {
  return (
    <section className="relative w-full h-full">
      <div className="container pb-40 lg:pt-20 relative z-50">
        <h2 className="text-center font-bold text-4xl">
          Our Upcoming Services
        </h2>
        <p className="text-center mt-2 text-xl  pb-20">
          we are thrilled to announce that we have listed down a few requested
          services that are now under process{" "}
        </p>
        <div>
          <div>
            <div className="grid grid-cols-1   xl:grid-cols-2 2xl:grid-cols-3 gap-5 lg:px-20">
              {upComingServices.map((single: PcService) => (
                <ServiceCard key={single.id} {...single} />
              ))}
            </div>
          </div>{" "}
        </div>
      </div>
      <UpcommingServicesBackground></UpcommingServicesBackground>
    </section>
  );
};

export default UpcommingServices;
