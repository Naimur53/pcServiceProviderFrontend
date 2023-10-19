import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import AdminLayout from "@/layout/AdminLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import {
  useDeletePcServiceMutation,
  useGetPcServiceQuery,
} from "@/redux/features/pcService/pcServiceApi";
import { PcService, ServiceAvailability } from "@/types/common";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Pagination, Popconfirm } from "antd";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
type Props = {};

function AllService({}: Props) {
  const [page, setPage] = useState<number>(1);
  const [deleteService] = useDeletePcServiceMutation();
  const { data, isFetching, isLoading, isError } = useGetPcServiceQuery(
    `page=${page}`
  );
  let content = null;

  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    content = (
      <div>
        <div className="grid grid-cols-1   xl:grid-cols-2 2xl:grid-cols-3 gap-3">
          {data.data.map((single: PcService) => (
            <div key={single.id} className="border rounded ">
              <ServiceCard {...single}></ServiceCard>
              <div className="px-2 py-3 ">
                <Link
                  className="mr-3"
                  href={`/dashboard/editService/${single.id}`}
                >
                  <Button className="mt-4 px-5">Edit</Button>
                </Link>
                <Popconfirm
                  title="Are your Sure to delete this faq?"
                  placement="leftTop"
                  onConfirm={() => deleteService(single.id)}
                  okButtonProps={{
                    className: "!border !border-blue-300 text-blue-500",
                  }}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </div>
            </div>
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
  }
  return (
    <>
      <AdminLayout>
        <div>{content}</div>
      </AdminLayout>
    </>
  );
}

export default AllService;
