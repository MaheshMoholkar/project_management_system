import React, { useEffect, useState } from "react";
import { AlignLeft, ChevronDown, Search } from "lucide-react";
import { useModifyStatus } from "@/services/mutations";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/services/queries";
import { formatDateRange } from "@/utils/dateUtils";
import ProjectCard from "@/components/ProjectCard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type DisplayData = {
  _id: string;
  title: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
};

type ActionButtonsProps = {
  project: DisplayData;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ project }) => {
  const modifyStatusMutation = useModifyStatus();

  const handleAction = async (action: string) => {
    const updatedProject = { ...project };
    if (action === "start") {
      updatedProject.status = "Running";
    } else if (action === "close") {
      updatedProject.status = "Closed";
    } else if (action === "cancel") {
      updatedProject.status = "Cancelled";
    }
    modifyStatusMutation.mutate(updatedProject);
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        className={`${
          project.status === "Running"
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 border border-blue-600"
        } rounded-full px-5 hover:bg-blue-800 hover:text-white`}
        onClick={() => handleAction("start")}
      >
        Start
      </Button>
      <Button
        variant="outline"
        className={`${
          project.status === "Closed"
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 border border-blue-600"
        } rounded-full px-5 hover:bg-blue-800 hover:text-white`}
        onClick={() => handleAction("close")}
      >
        Close
      </Button>
      <Button
        variant="outline"
        className={`${
          project.status === "Cancelled"
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 border border-blue-600"
        } rounded-full px-5 hover:bg-blue-800 hover:text-white`}
        onClick={() => handleAction("cancel")}
      >
        Cancel
      </Button>
    </div>
  );
};

function ProjectList() {
  const [rowData, setRowData] = useState<DisplayData[]>([]);
  const [projectList, setProjectList] = useState<DisplayData[]>([]);
  const [sortedList, setSortedList] = useState<DisplayData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DisplayData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = React.useState("None");

  const getProjectsQuery = useGetProjects(currentPage, search);

  useEffect(() => {
    if (getProjectsQuery.data) {
      const { data, pagination } = getProjectsQuery.data;
      setProjectList(data);
      setSortedList(data);
      setTotalPages(pagination.pages);
    }
  }, [getProjectsQuery.data]);

  useEffect(() => {
    const sortProjects = () => {
      let sorted = [...projectList];
      switch (sortBy) {
        case "Status":
          sorted.sort((a, b) => a.status.localeCompare(b.status));
          break;
        case "Priority":
          sorted.sort((a, b) => a.priority.localeCompare(b.priority));
          break;
        case "StartDate":
          sorted.sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
          break;
        case "EndDate":
          sorted.sort(
            (a, b) =>
              new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          );
          break;
        case "Name":
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "Reason":
          sorted.sort((a, b) => a.reason.localeCompare(b.reason));
          break;
        case "Type":
          sorted.sort((a, b) => a.type.localeCompare(b.type));
          break;
        case "Division":
          sorted.sort((a, b) => a.division.localeCompare(b.division));
          break;
        case "Category":
          sorted.sort((a, b) => a.category.localeCompare(b.category));
          break;
        case "Department":
          sorted.sort((a, b) => a.department.localeCompare(b.department));
          break;
        case "Location":
          sorted.sort((a, b) => a.location.localeCompare(b.location));
          break;
        default:
          sorted = projectList;
          break;
      }
      setSortedList(sorted);
    };

    sortProjects();
  }, [sortBy, projectList]);

  useEffect(() => {
    const filterProjects = () => {
      const filtered = sortedList.filter(
        (project) =>
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.category
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          project.department.toLowerCase().includes(search.toLowerCase()) ||
          project.location.toLowerCase().includes(search.toLowerCase()) ||
          project.type.toLowerCase().includes(search.toLowerCase()) ||
          project.division.toLowerCase().includes(search.toLowerCase()) ||
          project.reason.toLowerCase().includes(search.toLowerCase()) ||
          project.priority.toLowerCase().includes(search.toLowerCase()) ||
          project.status.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filtered);
    };

    filterProjects();
  }, [search, sortedList]);

  useEffect(() => {
    setRowData(searchResults);
  }, [searchResults]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="md:hidden -z-10 mb-14">
        <div className="flex items-center justify-between mx-3">
          <div className="p-3 border-b-2 flex bg-transparent">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none ml-3 w-9/12 bg-transparent"
              onChange={handleSearchChange}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AlignLeft className="text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="Status">
                  Status
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Priority">
                  Priority
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="StartDate">
                  Start Date
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="EndDate">
                  End Date
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          {searchResults.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </div>
      </div>
      <div className="hidden md:block m-5 mb-1 -mt-6 rounded-lg bg-white">
        <div className="h-[75vh]">
          <div className="flex justify-between">
            <div className="p-3 border-b-2 flex gap-2 m-2 w-1/5">
              <Search />
              <input
                type="text"
                placeholder="Search"
                className="outline-none w-full"
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center">
              <div className="text-gray-600">Sort By: </div>
              <div className="p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex gap-2 items-center">
                      {sortBy}
                      <span>
                        <ChevronDown />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup
                      value={sortBy}
                      onValueChange={setSortBy}
                    >
                      <DropdownMenuRadioItem value="Name">
                        Name
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Reason">
                        Reason
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Type">
                        Type
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Division">
                        Division
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Category">
                        Category
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Department">
                        Department
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Location">
                        Location
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 text-sm">Project Name</th>
                <th className="p-3 text-sm">Reason</th>
                <th className="p-3 text-sm">Type</th>
                <th className="p-3 text-sm">Division</th>
                <th className="p-3 text-sm">Category</th>
                <th className="p-3 text-sm">Priority</th>
                <th className="p-3 text-sm">Dept.</th>
                <th className="p-3 text-sm">Location</th>
                <th className="p-3 text-sm">Status</th>
                <th className="p-3 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((project, index) => (
                <tr key={index} className="border-b">
                  <td className="px-5 py-2">
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-xs text-gray-700">
                      {formatDateRange(project.startDate, project.endDate)}
                    </p>
                  </td>
                  <td className="px-5 py-2">{project.reason}</td>
                  <td className="px-5 py-2">{project.type}</td>
                  <td className="px-5 py-2">{project.division}</td>
                  <td className="px-5 py-2">{project.category}</td>
                  <td className="px-5 py-2">{project.priority}</td>
                  <td className="px-5 py-2">{project.department}</td>
                  <td className="px-5 py-2">{project.location}</td>
                  <td className="p-2 font-semibold">{project.status}</td>
                  <td className="align-middle">
                    <ActionButtons project={project} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="hidden md:flex w-full justify-center p-1 gap-5">
        <button onClick={() => setCurrentPage(1)} className="rounded-md">
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md"
        >
          {"<"}
        </button>
        <span className="p-3 flex gap-4">
          {currentPage != 1 ? (
            <span className="rounded-full p-2 text-xs">{currentPage - 1}</span>
          ) : (
            ""
          )}
          <div className="border rounded-full w-8 h-8 flex justify-center items-center text-xs bg-sky-400 text-white">
            {currentPage}
          </div>
          {currentPage != totalPages ? (
            <span className="rounded-full p-2 text-xs">{currentPage + 1}</span>
          ) : (
            ""
          )}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md"
        >
          {">"}
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          className="rounded-md"
        >
          {">>"}
        </button>
      </div>
    </>
  );
}

export default ProjectList;
