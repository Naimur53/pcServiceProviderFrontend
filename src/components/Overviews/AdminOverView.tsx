import { useGetBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
import { useRouter } from "next/router";
import React from "react";
import Loading from "../Loading/Loading";
import { useGetFeedbacksQuery } from "@/redux/features/feedback/feedbackApi";
import { Booking, IAdminOverViewStatus, IFaq, IFeedback } from "@/types/common";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import BarChart from "../charts/BarChart";
import { useGetPcServiceOverviewQuery } from "@/redux/features/pcService/pcServiceApi";
import PieChart from "../charts/PieChart";
import Donut from "../charts/Donut";

type Props = {};

const AdminOverView = (props: Props) => {
  const { data, isLoading } = useGetPcServiceOverviewQuery("");

  const router = useRouter();
  let content = null;

  if (isLoading) {
    content = <Loading></Loading>;
  } else if (data?.data) {
    const result = data.data as IAdminOverViewStatus;
    const info = [
      {
        title: "pc services",
        to: "/dashboard/allService",
        value: result.totalService,
      },
      {
        title: "Faqs",
        to: "/dashboard/faqs",
        value: result.totalFaq,
      },
      {
        title: "Feedback",
        value: result.totalFeedback,
        to: "/dashboard/allFeedback",
      },
      {
        title: "Blog",
        value: result.totalBlog,
        to: "/dashboard/allBlog",
      },
    ];

    content = (
      <div>
        <h2 className=" font-bold mb-3">Quick Info</h2>
        <div className="grid lg:grid-cols-4 gap-10 pb-10">
          {info.map((single) => (
            <div
              onClick={() => router.push(single.to)}
              key={single.title}
              style={{
                backgroundImage:
                  "url(https://t4.ftcdn.net/jpg/05/61/44/67/360_F_561446751_J2R7WM3dqC3MpFfQXGLb2NRHLDzgh92V.jpg)",
              }}
              className="cursor-pointer overflow-hidden shadow py-5 relative rounded-xl border bg-fixed"
            >
              <div className="relative z-30">
                <p className="uppercase text-xl text-center text-white">
                  {single.title}
                </p>
                <div className="text-center text-4xl font-bold mt-3 text-purple-500">
                  {single.value}
                </div>
              </div>
              <div className="absolute inset-0 backdrop-blur-md"></div>
            </div>
          ))}
        </div>
        <BarChart data={result.categoryStatus}></BarChart>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <PieChart data={result.bookingStatus}></PieChart>
          <Donut data={result}></Donut>
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Enough data not found"></ErrorCompo>;
  }
  return <div>{content}</div>;
};

export default AdminOverView;
