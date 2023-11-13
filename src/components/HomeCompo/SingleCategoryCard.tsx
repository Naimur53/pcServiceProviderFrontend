import {
  IAllCategoryOfPcService,
  PcService,
  ServiceAvailability,
} from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { smoothShowAnimation } from "@/utils/animation";
type Props = {} & IAllCategoryOfPcService;

const SingleCategoryCard = ({
  category,
  _count: { _all },
  _min: { price, thumbnail },
}: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: `/service/allService`,
      query: `category=${category}`,
    });
  };
  return (
    <motion.div
      variants={smoothShowAnimation.item}
      onClick={handleClick}
      className="group h-full bg-white/60 backdrop-blur-lg rounded-xl"
    >
      <div className=" cursor-pointer h-full  transition-all rounded-lg flex gap-5">
        <div className="relative">
          <Image
            width={200}
            height={200}
            className="rounded-l-lg min-w-[100px] w-[100px] lg:min-w-[180px] lg:w-[180px] transition-all  h-full"
            src={thumbnail}
            alt=""
          />
        </div>
        <div>
          <h1 className="mt-1 text-xl group-hover:text-main-primary transition-all font-bold mb-1 capitalize">
            {category.split("_").join(" ").toLowerCase()}
          </h1>

          <div className="  pb-5">
            <p>
              Starting At <span className="text-yellow-600">${price}</span>
            </p>
            <p>
              Total available service <span>{_all}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleCategoryCard;
