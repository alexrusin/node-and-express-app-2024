import { Request, Response } from "express";

export const listProjects = (req: Request, res: Response) => {
  res.status(200).json([]);
};

export const getProject = (req: Request, res: Response) => {
  res.status(200).json({ id: 1, name: "Project 1" });
};

export const listProjectTasks = (req: Request, res: Response) => {
  res.status(200).json([]);
};
