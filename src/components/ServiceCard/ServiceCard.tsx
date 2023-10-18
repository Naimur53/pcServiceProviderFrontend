import { PcService, ServiceAvailability } from "@/types/common";
import { Rate } from "antd";
import React from "react";

type Props = {} & PcService;

const ServiceCard = ({
  name,
  price,
  availability,
  reviews,
  location,
  category,
}: Props) => {
  let rating = 0;
  if (reviews?.length) {
    const sum = reviews.reduce((pre, current) => {
      return current.rating + pre;
    }, 0);
    rating = sum / reviews.length;
  }

  return (
    <div className="shadow-lg">
      <div className="relative">
        <img
          className="rounded-t-lg"
          src="https://images.unsplash.com/photo-1588632901974-5ae3618d967b?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcHV0ZXIlMjByZXBhaXJ8ZW58MHx8MHx8fDA%3D&w=1000"
          alt=""
        />
        <button
          className={`inline-block absolute right-3 top-3 px-4 rounded-full py-1 ${
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
          className={`inline-block absolute left-3 top-3 px-4 rounded-full py-1 bg-gray-400/75 font-bold text-white capitalize`}
        >
          <span>{category.split("_").join(" ").toLowerCase()}</span>
        </button>
      </div>
      <h1 className="mt-2 text-2xl font-bold mb-3">{name}</h1>
      <div className="flex gap-2">
        <div className="inline-block px-4 rounded-full py-1 bg-slate-400/30">
          Price <span>{price}</span>
        </div>

        <div className="inline-block capitalize px-4 rounded-full py-1 bg-slate-400/30">
          <span>
            Available in {location.split("_").join(" ").toLowerCase()}
          </span>
        </div>
      </div>
      <div className="flex justify-center py-2">
        <Rate value={rating} disabled></Rate>
      </div>
      <div className="flex justify-between px-2 pb-5">
        <button className="bg-main-primary text-white px-4 py-1 rounded font-semibold">
          Add to Cart
        </button>
        <button className="bg-gray-400/25 text-black px-4 py-1 rounded font-semibold">
          View
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
