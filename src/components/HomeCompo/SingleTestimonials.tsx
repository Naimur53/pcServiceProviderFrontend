import { IFeedback } from "@/types/common";
import React from "react";

type Props = {} & IFeedback;

const SingleTestimonials = ({ user, comment, id, title }: Props) => {
  return (
    <div className="mb-12 md:mb-0 shadow border rounded-xl py-3 text-cente hover:border-main-primary transition-all hover:shadow-xl duration-500">
      <h6 className="mb-1 text-xl font-medium text-primary dark:text-primary-400">
        {/* {title} */}
      </h6>
      <p className="mb-4 px-4">{comment}</p>

      <div className="flex px-4 gap-5 pt-2">
        <div className="">
          {user?.profileImg ? (
            <img
              src={user.profileImg}
              className="w-12 h-12  rounded-full shadow-lg dark:shadow-black/20"
              alt={user.name}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <h5 className="  text-sm ">{user?.name || "Demo Name"}</h5>
          <h5 className=" font-bold text-sm text-main-primary ">{title}</h5>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonials;
