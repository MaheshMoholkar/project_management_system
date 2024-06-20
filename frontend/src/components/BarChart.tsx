import React, { useEffect, useState } from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DepartmentProjects } from "@/pages/Dashboard";

type BarChartComponentProps = {
  chartData: DepartmentProjects[];
};

const BarChartComponent: React.FC<BarChartComponentProps> = ({ chartData }) => {
  const [data, setData] = useState<DepartmentProjects[]>([]);

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Statistics",
      align: "left",
    },
    xAxis: {
      categories: data.map((item) => item.department),
      crosshair: true,
      accessibility: {
        description: "Departments",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Projects",
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Total",
        data: data.map((item) => item.totalProjects),
        color: "#025aab",
      },
      {
        name: "Closed",
        data: data.map((item) => item.closed),
        color: "#5aa647",
      },
    ],
  };

  return (
    <div className="mt-5 p-5 bg-white border rounded-lg shadow-sm md:w-1/2">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChartComponent;
