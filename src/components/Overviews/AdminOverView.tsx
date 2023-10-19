import { useGetBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
import { useRouter } from "next/router";
import React from "react";
import Loading from "../Loading/Loading";
import { useGetFeedbacksQuery } from "@/redux/features/feedback/feedbackApi";
import { Booking, IFaq, IFeedback } from "@/types/common";
import ErrorCompo from "../ErrorCompo/ErrorCompo";

type Props = {};

const AdminOverView = (props: Props) => {
  const { data, isLoading } = useGetBookingsQuery("");
  const { data: pcService, isLoading: pcServiceLoading } =
    useGetBookingsQuery("");
  const { data: faqData, isLoading: faqLoading } = useGetFaqsQuery("");

  const { data: feedbackData, isLoading: feedbackLoading } =
    useGetFeedbacksQuery("");

  const router = useRouter();
  let content = null;

  if (isLoading || faqLoading || feedbackLoading || pcServiceLoading) {
    content = <Loading></Loading>;
  } else if (
    data?.data &&
    faqData?.data &&
    feedbackData?.data &&
    pcService?.data
  ) {
    const bookings = data.meta.total as number;
    const faqs = faqData.data.length;
    const feedbacks = feedbackData.meta.total as number;
    const pcServices = pcService.meta.total as number;
    console.log({ bookings, faqs, feedbacks, pcServices });
    const info = [
      {
        title: "Total Booking",
        to: "dashboard/allBooking",
        value: bookings,
      },
      {
        title: "pc services",
        to: "/dashboard/allService",
        value: pcServices,
      },
      {
        title: "Faqs",
        to: "/dashboard/faqs",
        value: faqs,
      },
      {
        title: "Feedback",
        value: feedbacks,
        to: "/dashboard/allFeedback",
      },
    ];

    content = (
      <div className="grid lg:grid-cols-2 gap-5">
        {info.map((single) => (
          <div
            onClick={() => router.push(single.to)}
            key={single.title}
            className="cursor-pointer shadow-lg py-10 border"
          >
            <p className="uppercase text-xl text-center text-gray-500">
              {single.title}
            </p>
            <div className="text-center text-4xl font-bold mt-3">
              {single.value}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = <ErrorCompo error="Enough data not found"></ErrorCompo>;
  }
  return <div>{content}</div>;
};

export default AdminOverView;
