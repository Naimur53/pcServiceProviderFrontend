import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";
import React from "react";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { PcService, ServiceAvailability } from "@/types/common";
import ServiceCard from "../ServiceCard/ServiceCard";
import Link from "next/link";
import HomeServiceBackground from "./HomeServiceBackground";

type Props = {
  services: PcService[];
};

const HomeService = ({ services }: Props) => {
  return (
    <div className="relative py-20 bg-yellow-300">
      <div className="container  relative z-30">
        <h2 className="text-center font-bold text-4xl ">
          Our Popular Services
        </h2>
        <p className="text-center text-xl pb-20 mt-4 ">
          Here is our few services that are most loved by our user <br /> Feel
          free to checkout more services
        </p>

        <div className="md:px-20">
          <div>
            <div className="grid grid-cols-1   xl:grid-cols-2 2xl:grid-cols-3 gap-10">
              {services.map((single: PcService) => (
                <ServiceCard key={single.id} {...single} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            className="inline-block px-10 py-2  rounded-3xl border border-yellow-600  font-semibold mt-3"
            href={"/service/allService"}
          >
            Find All Services
          </Link>
        </div>
      </div>
      <HomeServiceBackground></HomeServiceBackground>
    </div>
  );
};

export default HomeService;
