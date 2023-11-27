import useScrollValues from "@/hooks/useScrollValues";
import Link from "next/link";
import React from "react";
import BannerGradient from "./BannerGradient";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import Image from "next/image";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="min-h-screen relative">
      <div className="container relative z-30 bg-transparent ">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[150px] ">
          <div className="flex  items-center">
            <div>
              <h1 className="text-2xl 2xl:pt-40 pt-20 lg:mt-0 lg:text-4xl 2xl:text-6xl font-black mb-2">
                Computer Repair And Troubleshoot Your Pc Problem
              </h1>
              <p className=" text-sm mt-10">
                At our Easy PC service, we are dedicated to resolving all your
                computer issues with expertise and efficiency. Whether your
                computer is running slow, plagued by viruses, or facing hardware
                problems, our skilled technicians are here to help.
              </p>

              <Link
                className="px-10 py-2 rounded bg-main-primary inline-block mt-5 font-bold"
                href={"/service/allService"}
              >
                Services
              </Link>
            </div>
          </div>
          <div className="flex pt-0 2xl:pt-40 justify-center items-center">
            {" "}
            <Image
              alt="board"
              height={600}
              width={900}
              quality={100}
              className="w-full"
              src={"/images/banner-img.png"}
            ></Image>
          </div>
        </div>
      </div>
      <BannerGradient></BannerGradient>
    </div>
  );
};
export default Banner;
