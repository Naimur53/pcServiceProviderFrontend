import useScrollValues from "@/hooks/useScrollValues";
import React from "react";
import { motion } from "framer-motion";
import { normalizeScrollValue } from "@/utils";
type Props = {};

const HomeServiceBackground = (props: Props) => {
  const { smoothedScrollY: value } = useScrollValues();
  const smoothedScrollY = normalizeScrollValue(value / 250, 0, 10) * 100;
  console.log(smoothedScrollY, { value: value / 14 });

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden  opacity-80">
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
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[100px] absolute top-[50px] right-[100px] -translate-y-1/2 h-[100px] rounded-full bg-teal-300 -translate-x-1/2 blur-[10px]"
          ></motion.div>
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: smoothedScrollY,
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[40px] h-[40px] absolute top-[150px] right-[20px] -translate-y-1/2  rounded-full bg-purple-500 -translate-x-1/2 blur-[7px]"
          ></motion.div>

          {/* bottom  */}
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: -(smoothedScrollY / 4),
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[100px] absolute bottom-[150px] left-0 -translate-y-1/2 h-[100px] rounded-full bg-purple-600 -translate-x-1/2 blur-[10px]"
          ></motion.div>
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: -(smoothedScrollY / 2),
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[40px] h-[40px] absolute bottom-[-620px] left-[0px] -translate-y-1/2  rounded-full bg-teal-500 -translate-x-1/2 blur-[7px]"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeServiceBackground;
