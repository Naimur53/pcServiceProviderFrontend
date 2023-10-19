import { ServiceCategory } from "@/types/common";
import React from "react";
import SingleCategoryService from "./SingleCategoryService";

type Props = {};

const EventsByCategory = (props: Props) => {
  const categories: ServiceCategory[] = [
    ServiceCategory.CLOUD_COMPUTING_SERVICES,
    ServiceCategory.COMPUTER_TROUBLESHOOTING,
    ServiceCategory.DATA_RECOVERY,
  ];
  return (
    <div className="container mt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Choose Your Service</h1>
        <p>
          We have more than 10+ service category here are popular 3 category
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 mt-20 gap-5">
        {categories.map((single) => (
          <SingleCategoryService
            key={single}
            category={single}
          ></SingleCategoryService>
        ))}
      </div>
    </div>
  );
};

export default EventsByCategory;
