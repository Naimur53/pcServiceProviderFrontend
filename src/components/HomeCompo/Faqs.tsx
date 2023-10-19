import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
import React from "react";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { IFaq } from "@/types/common";
import AccordionItem from "./AccordionItem";

type Props = {};

const Faqs = (props: Props) => {
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetFaqsQuery("");
  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    console.log(error);
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    const info = data.data as IFaq[];
    content = (
      <div className="max-w-[700px] w-full">
        <div className="grid ">
          {info.map((single) => (
            <AccordionItem key={single.id} {...single}></AccordionItem>
          ))}
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }
  return (
    <div>
      <div className="container mt-20">
        <div className="flex flex-wrap ">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                Any Questions? Look Here
              </h2>
              <p className="text-base text-body-color">
                There are many many type of question we receive here are common
                question we have answer
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">{content}</div>
      </div>
    </div>
  );
};

export default Faqs;
