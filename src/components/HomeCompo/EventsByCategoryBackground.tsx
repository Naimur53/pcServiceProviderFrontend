import useScrollValues from "@/hooks/useScrollValues";
import React from "react";
import { motion } from "framer-motion";
type Props = {};

const EventsByCategoryBackground = (props: Props) => {
  const { smoothedScrollY } = useScrollValues();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{
          x: 0,
          skew: 20,
        }}
        animate={{
          x: smoothedScrollY,
          skew: 20,
        }}
        transition={{ type: "just" }}
        className=" bg-[#EDF0F9] w-[300px] h-full skew-x-6 translate-x-[400px]"
      ></motion.div>
    </div>
  );
};

export default EventsByCategoryBackground;
