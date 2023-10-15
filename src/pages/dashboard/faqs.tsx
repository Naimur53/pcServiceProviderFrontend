import AddFaq from "@/components/AddFaq/AddFaq";
import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import FaqsTable from "@/components/FaqsTable/FaqsTable";
import FaqsTableSingleRow from "@/components/FaqsTable/FaqsTableSingleRow";
import Loading from "@/components/Loading/Loading";
import AdminLayout from "@/layout/AdminLayout";
import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
import { IFaq } from "@/types/common";
import React, { useState } from "react";

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
      <div>
        <FaqsTable>
          {info.map((single) => (
            <FaqsTableSingleRow
              key={single.id}
              {...single}
            ></FaqsTableSingleRow>
          ))}
        </FaqsTable>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }
  return (
    <AdminLayout>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">FAQs</h1>
        <AddFaq></AddFaq>
        {content}
      </div>
    </AdminLayout>
  );
};

export default Faqs;
