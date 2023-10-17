import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import SingleDashboardBlogCard from "@/components/SingleDashboardBlogCard/SingleDashboardBlogCard";
import AdminLayout from "@/layout/AdminLayout";
import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";
import { IBlog } from "@/types/common";
import { Pagination } from "antd";
import React, { useState } from "react";

type Props = {};

function AllBlog({}: Props) {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, isFetching } = useGetBlogsQuery(
    `page=${page}`
  );
  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data.data.length) {
    const info = data.data as IBlog[];
    content = (
      <div>
        <div className="grid grid-cols-3 gap-4 mt-10">
          {info.map((single) => (
            <SingleDashboardBlogCard
              key={single.id}
              {...single}
            ></SingleDashboardBlogCard>
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
      <h2 className="dashboard-title">All Blog</h2>
      {content}
    </AdminLayout>
  );
}

export default AllBlog;
