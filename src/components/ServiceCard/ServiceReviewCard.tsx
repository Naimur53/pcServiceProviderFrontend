import { Review } from "@/types/common";
import { Rate } from "antd";
import Image from "next/image";
import React from "react";

type Props = {} & Review;

const ServiceReviewCard = ({ rating, comment, user }: Props) => {
  return (
    <div>
      <section className="mb-2 border  p-4 rounded-lg max-w-full bg-neutral-100">
        <div className="mx-auto">
          <div className="card md:flex max-w-lg">
            <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
              {user?.profileImg ? (
                <img
                  className="object-cover rounded-full"
                  src={user?.profileImg}
                  alt="users"
                />
              ) : (
                <></>
              )}
            </div>
            <div className="flex-grow text-center md:text-left">
              <p className="font-bold text-xl">{user?.name}</p>
              <h3 className=" heading">{user?.email}</h3>
              <p className="mt-2 mb-3">{comment}</p>
              <div>
                <Rate disabled={true} value={rating}></Rate>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceReviewCard;
