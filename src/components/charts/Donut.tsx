import { IAdminOverViewStatus, IOverviewBookingStatus } from "@/types/common";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
const DynamicApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
type Props = {
  data: IAdminOverViewStatus;
};

function Donut({ data: { totalUser, totalCarts } }: Props) {
  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Total User", "Total Added Carts"],
    series: [totalUser, totalCarts],

    title: {
      text: "Carts Info",
    },
  };
  return (
    <div className="chart-wrap">
      <DynamicApexChart
        options={options}
        series={options.series}
        type="donut"
        height={350}
      />
    </div>
  );
}

export default Donut;
