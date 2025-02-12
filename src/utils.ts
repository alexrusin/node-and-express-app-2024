import { Request } from "express";
import config from "./config";
import { ITaskQueryParameters } from "@/data/repositories/repository";

export function add(a: number, b: number) {
  return a + b;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  if (typeof error === "string") {
    return error;
  }
  return "An error occurred";
}

export function getPaginationParameters(req: Request) {
  const page = parseInt(req.query.page as string, 10);
  const perPage = parseInt(req.query.perPage as string, 10);

  const validPage = isNaN(page) || page < 1 ? 1 : page;
  const validPerPage =
    isNaN(perPage) || perPage < 1 ? config.defaultPageSize : perPage;

  const limit = validPerPage;
  const offset = (validPage - 1) * validPerPage;
  return {
    page: validPage,
    perPage: validPerPage,
    limit,
    offset,
  };
}

export function parseTaskQueryParameters(req: Request): ITaskQueryParameters {
  const {
    search,
    completed: completedParam,
    orderBy: orderByParam,
  } = req.query;

  let completed: boolean | undefined;
  if (completedParam === "1" || completedParam === "true") {
    completed = true;
  } else if (completedParam === "0" || completedParam === "false") {
    completed = false;
  } else {
    completed = undefined;
  }

  let orderBy: ITaskQueryParameters["orderBy"] = { created_at: "asc" };

  if (typeof orderByParam === "string") {
    const [field, direction] = orderByParam.split("-");
    if (
      ["created_at", "due_date"].includes(field) &&
      ["asc", "desc"].includes(direction)
    ) {
      orderBy = { [field]: direction as "asc" | "desc" };
    }
  }

  return {
    search: search as string | undefined,
    completed,
    orderBy,
  };
}
