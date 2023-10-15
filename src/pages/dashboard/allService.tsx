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
import React from "react";
import { Button } from "antd";
type Props = {};

function AllService({}: Props) {
  const [deleteService] = useDeletePcServiceMutation();
  const { data, isFetching, isLoading, isError } =
    useGetPcServiceQuery("limit=500");
  let content = null;

  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    content = (
      <div className="grid grid-cols-3 gap-3">
        {data.data.map((single: PcService) => (
          <div key={single.id} className="border rounded ">
            <div className="relative">
              <img className="w-full rounded" src={single.thumbnail} alt="" />
              <div className="absolute right-0 top-0">
                <span className=" capitalize bg-blue-400/70 p-2 rounded ">
                  {single.availability.split("_").join(" ").toLowerCase()}
                </span>
              </div>
            </div>
            <div className="px-2 py-3 ">
              <h2 className="text-2xl font-bold">{single.name}</h2>
              <div className="mt-4">
                <p>{single.description}</p>
              </div>
              <div className="mt-4 text-sm flex gap-2">
                <span className="border inline-blocks p-2 border-blue-400 rounded-xl">
                  {single.category}
                </span>
                <span className="border inline-blocks p-2 border-blue-400 rounded-xl">
                  {single.location}
                </span>
              </div>
              <Link href={`/dashboard/editService/${single.id}`}>
                <Button className="mt-4 px-5">Edit</Button>
              </Link>
              <Button onClick={() => deleteService(single.id)} danger>
                Delete
              </Button>
            </div>
          </div>
        ))}
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
