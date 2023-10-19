import { useGetSingleUserBookingByUserIdQuery } from "@/redux/features/booking/bookingApi";
import { useGetSingleUserCartsQuery } from "@/redux/features/cart/cartApi";
import React from "react";
import Loading from "../Loading/Loading";
import { Booking, BookingStatus, Cart } from "@/types/common";
import { useRouter } from "next/router";

type Props = {
  userId: string;
};

const UserOverView = ({ userId }: Props) => {
  const { data, isLoading } = useGetSingleUserBookingByUserIdQuery(userId);
  const { data: cartData, isLoading: cartLoading } =
    useGetSingleUserCartsQuery(userId);
  const router = useRouter();
  let content = null;
  if (isLoading || cartLoading) {
    content = <Loading></Loading>;
  } else if (data?.data && cartData?.data) {
    const bookings = data.data as Booking[];
    const carts = cartData.data as Cart[];
    const info = [
      {
        title: "Pending Booking",
        to: "/dashboard/myOrders",
        value: bookings.filter(
          (single) => single.status === BookingStatus.PENDING
        ).length,
      },
      {
        title: "Accepted Booking",
        to: "/dashboard/myOrders",
        value: bookings.filter(
          (single) => single.status === BookingStatus.ACCEPT
        ).length,
      },
      {
        title: "Completed Booking",
        to: "/dashboard/myOrders",
        value: bookings.filter(
          (single) => single.status === BookingStatus.COMPLETE
        ).length,
      },
      {
        title: "Carts",
        value: carts.length,
        to: "/dashboard/myCarts",
      },
    ];
    content = (
      <div className="grid lg:grid-cols-2 gap-5">
        {info.map((single) => (
          <div
            onClick={() => router.push(single.to)}
            key={single.title}
            className="cursor-pointer shadow-lg py-10 border"
          >
            <p className="uppercase text-xl text-center text-gray-500">
              {single.title}
            </p>
            <div className="text-center text-4xl font-bold mt-3">
              {single.value}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <div>{content}</div>;
};

export default UserOverView;
