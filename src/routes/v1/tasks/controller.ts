import { Request, Response, NextFunction } from "express";
import EntityNotFoundError from "../../../errors/EntityNotFoundError";

export const listTasks = (req: Request, res: Response) => {
  res.status(200).json([]);
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new EntityNotFoundError({
    message: "Entity not found",
    statusCode: 404,
    code: "ERR_NF",
  });
  res.status(200).json({ id: 1, name: "Task 1" });
};
