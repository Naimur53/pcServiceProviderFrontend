import { useAddCartMutation } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hook";
import { PcService, ServiceAvailability } from "@/types/common";
import { Rate } from "antd";
import Link from "next/link";
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

  return (
    <div className="shadow-lg rounded-lg">
      <div className="relative">
        <img className="rounded-t-lg w-full" src={thumbnail} alt="" />
        <button
          className={`inline-block text-sm md:text-md absolute right-3 top-3 px-4 rounded-full py-1 ${
            availability === ServiceAvailability.UNAVAILABLE
              ? "bg-red-500 text-white capitalize"
              : "bg-main-primary text-white capitalize"
          }`}
        >
          <span>
            {availability === ServiceAvailability.TWENTY_FOUR_SEVEN
              ? "24/7"
              : availability.split("_").join(" ").toLowerCase()}
          </span>
        </button>
        <button
          className={`inline-block  text-sm md:text-md absolute left-3 top-3 px-4 rounded-full py-1 bg-gray-400/75 font-bold text-white capitalize`}
        >
          <span>{category.split("_").join(" ").toLowerCase()}</span>
        </button>
      </div>
      <h1 className="mt-2 text-2xl font-bold mb-3 px-1">{name}</h1>
      <div className="flex gap-2 px-1">
        <div className="inline-block text-center px-4 rounded-full py-1 bg-slate-400/30">
          Price <span>{price}</span>
        </div>

        <div className="inline-block text-center capitalize px-4 rounded-full py-1 bg-slate-400/30">
          <span>
            Available in {location.split("_").join(" ").toLowerCase()}
          </span>
        </div>
      </div>
      <div className="flex justify-center py-2">
        <Rate value={rating} disabled></Rate>
      </div>
      <div className="flex justify-between px-2 pb-5">
        {isSuccess ? (
          <button className="bg-green-600 text-white px-4 py-1 rounded font-semibold">
            Added to Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-main-primary text-white px-4 py-1 rounded font-semibold"
          >
            Add to Cart
          </button>
        )}
        <Link
          href={`/service/${id}`}
          className="bg-gray-400/25 text-black px-4 py-1 rounded font-semibold"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
