import { Request, Response } from "express";

export const listTasks = (req: Request, res: Response) => {
  res.status(200).json([]);
};

export const getTask = (req: Request, res: Response) => {
  res.status(200).json({ id: 1, name: "Task 1" });
};
