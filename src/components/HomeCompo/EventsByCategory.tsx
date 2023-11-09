import { IAllCategoryOfPcService, ServiceCategory } from "@/types/common";
import React from "react";
import SingleCategoryService from "./SingleCategoryService";
import { useGetAllCategoryOfPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import SingleCategoryCard from "./SingleCategoryCard";
import EventsByCategoryBackground from "./EventsByCategoryBackground";
import { motion } from "framer-motion";
import { smoothShowAnimation } from "@/utils/animation";

type Props = {};

const EventsByCategory = (props: Props) => {
  const { data, error, isError, isLoading, isFetching, isSuccess } =
    useGetAllCategoryOfPcServiceQuery("");
  console.log(data);
  let content = null;

  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data?.length) {
    const all = data.data as IAllCategoryOfPcService[];

    content = (
      <motion.div
        variants={smoothShowAnimation.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        transition={{ type: "just" }}
        className="grid grid-cols-1 xl:grid-cols-3 mt-20 gap-x-5 gap-y-10"
      >
        {all?.map((single) => (
          <SingleCategoryCard
            key={single.category}
            {...single}
          ></SingleCategoryCard>
        ))}
      </motion.div>
    );
  } else {
    content = <Loading></Loading>;
  }
  return (
    <div className="relative">
      <div className="container py-40 relative z-30">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Choose Your Service</h1>
          <p>
            We have more than 10+ service category here are popular categories
          </p>
        </div>
        <>{content}</>
      </div>
      <EventsByCategoryBackground></EventsByCategoryBackground>
    </div>
  );
};

export default EventsByCategory;
