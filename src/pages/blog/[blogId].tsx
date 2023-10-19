import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import HomeLayout from "@/layout/HomeLayout";
import { useGetBlogByIdQuery } from "@/redux/features/blog/blogApi";
import { IBlog } from "@/types/common";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const BlogDetails = (props: Props) => {
  const {
    query: { blogId },
  } = useRouter();
  const { data, isLoading, isSuccess, isError, error, isFetching } =
    useGetBlogByIdQuery(blogId);
  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data) {
    const info = data.data as IBlog;
    console.log(info.content);
    content = (
      <div className="">
        <div className="relative flex justify-center items-center  h-[60vh] overflow-hidden">
          <img
            className=" w-full h-full md:h-fit"
            src={info.thumbnails}
            alt="header"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black/40">
            <h1 className="mt-2 text-white text-center text-2xl md:text-4xl font-bold mb-3 px-1">
              {info.title}
            </h1>
          </div>
        </div>
        <div className="mt-10 container">
          <h2 className="text-center font-bold text-4xl">Description</h2>
          <p className="mt-10 whitespace-pre-line">{info.content}</p>
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }

  return <HomeLayout>{content}</HomeLayout>;
};

export default BlogDetails;
