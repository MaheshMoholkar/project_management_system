import BarChartComponent from "@/components/BarChart";
import Card from "@/components/Card";
import PieChart from "@/components/PieChart";
import { useGetCardList, useGetChartData } from "@/services/queries";
import { useEffect, useState } from "react";

type Card = {
  name: string;
  value: string;
};

export interface DepartmentProjects {
  department: string;
  totalProjects: number;
  closed: number;
}

function Dashboard() {
  const [cardList, setCardList] = useState<Card[]>();
  const getProjectsQuery = useGetCardList();
  const [chartData, setChartData] = useState<DepartmentProjects[]>([]);
  const getChartDataQuery = useGetChartData();

  useEffect(() => {
    if (getChartDataQuery.isLoading == false) {
      setChartData(getChartDataQuery.data);
    }
  }, [getChartDataQuery.isLoading, getChartDataQuery.data]);

  useEffect(() => {
    if (getProjectsQuery.data) {
      setCardList(getProjectsQuery.data);
    }
  });

  return (
    <>
      <div className="flex items-center overflow-y-auto no-scrollbar md:flex-row gap-4 md:-mt-6 md:justify-around m-4">
        {cardList &&
          cardList.map((item, index) => (
            <Card
              key={index}
              title={item.name}
              value={item.value ? item.value : "0"}
            />
          ))}
      </div>
      <div className="md:ml-8 text-xl">
        <p className="ml-4">Department Wise - Total vs Closed</p>
        <div className="flex flex-col md:flex-row">
          <BarChartComponent chartData={chartData} />
          <PieChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
