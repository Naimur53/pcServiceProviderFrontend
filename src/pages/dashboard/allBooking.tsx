import AllBookingTable from "@/components/AllBookingTable/AllBookingTable";
import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import AdminLayout from "@/layout/AdminLayout";
import { useGetBookingsQuery } from "@/redux/features/booking/bookingApi";
import React from "react";

type Props = {};

const AllBooking = (props: Props) => {
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetBookingsQuery("");
  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    content = (
      <div>
        <AllBookingTable></AllBookingTable>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }
  return (
    <AdminLayout>
      <div>{content}</div>
    </AdminLayout>
  );
};

export default AllBooking;
