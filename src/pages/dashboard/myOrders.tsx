import ErrorCompo from "@/components/ErrorCompo/ErrorCompo";
import Loading from "@/components/Loading/Loading";
import OrdersCard from "@/components/OrdersCard/OrdersCard";
import DashboardLayout from "@/layout/DashboardLayout";
import { useGetSingleUserBookingByUserIdQuery } from "@/redux/features/booking/bookingApi";
import { useAppSelector } from "@/redux/hook";
import { Booking } from "@/types/common";
import React from "react";

type Props = {};

const MyOrders = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetSingleUserBookingByUserIdQuery(user?.id);

  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data.data.length) {
    const info = data.data as Booking[];
    content = (
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-10">
          {info.map((single) => (
            <OrdersCard key={single.id} {...single}></OrdersCard>
          ))}
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">My Bookings</h1>
      {content}
    </DashboardLayout>
  );
};

export default MyOrders;
