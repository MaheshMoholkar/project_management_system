import { DepartmentProjects } from "@/pages/Dashboard";
import { useGetChartData } from "@/services/queries";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

type ChartData = {
  name: string;
  y: number;
};

function PieChart() {
  const [pieChartData, setPieChartData] = useState<DepartmentProjects[]>([]);
  const [data, setData] = useState<ChartData[]>();
  const [options, setOptions] = useState({});
  const getChartDataQuery = useGetChartData();

  useEffect(() => {
    let tmpData: any[] = [];
    if (getChartDataQuery.isLoading == false) {
      setPieChartData(getChartDataQuery.data);
      pieChartData.map((project) => {
        let percentage = project.closed;
        tmpData.push({
          name: project.department,
          y: percentage * 100,
        });
      });
      setData(tmpData);
    }
  }, [getChartDataQuery.isLoading, getChartDataQuery.data]);

  useEffect(() => {
    const tmpOptions = {
      chart: {
        type: "pie",
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: "{point.percentage:.1f}%",
              style: {
                fontSize: "1.2em",
                textOutline: "none",
                opacity: 0.7,
              },
              filter: {
                operator: ">",
                property: "percentage",
                value: 10,
              },
            },
          ],
        },
      },
      series: [
        {
          name: "Departments",
          colorByPoint: true,
          data: data,
        },
      ],
    };
    setOptions(tmpOptions);
  }, [data, getChartDataQuery.isLoading]);
  return (
    <div className="mt-5 p-5 bg-white rounded-lg md:w-1/2">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default PieChart;
