import React, { useState } from "react";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import SingleDashboardBlogCard from "../SingleDashboardBlogCard/SingleDashboardBlogCard";
import { Pagination } from "antd";
import { IBlog } from "@/types/common";
import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";

type Props = {};

const Blog = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, isFetching } = useGetBlogsQuery(
    `limit=3&page=${page}`
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
        <div className="grid gird-cols-1 lg:grid-cols-3 gap-5 mt-10">
          {info.map((single) => (
            <SingleDashboardBlogCard
              key={single.id}
              {...single}
            ></SingleDashboardBlogCard>
          ))}
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }
  return (
    <div id="blogs" className="container py-20 lg:px-40">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Read our Blogs</h2>
        <p>
          We always try to publish at least one blog in a week. It may help you
          to get know more about your pc
        </p>
      </div>
      {content}
    </div>
  );
};

export default Blog;
