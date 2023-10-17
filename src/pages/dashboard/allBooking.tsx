import AllBookingTable from "@/components/AllBookingTable/AllBookingTable";
import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import AdminLayout from "@/layout/AdminLayout";
import { useGetBookingsQuery } from "@/redux/features/booking/bookingApi";
import { Pagination } from "antd";
import React, { useState } from "react";

type Props = {};

const AllBooking = (props: Props) => {
  return (
    <AdminLayout>
      <AllBookingTable></AllBookingTable>
    </AdminLayout>
  );
};

export default AllBooking;
