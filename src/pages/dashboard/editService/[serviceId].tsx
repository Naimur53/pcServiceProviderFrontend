import EditSingleServiceForm from "@/components/EditSingleServiceForm/EditSingleServiceForm";
import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import AdminLayout from "@/layout/AdminLayout";
import { useGetPcServiceByIdQuery } from "@/redux/features/pcService/pcServiceApi";
import { PcService } from "@/types/common";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const EditSingleService = (props: Props) => {
  const {
    query: { serviceId },
  } = useRouter();
  const { data, isLoading, isError } = useGetPcServiceByIdQuery(serviceId);
  let content = null;
  console.log(data);
  if (isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data.data) {
    const info = data.data as Omit<PcService, "Cart" | "reviews" | "bookings">;
    content = (
      <div>
        <h2 className="text-center text-xl font-bold">Edit Service</h2>
        <EditSingleServiceForm {...info}></EditSingleServiceForm>
      </div>
    );
  } else {
    content = (
      <div>
        <ErrorCompo error="Data not found"></ErrorCompo>
      </div>
    );
  }
  return <AdminLayout>{content}</AdminLayout>;
};

export default EditSingleService;
