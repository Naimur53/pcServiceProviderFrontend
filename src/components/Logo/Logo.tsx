import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <Link href="/" className="flex items-center">
        <Image
          width={200}
          height={200}
          className="w-[60px]"
          src={"/images/logo.png"}
          alt="pc"
        ></Image>
        <span className="font-black text-2xl">Easy PC</span>
      </Link>
    </div>
  );
};

export default Logo;
