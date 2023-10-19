import React from "react";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import {
  PcService,
  ServiceAvailability,
  ServiceCategory,
} from "@/types/common";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";

type Props = {
  category: ServiceCategory;
};

const SingleCategoryService = ({ category }: Props) => {
  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetPcServiceQuery(`limit=1&category=${category}`);
  let content = null;

  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    const single = data.data[0] as PcService;
    content = (
      <div>
        <ServiceCard key={single.id} {...single} />
      </div>
    );
  } else {
    content = <Loading></Loading>;
  }
  return <div>{content}</div>;
};

export default SingleCategoryService;
