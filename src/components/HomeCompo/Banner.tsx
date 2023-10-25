import useScrollValues from "@/hooks/useScrollValues";
import Link from "next/link";
import React from "react";

type Props = {};

const Banner = (props: Props) => {
  const { scrollY, smoothedScrollY } = useScrollValues();

  console.log({ scrollY, smoothedScrollY });
  return (
    <div className="min-h-screen relative">
      <div className="container relative z-30 bg-transparent">
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
            <img
              className="w-full"
              src="/images/banner-removebg-preview.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden  ">
        <div className="absolute inset-0 ">
          <div className="w-[300px] absolute left-0 h-[300px] rounded-full bg-yellow-400 blur-[200px]"></div>
          <div className="w-[300px] absolute bottom-0 left-1/2 h-[300px] rounded-full bg-teal-400 -translate-x-1/2 blur-[190px]"></div>
          <div className="w-[200px] absolute bottom-0 right-0 -translate-y-1/2 h-[200px] rounded-full bg-purple-600 -translate-x-1/2 blur-[120px]"></div>
        </div>
        <div className="absolute inset-0 z-20">
          <div className="w-[100px] absolute top-1/4 right-[100px] -translate-y-1/2 h-[100px] rounded-full bg-teal-300 -translate-x-1/2 blur-[5px]"></div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
