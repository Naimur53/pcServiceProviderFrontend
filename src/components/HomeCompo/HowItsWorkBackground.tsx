import useScrollValues from "@/hooks/useScrollValues";
import React from "react";
import { motion } from "framer-motion";
type Props = {};

const HowItsWorkBackground = (props: Props) => {
  const { progress } = useScrollValues();
  let smoothedScrollY = progress * 1000;
  smoothedScrollY -= 390;
  smoothedScrollY *= 1.2;
  return (
    <>
      <div className="absolute inset-0 overflow-hidden ">
        <div className="absolute inset-0 z-20 ">
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
            className="w-[60px] absolute top-[0px] right-[100px]  h-[60px] rounded-full bg-teal-300 -translate-x-1/2 blur-[15px]"
          ></motion.div>
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: smoothedScrollY * 1.3,
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[80px] h-[80px] absolute top-[150px] right-[20px] -translate-y-1/2  rounded-full bg-purple-500 -translate-x-1/2 blur-[10px]"
          ></motion.div>
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: smoothedScrollY * 1.6,
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[50px] h-[50px] absolute top-[250px] right-[220px] -translate-y-1/2  rounded-full bg-yellow-300 -translate-x-1/2 blur-[12px]"
          ></motion.div>

          {/* left  background */}
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: -smoothedScrollY,
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[100px] absolute bottom-[250px] left-0 -translate-y-1/2 h-[100px] rounded-full bg-yellow-300 -translate-x-1/2 blur-[10px]"
          ></motion.div>
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: -smoothedScrollY * 1.4,
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[40px] h-[40px] absolute bottom-[40px] left-[200px] -translate-y-1/2  rounded-full bg-teal-500 -translate-x-1/2 blur-[7px]"
          ></motion.div>
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: -smoothedScrollY * 1.5,
              opacity: 1,
            }}
            transition={{ type: "just", duration: 0.3, delay: 0 }}
            className="w-[50px] h-[50px] absolute bottom-[-170px] left-[80px] -translate-y-1/2  rounded-full bg-purple-400 -translate-x-1/2 blur-[15px]"
          ></motion.div>
        </div>
        {/* light effect */}

        <div className="absolute left-1/2 -translate-x-1/2 blur-[90px] bottom-0 w-[800px] h-[800px] translate-y-1/2 bg-[#244A87] rounded-full"></div>
      </div>
    </>
  );
};

export default HowItsWorkBackground;
