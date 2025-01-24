import { Request, Response } from "express";
import { repository } from "@/data/repositories";

export const listProjects = async (req: Request, res: Response) => {
  const projects = await repository.listProjects({}, req.auth?.payload.sub);
  res.status(200).json({ projects });
};

export const getProject = async (req: Request, res: Response) => {
  const project = await repository.getProject(
    req.params.id,
    req.auth?.payload.sub,
  );
  res.status(200).json({ project });
};

export const listProjectTasks = async (req: Request, res: Response) => {
  const tasks = await repository.listTasks(
    {
      projectId: req.params.id,
    },
    req.auth?.payload.sub,
  );
  res.status(200).json({ tasks });
};
