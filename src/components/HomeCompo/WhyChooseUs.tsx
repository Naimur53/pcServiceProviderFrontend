import React from "react";
import { motion } from "framer-motion";
import { smoothShowAnimation } from "@/utils/animation";

type Props = {};

const WhyChooseUs = (props: Props) => {
  return (
    <div className="mt-20 pb-20">
      <div className="container mb-10">
        <h2 className="text-4xl font-bold text-center">Why Choose Us</h2>
        <p className="text-center mt-2">We have highly skills people</p>
      </div>
      <motion.div
        variants={smoothShowAnimation.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        transition={{ type: "just" }}
        className="container mx-auto max-w-5xl pt-10 flex gap-12 flex-wrap items-start justify-center md:justify-between"
      >
        <motion.div
          variants={smoothShowAnimation.item}
          className="grid gap-4 justify-items-center text-center md:flex-1"
        >
          <div className=" rounded-full border-8 border-main-primary p-4 relative  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              // initial={{ scale: 1 }}
              // animate={{ scale: 1 }}
              className="w-14 h-14  "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              ></path>
            </svg>
          </div>
          <h3 className="text-3xl font-bold">Safe</h3>
          <p>Our products are secure and private out-of-the-box</p>
        </motion.div>
        <motion.div
          variants={smoothShowAnimation.item}
          className="grid gap-4 justify-items-center text-center md:flex-1"
        >
          <div className=" rounded-full border-8 border-main-primary p-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold">Efficient</h3>
          <p>Feel good about your wallet and the environment</p>
        </motion.div>
        <motion.div
          variants={smoothShowAnimation.item}
          className="grid gap-4 justify-items-center text-center md:flex-1"
        >
          <div className=" rounded-full border-8 border-main-primary p-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              ></path>
            </svg>
          </div>
          <h3 className="text-3xl font-bold">Proven</h3>
          <p>Leading the Pc service world for 10 years</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyChooseUs;
