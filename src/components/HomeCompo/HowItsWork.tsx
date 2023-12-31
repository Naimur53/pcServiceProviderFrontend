import { useGetBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
import { useGetFeedbacksQuery } from "@/redux/features/feedback/feedbackApi";
import React from "react";
import Loading from "../Loading/Loading";
import { ServiceCategory } from "@/types/common";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";
import HowItsWorkBackground from "./HowItsWorkBackground";

type Props = {};

const HowItsWork = (props: Props) => {
  const { data: pcService, isLoading: pcServiceLoading } =
    useGetPcServiceQuery("");

  let content = null;

  if (pcServiceLoading) {
    content = <Loading></Loading>;
  } else if (pcService?.data) {
    const pcServices = pcService.meta.total as number;
    const info = [
      {
        title: "Total Booking",
        value: "100+",
      },
      {
        title: "pc services",
        value: pcServices,
      },
      {
        title: "Category",
        value: Object.keys(ServiceCategory).length,
      },
      {
        title: "Feedback",
        value: "40+",
      },
    ];

    content = (
      <div className="grid lg:grid-cols-2 gap-5 mt-10 pb-20">
        {info.map((single) => (
          <div
            key={single.title}
            className="cursor-pointer shadow-lg py-10 rounded-2xl  bg-black/[0.41] backdrop-blur-lg"
          >
            <p className="uppercase text-2xl text-center text-white font-bold">
              {single.title}
            </p>
            <div className="text-center text-4xl font-bold mt-3 text-yellow-300">
              {single.value}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = <ErrorCompo error="Enough data not found"></ErrorCompo>;
  }
  return (
    <div className="relative">
      <div className="min-h-[60vh] how-it-work-wrap pt-10 pb-20 flex justify-center items-center ">
        <div className="container relative z-30">
          <div className="flex justify-center relative z-10">
            <div className=" text-center text-white pt-20">
              <h2 className="lg:text-4xl text-xl font-semibold">
                We have most interesting client and Services over this year
              </h2>
              <p className="mt-2 font-semibold">
                Watch out our most total work
              </p>
              <div>{content}</div>
            </div>
          </div>
        </div>
      </div>
      <HowItsWorkBackground></HowItsWorkBackground>
    </div>
  );
};

export default HowItsWork;
