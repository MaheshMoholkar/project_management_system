export type ProjectType = {
  _id: string;
  title: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: string;
};

export type Project = {
  _id: string;
  title: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  location: string;
  status: string;
};

export interface DepartmentProjects {
  department: string;
  totalProjects: number;
  closed: number;
}
