import { Project, ProjectType } from "./types";

export const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

export function calculateStatusCount(projects: Project[], status: string) {
  return projects.filter((project) => project.status === status).length;
}
