import Link from "next/link";
import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="h-screen">
      <div className="container">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px]">
          <div className="flex  items-center">
            <div>
              <h1 className="text-2xl lg:text-6xl font-black mb-2">
                Computer Repair And Troubleshoot All Of Your Pc Problem
              </h1>
              <p className=" text-sm mt-5">
                At our Easy PC service, we are dedicated to resolving all your
                computer issues with expertise and efficiency. Whether your
                computer is running slow, plagued by viruses, or facing hardware
                problems, our skilled technicians are here to help.
              </p>
              <Link
                href="/service/allService"
                className="px-5 inline-block py-2 bg-main-primary text-white font-bold mt-5"
              >
                Checkout service
              </Link>
            </div>
          </div>
          <div>
            <img className="w-full" src="/images/banner.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
