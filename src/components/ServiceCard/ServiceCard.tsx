import { useAddCartMutation } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hook";
import { PcService, ServiceAvailability } from "@/types/common";
import { Rate } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
type Props = {} & PcService;

const ServiceCard = ({
  id,
  name,
  price,
  availability,
  reviews,
  location,
  category,
  thumbnail,
  description,
}: Props) => {
  const user = useAppSelector((state) => state.user);
  const [addToCart, { isLoading, isSuccess, isError }] = useAddCartMutation();
  let rating = 0;
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
  const router = useRouter();
  const handleClick = () => {
    router.push(`/service/${id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer"
    >
      <div className="relative">
        {/* <img className="rounded-t-lg w-full" src={thumbnail} alt="" /> */}
        <div
          className=" w-full h-[200px] bg-no-repeat bg-cover "
          style={{ backgroundImage: `url(${thumbnail})` }}
        ></div>
        <button
          className={`inline-block text-[13px] absolute right-3 top-3 px-4 rounded-full py-1 ${
            availability === ServiceAvailability.UNAVAILABLE
              ? "bg-red-500 text-white capitalize"
              : "bg-teal-500 text-white capitalize"
          }`}
        >
          <span>
            {availability === ServiceAvailability.TWENTY_FOUR_SEVEN
              ? "24/7"
              : availability.split("_").join(" ").toLowerCase()}
          </span>
        </button>
        <button
          className={`inline-block  text-[13px] absolute left-3 top-3 px-4 rounded-full py-1 backdrop-blur-md font-bold bg-white/60 text-black capitalize `}
        >
          <span>{category.split("_").join(" ").toLowerCase()}</span>
        </button>
      </div>
      <h1 className="mt-2 text-2xl text-center font-bold mb-3 px-1">{name}</h1>
      <div className="flex justify-center text-center  flex-col gap-2 px-1">
        <p className="text-4xl font-bold text-yellow-500">${price}</p>

        <div className="capitalize">
          <span>
            Available in {location.split("_").join(" ").toLowerCase()}
          </span>
        </div>
      </div>
      <div className="flex justify-center py-5 px-4 lg:px-20 ">
        <div className="bg-yellow-400/10 rounded-lg py-3 flex justify-center flex-col gap-2 items-center w-full">
          <Rate value={rating} disabled></Rate>
          {/* <p className="text-gray-500">
            <span className="font-bold">{reviews?.length}</span> customers
            rating{" "}
          </p> */}
        </div>
      </div>
      <div className="flex justify-center px-2 mt-0 pb-5">
        {isSuccess ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-teal-600 text-white px-10 py-2  rounded-3xl font-semibold"
          >
            Added to Cart
          </button>
        ) : (
          <button
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="bg-yellow-400  px-10 py-2  rounded-3xl font-semibold"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
