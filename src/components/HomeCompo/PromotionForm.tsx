import React from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";

type Props = {};

const PromotionForm = (props: Props) => {
  return (
    <div className="hidden justify-center items-center mt-20">
      <div className="px-10 w-full bg-white/40 backdrop-blur-lg py-5 rounded-3xl max-w-[500px]">
        <div className="text-center">
          <h4 className="text-xl font-bold">SUBMIT TO GET A PROMOTION CODE</h4>
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
              <button
                disabled={true}
                className="px-10 py-2 disabled:grayscale disabled:opacity-80 disabled:cursor-not-allowed rounded-full bg-yellow-400"
              >
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
  );
};

export default PromotionForm;
