import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import FeedbackCard from "@/components/FeedbackCard/FeedbackCard";
import Loading from "@/components/Loading/Loading";
import AdminLayout from "@/layout/AdminLayout";
import { useGetFeedbacksQuery } from "@/redux/features/feedback/feedbackApi";
import { IFeedback } from "@/types/common";
import { Pagination } from "antd";
import React, { useState } from "react";

type Props = {};

const AllFeedback = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const { data, isError, isFetching, isLoading } = useGetFeedbacksQuery(
    `page=${page}`
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
        <div className="grid md:grid-cols-2 gap-4">
          {info.map((single) => (
            <FeedbackCard {...single} key={single.id}></FeedbackCard>
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
    <AdminLayout>
      <h1 className="dashboard-title">All feedback</h1>
      {content}
    </AdminLayout>
  );
};

export default AllFeedback;
