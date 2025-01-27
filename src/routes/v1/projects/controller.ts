import { Request, Response } from "express";
import { repository } from "@/data/repositories";
import { getPaginationParameters } from "@/utils";

export const listProjects = async (req: Request, res: Response) => {
  const { page, perPage, limit, offset } = getPaginationParameters(req);
  const result = await repository.listProjects(
    { limit, offset },
    req.auth?.payload.sub,
  );
  res.status(200).json({
    projects: result.projects,
    page,
    per_page: perPage,
    total_pages: Math.ceil(result.totalCount / perPage),
    total_count: result.totalCount,
  });
};

export const getProject = async (req: Request, res: Response) => {
  const project = await repository.getProject(
    req.params.id,
    req.auth?.payload.sub,
  );
  res.status(200).json({ project });
};

export const listProjectTasks = async (req: Request, res: Response) => {
  const { page, perPage, limit, offset } = getPaginationParameters(req);
  const result = await repository.listTasks(
    { limit, offset, projectId: req.params.id },
    req.auth?.payload.sub,
  );
  res.status(200).json({
    tasks: result.tasks,
    page,
    per_page: perPage,
    total_pages: Math.ceil(result.totalCount / perPage),
    total_count: result.totalCount,
  });
};
