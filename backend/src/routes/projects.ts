import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { DepartmentProjects, ProjectType } from "../shared/types";
import Project from "../models/project";
import { calculateStatusCount, parseDate } from "../shared/common";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("reason").notEmpty().withMessage("Reason is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("division").notEmpty().withMessage("Divsion is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("priority").notEmpty().withMessage("Priority is required"),
    body("department").notEmpty().withMessage("Department is required"),
    body("startDate").notEmpty().withMessage("Start Date is required"),
    body("endDate").notEmpty().withMessage("End Date is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const { startDate, endDate, ...otherFields } = req.body;
      const parsedStartDate = parseDate(startDate);
      const parsedEndDate = parseDate(endDate);

      const newProject: ProjectType = {
        ...otherFields,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      };

      const project = new Project(newProject);
      await project.save();

      res.status(201).send(project);
    } catch (error) {
      console.log("Error create project:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects!" });
  }
});

router.get("/chartdata", verifyToken, async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});

    const countsByDepartment: Record<string, DepartmentProjects> = {};

    // Calculate counts for each department
    projects.forEach((project) => {
      const department = project.department || "Unknown";
      if (!countsByDepartment[department]) {
        countsByDepartment[department] = {
          department,
          totalProjects: 0,
          closed: 0,
        };
      }
      countsByDepartment[department].totalProjects++;
      if (project.status === "Closed") {
        countsByDepartment[department].closed++;
      }
    });

    // Convert the counts into an array
    const departmentWiseProjects: DepartmentProjects[] =
      Object.values(countsByDepartment);

    res.status(200).json(departmentWiseProjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chartdata!" });
  }
});

router.get("/cards", verifyToken, async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    const totalProjects = projects.length;
    const closedCount = calculateStatusCount(projects, "Closed");
    const runningCount = calculateStatusCount(projects, "Running");
    const cancelledCount = calculateStatusCount(projects, "Cancelled");

    const currentDate = new Date();
    const closureDelayCount = projects.filter((project) => {
      return (
        project.status === "Running" && new Date(project.endDate) < currentDate
      );
    }).length;

    const cardList = [
      {
        name: "Total Projects",
        value: totalProjects,
      },
      {
        name: "Closed",
        value: closedCount,
      },
      {
        name: "Running",
        value: runningCount,
      },
      {
        name: "Closure Delay",
        value: closureDelayCount,
      },
      {
        name: "Cancelled",
        value: cancelledCount,
      },
    ];

    res.status(200).json(cardList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cardList!" });
  }
});

router.put("/:projectId", verifyToken, async (req: Request, res: Response) => {
  try {
    const updatedProject: ProjectType = req.body;

    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.projectId,
      },
      updatedProject,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ Message: "Project not found!" });
    }

    await project.save();
    res.status(201).json({ Message: "Project Updated!" });
  } catch (error) {
    res.status(500).json({ Message: "Something went wrong!" });
  }
});

router.post("/:id/status", verifyToken, async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ Message: "Status is required!" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { status: status },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ Message: "Project not found!" });
    }

    res.status(200).json({ Message: "Status Updated!" });
  } catch (error) {
    res.status(500).json({ Message: "Something went wrong!" });
  }
});

export default router;
