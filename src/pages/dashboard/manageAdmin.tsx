import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import ManageAllAdminTableSingleRow from "@/components/ManageAllAdminTableSingleRow/ManageAllAdminTableSingleRow";
import ManageAllUserTable from "@/components/ManageAllUserTable/ManageAllUserTable";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser } from "@/types/common";
import { Pagination } from "antd";
import React, { useState } from "react";

type Props = {};

function ManageAdmin({}: Props) {
  const [page, setPage] = useState<number>(1);
  const { data, isError, isFetching, isLoading, isSuccess, isUninitialized } =
    useGetUsersQuery(`role=admin&page=${page}`);
  let content = null;
  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data.data.length) {
    const info = data.data as IUser[];
    content = (
      <div className="mt-10">
        <ManageAllUserTable>
          {info.map((single) => (
            <ManageAllAdminTableSingleRow
              {...single}
              key={single.id}
            ></ManageAllAdminTableSingleRow>
          ))}
        </ManageAllUserTable>
        <div className="flex justify-center mt-4">
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
    <SuperAdminLayout>
      <h2 className="dashboard-title">All Admin</h2>
      {content}
    </SuperAdminLayout>
  );
}

export default ManageAdmin;
