import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import ServiceDetailsCard from "@/components/ServiceCard/ServiceDetailsCard";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetPcServiceByIdQuery } from "@/redux/features/pcService/pcServiceApi";
import { PcService } from "@/types/common";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function ServiceDetails({}: Props) {
  const {
    query: { serviceId },
  } = useRouter();
  const { data, isLoading, isSuccess, isError, error, isFetching } =
    useGetPcServiceByIdQuery(serviceId);
  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data) {
    const info = data.data as PcService;

    content = <ServiceDetailsCard {...info}></ServiceDetailsCard>;
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }

  return (
    <HomeLayout>
      <PrivateLayout>{content} </PrivateLayout>
    </HomeLayout>
  );
}

export default ServiceDetails;
