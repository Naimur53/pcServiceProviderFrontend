import React from "react";
import { motion } from "framer-motion";
import useScrollValues from "@/hooks/useScrollValues";

type Props = {};

const BannerGradient = (props: Props) => {
  const { scrollY, smoothedScrollY } = useScrollValues();

  return (
    <div className="absolute inset-0 overflow-hidden  ">
      <div className="absolute inset-0 ">
        <div className="w-[300px] absolute left-0 h-[300px] rounded-full bg-yellow-400 blur-[200px]"></div>
        <div className="w-[300px] absolute bottom-0 left-1/2 h-[300px] rounded-full bg-teal-400 -translate-x-1/2 blur-[190px]"></div>
        <div className="w-[200px] absolute bottom-0 right-0 -translate-y-1/2 h-[200px] rounded-full bg-purple-600 -translate-x-1/2 blur-[120px]"></div>
      </div>
      <div className="absolute inset-0 z-20">
        <motion.div
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: smoothedScrollY,
            opacity: 1,
          }}
          transition={{ ease: [1, 1, 1, 1], duration: 0.3, delay: 0 }}
          className="w-[100px] absolute top-1/4 right-[100px] -translate-y-1/2 h-[100px] rounded-full bg-teal-300 -translate-x-1/2 blur-[3px]"
        ></motion.div>
      </div>
    </div>
  );
};

export default BannerGradient;
