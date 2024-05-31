import mongoose from "mongoose";
import { ProjectType } from "../shared/types";

const projectSchema = new mongoose.Schema<ProjectType>({
  title: { type: String, required: true },
  reason: { type: String, required: true },
  type: { type: String, required: true },
  division: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  department: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
});

const Project = mongoose.model<ProjectType>("Project", projectSchema);
export default Project;
