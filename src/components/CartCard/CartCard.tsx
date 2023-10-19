import { useDeleteCartMutation } from "@/redux/features/cart/cartApi";
import { Cart } from "@/types/common";
import { Popconfirm } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import BookingModal from "../ServiceCard/BookingModal";
type Props = {} & Cart;

const CartCard = ({ id, userId, pcServiceId, pcService }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCart, { isLoading }] = useDeleteCartMutation();
  const handleDelete = () => {
    deleteCart(id)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.error) {
          toast.error("something went wrong");
        } else {
          toast.success("success");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <div className="shadow rounded-lg">
      {pcService.id ? (
        <div>
          <img src={pcService.thumbnail} className="w-full rounded-lg" alt="" />
          <div className="mt-4 px-3">
            <Link href={`/`}>
              <span className="text-xl hover:underline font-bold">
                {pcService.name}
              </span>
            </Link>
            <div>
              <span>Price:{pcService.price}</span>
              <div className="mt-4 pb-4">
                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-1 rounded  text-white bg-blue-500 mr-2"
                  >
                    Booking
                  </button>
                  <BookingModal
                    {...pcService}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  ></BookingModal>
                  <Popconfirm
                    title="Are you sure to delete user?"
                    onConfirm={handleDelete}
                    placement="leftTop"
                    description="you will lost all review, booking, feedback of this user"
                    okButtonProps={{
                      className: "!border !border-blue-300 text-blue-500",
                    }}
                  >
                    <button
                      disabled={isLoading}
                      className="px-4 py-1 text-white rounded bg-red-500 "
                    >
                      Remove
                    </button>
                  </Popconfirm>
                </div>
                <Link
                  href={`/service/${pcServiceId}`}
                  className="mt-3 px-4 py-1 inline-block bg-slate-500/30 rounded"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartCard;
