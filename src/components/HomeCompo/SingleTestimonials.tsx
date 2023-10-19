import { IFeedback } from "@/types/common";
import React from "react";

type Props = {} & IFeedback;

const SingleTestimonials = ({ user, comment, id, title }: Props) => {
  return (
    <div className="mb-12 md:mb-0 shadow border py-3 text-center">
      <div className="mb-6 flex justify-center">
        {user?.profileImg ? (
          <img
            src={user.profileImg}
            className="w-32 h-32  rounded-full shadow-lg dark:shadow-black/20"
            alt={user.name}
          />
        ) : (
          <></>
        )}
      </div>
      <h5 className=" text-lg font-bold">{user?.name || "Demo Name"}</h5>
      <h6 className="mb-4 font-medium text-primary dark:text-primary-400">
        {user?.email || "demo@gmail.com"}
      </h6>
      <p className="mb-4">{comment}</p>
    </div>
  );
};

export default SingleTestimonials;
