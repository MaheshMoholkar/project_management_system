import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useModifyStatus } from "@/services/mutations";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/services/queries";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 20, 40];

type DisplayData = {
  title: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: number;
  location: string;
  status: string;
  actions?: any;
};

const ActionButtons = (props: any) => {
  const modifyStatusMutation = useModifyStatus();
  const handleAction = async (action: string) => {
    if (action === "start") {
      props.data.newStatus = "Running";
      modifyStatusMutation.mutate(props);
    } else if (action === "close") {
      props.data.newStatus = "Closed";
      modifyStatusMutation.mutate(props);
    } else if (action === "cancel") {
      props.data.newStatus = "Cancelled";
      modifyStatusMutation.mutate(props);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className={`${
          props.data.status == "Running" && "bg-blue-600 text-white"
        } rounded-full  hover:bg-blue-800 hover:text-white`}
        onClick={() => {
          handleAction("start");
        }}
      >
        Start
      </Button>
      <Button
        variant="outline"
        className={`${
          props.data.status == "Closed" && "bg-blue-600 text-white"
        }  rounded-full  hover:bg-blue-800 hover:text-white`}
        onClick={() => {
          handleAction("close");
        }}
      >
        Close
      </Button>
      <Button
        variant="outline"
        className={`${
          props.data.status == "Cancelled" && "bg-blue-600 text-white"
        } rounded-full hover:bg-blue-800 hover:text-white`}
        onClick={() => {
          handleAction("cancel");
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

function ProjectList() {
  const colDefs: ColDef<DisplayData>[] = [
    { field: "title", flex: 1.5 },

    { field: "reason", flex: 1 },
    { field: "type", flex: 1 },
    {
      field: "division",
      flex: 1,
    },
    {
      field: "category",
      flex: 1,
    },
    {
      field: "priority",
      flex: 1,
    },
    {
      field: "department",
      flex: 1,
    },
    {
      field: "location",
      flex: 1,
    },
    {
      field: "status",
      flex: 1,
    },
    {
      field: "actions",
      cellRenderer: (props: any) => <ActionButtons data={props.data} />,
      flex: 5 / 2,
      cellStyle: () => {
        return { borderColor: "transparent" };
      },
    },
  ];
  const [rowData, setRowData] = useState<DisplayData[]>();
  const [projectList, setProjectList] = useState();

  const [search, setSearch] = useState<string>();

  const getProjectsQuery = useGetProjects();

  useEffect(() => {
    if (getProjectsQuery.data) {
      setProjectList(getProjectsQuery.data);
    }
  }, [getProjectsQuery.data]);

  useEffect(() => {
    if (projectList) {
      setRowData(projectList);
    }
  }, [projectList]);

  return (
    <>
      <div className="m-5 -mt-6 rounded-lg bg-white">
        <div className="ag-theme-quartz h-[75vh]">
          <div className="p-2 border-b-2 flex gap-2 m-2  w-1/5">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            quickFilterText={search}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        </div>
      </div>
    </>
  );
}

export default ProjectList;
