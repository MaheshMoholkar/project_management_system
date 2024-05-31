import BarChartComponent from "@/components/BarChart";
import Card from "@/components/Card";
import { useGetCardList, useGetChartData } from "@/services/queries";
import { useEffect, useState } from "react";

type Card = {
  name: string;
  value: string;
};

export interface DepartmentProjects {
  department: string;
  total: number;
  closed: number;
}

function Dashboard() {
  const [cardList, setCardList] = useState<Card[]>();
  const getProjectsQuery = useGetCardList();
  const [chartData, setChartData] = useState<DepartmentProjects[]>();
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
      <div className="flex items-center flex-col md:flex-row gap-4 md:-mt-6 md:justify-around">
        {cardList &&
          cardList.map((item, index) => (
            <Card
              key={index}
              title={item.name}
              value={item.value ? item.value : "0"}
            />
          ))}
      </div>
      <div className="m-4 text-xl">
        <p>Department Wise - Total vs Closed</p>
        <BarChartComponent chartData={chartData} />
      </div>
    </>
  );
}

export default Dashboard;
