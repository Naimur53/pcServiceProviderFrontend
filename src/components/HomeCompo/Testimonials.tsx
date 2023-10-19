import { useGetFeedbacksQuery } from "@/redux/features/feedback/feedbackApi";
import React, { useState } from "react";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import Loading from "../Loading/Loading";
import SingleTestimonials from "./SingleTestimonials";
import { IFeedback } from "@/types/common";
import { Pagination } from "antd";

type Props = {};

const Testimonials = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const { data, isError, isFetching, isLoading } = useGetFeedbacksQuery(
    `page=${page}&limit=3`
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
        <div className="grid md:grid-cols-3 gap-4">
          {info.map((single) => (
            <SingleTestimonials
              {...single}
              key={single.id}
            ></SingleTestimonials>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Pagination
            pageSize={data.meta.limit}
            total={data.data.length < data.meta.limit ? 1 : data.meta.total}
            current={data.meta.page}
            onChange={(value) => {
              setPage(value);
            }}
          ></Pagination>
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }
  return (
    <div className="mt-20">
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
