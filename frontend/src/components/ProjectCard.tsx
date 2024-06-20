import { ActionButtons, DisplayData } from "@/pages/ProjectList";
import { formatDateRange } from "@/utils/dateUtils";

function ProjectCard({ project }: { project: DisplayData }) {
  return (
    <>
      <div className="m-4 p-4 border rounded-lg bg-white">
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <div>
              <p className="font-semibold">{project.title}</p>
            </div>
            <p className=" font-semibold">{project.status}</p>
          </div>
          <p className="text-xs text-gray-500">
            {formatDateRange(project.startDate, project.endDate)}
          </p>
        </div>
        <div className="flex gap-4 text-gray-500">
          <div>
            <p>
              Reason: <span className="text-gray-900">{project.reason}</span>
            </p>
            <p>
              Type: <span className="text-gray-900">{project.type}</span>
            </p>
            <p>
              Cat.: <span className="text-gray-900">{project.category}</span>
            </p>
            <p>
              Div: <span className="text-gray-900">{project.division}</span>
            </p>
          </div>
          <div>
            <p>
              Dept: <span className="text-gray-900">{project.department}</span>
            </p>
            <p>
              Location:{" "}
              <span className="text-gray-900">{project.location}</span>
            </p>
            <p>
              Priority:{" "}
              <span className="text-gray-900">{project.priority}</span>
            </p>
          </div>
        </div>
        <div className="flex pt-3 justify-center">
          <ActionButtons project={project} />
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
