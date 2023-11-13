import { useGetFeedbacksQuery } from "@/redux/features/feedback/feedbackApi";
import React, { useState } from "react";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import Loading from "../Loading/Loading";
import SingleTestimonials from "./SingleTestimonials";
import { IFeedback } from "@/types/common";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
type Props = {};

const Testimonials = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const { data, isError, isFetching, isLoading } = useGetFeedbacksQuery(
    `page=${page}&limit=20`
  );

  let content = null;
  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data.data.length) {
    const info = data.data as IFeedback[];
    content = (
      <div className="mt-10">
        {/* <div className="grid md:grid-cols-3 gap-4">
          {info.map((single) => (
            <SingleTestimonials
              {...single}
              key={single.id}
            ></SingleTestimonials>
          ))}
        </div> */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            780: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
            900: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
            200: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
          }}
          // navigation
          navigation={{
            nextEl: ".discover-swiper-button-next",
            prevEl: ".discover-swiper-button-prev",
          }}
        >
          {info.map((single) => (
            <SwiperSlide key={single.id}>
              <SingleTestimonials {...single}></SingleTestimonials>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex mt-4 justify-center gap-2">
          <button className="discover-swiper-button-prev slider-navigation-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <button className=" slider-navigation-btn discover-swiper-button-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }
  return (
    <div className="py-20">
      <div className="container ">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Testimonials</h2>
          <p className="mt-2 ">Watch our client feed back</p>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Testimonials;
