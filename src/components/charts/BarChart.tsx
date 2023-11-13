import { IOverviewCategoryStatus } from "@/types/common";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
import ReactApexChart from "react-apexcharts";

type Props = {
  data: IOverviewCategoryStatus[];
};
const DynamicApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function BarChart({ data }: Props) {
  // Your chart configuration options
  const options: ApexOptions = {
    title: {
      text: "Category Order status",
    },
    chart: {
      type: "bar",
    },
    colors: ["#51309d"],
    series: [
      {
        name: "Total Order",
        data: data.map((single) => single.count),
      },
    ],
    xaxis: {
      categories: data.map((signle) => signle.name),
    },
  };
  return (
    <div className="chart-wrap">
      <DynamicApexChart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default BarChart;
