import { IOverviewBookingStatus } from "@/types/common";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
const DynamicApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
type Props = {
  data: IOverviewBookingStatus[];
};

function PieChart({ data }: Props) {
  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: data.map((single) => single.status),
    series: data.map((single) => single._count),

    title: {
      text: "Order Status",
    },
  };
  return (
    <div className="chart-wrap">
      <DynamicApexChart
        options={options}
        series={options.series}
        type="polarArea"
        height={350}
      />
    </div>
  );
}

export default PieChart;
