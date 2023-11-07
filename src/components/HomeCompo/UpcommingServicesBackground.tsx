import useScrollValues from "@/hooks/useScrollValues";
import React from "react";
import { motion } from "framer-motion";
type Props = {};

const UpcommingServicesBackground = (props: Props) => {
  const { smoothedScrollY, progress } = useScrollValues();
  let value = progress * 1000;
  value -= 340;
  value *= 5;
  value = 1000 - value;
  console.log(value);

  return (
    <div className="absolute z-10 inset-0 overflow-hidden">
      <motion.div
        initial={{
          x: 0,
          skew: -20,
        }}
        animate={{
          x: value,
          skew: -20,
        }}
        transition={{ type: "just" }}
        className=" bg-[#EDF0F9] w-[300px] h-full skew-x-6 translate-x-[400px]"
      ></motion.div>
    </div>
  );
};

export default UpcommingServicesBackground;
