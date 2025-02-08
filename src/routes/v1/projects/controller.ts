import { Request, Response } from "express";
import { repository } from "@/data/repositories";
import { encodeBase64, getPaginationParameters } from "@/utils";

export const listProjects = async (req: Request, res: Response) => {
  const { limit, nextCursor, prevCursor } = getPaginationParameters(req);
  const result = await repository.listProjects(
    {
      limit,
      nextCursor,
      prevCursor,
    },
    req.auth?.payload.sub,
  );
  res.status(200).json({
    projects: result.projects,
    nextCursor: result.nextCursor
      ? encodeBase64(result.nextCursor.toISOString())
      : null,
    prevCursor: result.prevCursor
      ? encodeBase64(result.prevCursor.toISOString())
      : null,
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
  const { limit, nextCursor, prevCursor } = getPaginationParameters(req);

  const result = await repository.listTasks(
    {
      projectId: req.params.id,
      limit,
      nextCursor,
      prevCursor,
    },
    req.auth?.payload.sub,
  );
  res.status(200).json({
    tasks: result.tasks,
    nextCursor: result.nextCursor
      ? encodeBase64(result.nextCursor.toISOString())
      : null,
    prevCursor: result.prevCursor
      ? encodeBase64(result.prevCursor.toISOString())
      : null,
  });
};
