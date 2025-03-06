import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { repository } from "@/data/repositories";
import { getPaginationParameters, parseTaskQueryParameters } from "@/utils";
import { mailer } from "@/services/mailer";
import { CreateTaskUseCase } from "@/use-cases/CreateTaskUseCase";
import { Task } from "@/data/entities/Task";

export const listTasks = async (req: Request, res: Response) => {
  const { page, perPage, limit, offset } = getPaginationParameters(req);
  const queryParameters = parseTaskQueryParameters(req);
  const result = await repository.listTasks(
    { limit, offset, ...queryParameters },
    req.auth?.payload.sub,
  );
  const tasks = result.tasks.map((item) => plainToInstance(Task, item));
  res.status(200).json({
    tasks: tasks.map((item) => item.asDto()),
    page,
    per_page: perPage,
    total_pages: Math.ceil(result.totalCount / perPage),
    total_count: result.totalCount,
  });
};

export const getTask = async (req: Request, res: Response) => {
  const taskData = await repository.getTask(
    req.params.id,
    req.auth?.payload.sub,
  );
  const task = plainToInstance(Task, taskData);
  res.status(200).json({ task: task.asDto() });
};

export const markTaskAsCompleted = async (req: Request, res: Response) => {
  const taskData = await repository.getTask(
    req.params.id,
    req.auth?.payload.sub,
  );
  const task = plainToInstance(Task, taskData);
  task.markAsCompleted();
  await repository.updateTask(req.params.id, task, req.auth?.payload.sub);
  res.status(200).json({ task: task.asDto() });
};

export const createTask = async (req: Request, res: Response) => {
  const createTaskUseCase = new CreateTaskUseCase(req, mailer);
  const task = await createTaskUseCase.execute();

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
