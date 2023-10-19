import { useAddCartMutation } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hook";
import { PcService, ServiceAvailability } from "@/types/common";
import { Rate } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceReviewCard from "./ServiceReviewCard";
import BookingModal from "./BookingModal";

type Props = {} & PcService;

const ServiceDetailsCard = ({
  availability,
  category,
  createdAt,
  description,
  id,
  location,
  name,
  price,
  thumbnail,
  updatedAt,
  Cart,
  bookings,
  reviews,
}: Props) => {
  const user = useAppSelector((state) => state.user);
  const [addToCart, { isLoading, isSuccess, isError }] = useAddCartMutation();
  let rating = 0;
  const [open, setOpen] = useState(false);
  if (reviews?.length) {
    const sum = reviews.reduce((pre, current) => {
      return current.rating + pre;
    }, 0);
    rating = sum / reviews.length;
  }

  const handleAddToCart = () => {
    if (!user.user) {
      toast.error("please login first to add to cart");
      return;
    }
    addToCart({ pcServiceId: id })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success("Product added to the cart");
        } else {
          toast.error(res?.data?.message || "something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message || "Failed to add to cart");
      });
  };
  return (
    <div className=" ">
      <div className=" rounded-lg  first-letter">
        <div className="relative flex justify-center items-center  h-[60vh] overflow-hidden">
          <img className=" w-full h-full md:h-fit" src={thumbnail} alt="" />
          <div className="absolute inset-0 flex justify-center items-center bg-black/40">
            <h1 className="mt-2 text-white text-center text-2xl md:text-4xl font-bold mb-3 px-1">
              {name}
            </h1>
          </div>
        </div>
        <div className=" container ">
          <div className="grid grid-cols-1 lg:grid-cols-3 ">
            <div className="col-span-2 order-2 md:order-1">
              <div className="mt-5">
                <h4 className="text-3xl font-bold">Description</h4>
                <p className="mt-4">{description}</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold mt-10 mb-0">
                  Reviews {reviews?.length || ""}
                </h4>
                {reviews?.length ? (
                  <div>
                    {reviews.map((single) => (
                      <ServiceReviewCard
                        {...single}
                        key={single.id}
                      ></ServiceReviewCard>
                    ))}
                  </div>
                ) : (
                  <div>
                    <span>No reviews Found.</span>
                  </div>
                )}
              </div>
            </div>
            <div className=" order-1 md:order-2">
              <div>
                <h1 className="text-3xl font-bold mt-5">Category</h1>
                <span className="capitalize mt-4 inline-block text-xl">
                  {category.split("_").join(" ").toLowerCase()}
                </span>
              </div>
              <div>
                <h4 className="text-3xl font-bold mt-10">Open time</h4>
                <button
                  className={`inline-block mt-3  px-4 rounded-full py-1 ${
                    availability === ServiceAvailability.UNAVAILABLE
                      ? "bg-red-500 text-white capitalize"
                      : "bg-main-primary text-white capitalize"
                  }`}
                >
                  <span className="text-lg font-bold">
                    {availability === ServiceAvailability.TWENTY_FOUR_SEVEN
                      ? "24/7"
                      : availability.split("_").join(" ").toLowerCase()}
                  </span>
                </button>
              </div>

              <h3 className="mt-10 font-bold text-3xl">Other Info</h3>
              <div className="flex mt-2 gap-2 px-1">
                <div className="inline-block px-4 rounded-full py-1 bg-slate-400/30">
                  Price <span>{price}</span>
                </div>

                <div className="inline-block capitalize px-4 rounded-full py-1 bg-slate-400/30">
                  <span>
                    Available in {location.split("_").join(" ").toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="font-bold text-3xl mb-2">Average Rating</h2>

                <div className="flex justify-center">
                  <Rate value={rating} disabled></Rate>
                </div>
              </div>
              <div className="flex justify-between px-2 pb-5 mt-10">
                {isSuccess ? (
                  <button className="bg-green-600 text-white px-4 py-1 rounded font-semibold">
                    Added to Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className=" font-semibold px-4 py-1 bg-gray-400/30"
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  onClick={() => setOpen(true)}
                  className="bg-main-primary text-white px-4 py-1 rounded"
                >
                  Booking
                </button>
                <BookingModal
                  isOpen={open}
                  setIsOpen={setOpen}
                  {...{
                    availability,
                    category,
                    createdAt,
                    description,
                    id,
                    location,
                    name,
                    price,
                    thumbnail,
                    updatedAt,
                    Cart,
                    bookings,
                    reviews,
                  }}
                ></BookingModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsCard;
