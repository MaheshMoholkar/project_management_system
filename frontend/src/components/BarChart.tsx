import { DepartmentProjects } from "@/pages/Dashboard";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartComponent({ chartData }: any) {
  const [data, setData] = useState<DepartmentProjects[]>();
  useEffect(() => {
    setData(chartData);
  });

  const getMaxProjects = () => {
    let maxProjectCount = 0;

    if (data) {
      data.forEach((project) => {
        if (project.total > maxProjectCount) {
          maxProjectCount = project.total;
        }
      });
    }

    return maxProjectCount;
  };
  return (
    <>
      <div className="mt-5 p-5 bg-white border rounded-lg shadow-sm md:w-1/2">
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="department" tick={{ fontSize: 14 }} />
            <YAxis dataKey={getMaxProjects} tick={{ fontSize: 14 }} />
            <Tooltip shared={false} trigger="click" />
            <Legend />
            <Bar
              dataKey="totalProjects"
              name="Total"
              fill="#1c72ca"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="closed"
              name="Closed"
              fill="#3CA99F"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default BarChartComponent;
