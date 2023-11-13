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
              <h1 className="text-2xl mt-20 lg:mt-0 lg:text-6xl font-black mb-2">
                Computer Repair And Troubleshoot Your Pc Problem
              </h1>
              <p className=" text-sm mt-5">
                At our Easy PC service, we are dedicated to resolving all your
                computer issues with expertise and efficiency. Whether your
                computer is running slow, plagued by viruses, or facing hardware
                problems, our skilled technicians are here to help.
              </p>
              <div className="relative">
                <img
                  height={600}
                  width={900}
                  className="absolute"
                  src={"/images/banner-img.png"}
                ></img>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-20">
            <div className="px-10 w-full bg-white/40 backdrop-blur-lg py-5 rounded-3xl max-w-[500px]">
              <div className="text-center">
                <h4 className="text-xl font-bold">
                  SUBMIT TO GET A PROMOTION CODE
                </h4>
                <p className="text-lg">
                  <span className="text-cyan-400 font-bold">Just 39$ </span>
                  Instead of <span className="line-through">$50</span>
                </p>
              </div>
              <div className="">
                <Form submitHandler={() => {}}>
                  <div className="mt-4 flex flex-col gap-2">
                    <FormInput
                      type="text"
                      label="Your Name"
                      name="name"
                      placeholder="jon deo"
                    ></FormInput>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <FormInput
                      type="email"
                      label="Your Email"
                      name="Email"
                      placeholder="jondeo@gmail.com"
                    ></FormInput>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <FormInput
                      type="tel"
                      label="Your Phone Number"
                      name="phoneNumber"
                      placeholder="0120000000"
                    ></FormInput>
                  </div>
                  <div className="flex justify-center mt-5 pb-5">
                    <button className="px-10 py-2 rounded-full bg-yellow-400">
                      Take the token
                    </button>
                  </div>
                </Form>
              </div>
            </div>

            {/* <img

              className="w-full"
              src="/images/banner-removebg-preview.png"
              alt=""
            /> */}
          </div>
        </div>
      </div>
      <BannerGradient></BannerGradient>
    </div>
  );
};
export default Banner;
