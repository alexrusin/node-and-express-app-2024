import { Request, Response } from "express";
import { repository } from "@/data/repositories";
import { encodeBase64, getPaginationParameters } from "@/utils";

export const listTasks = async (req: Request, res: Response) => {
  const { limit, nextCursor, prevCursor } = getPaginationParameters(req);

  const result = await repository.listTasks(
    {
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

export const getTask = async (req: Request, res: Response) => {
  const task = await repository.getTask(req.params.id, req.auth?.payload.sub);
  res.status(200).json({ task });
};

export const createTask = async (req: Request, res: Response) => {
  const task = await repository.createTask(req.body, req.auth?.payload.sub);

  res.status(201).json({ task });
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await repository.updateTask(
    req.params.id,
    req.body,
    req.auth?.payload.sub,
  );
  res.status(200).json({ task });
};
