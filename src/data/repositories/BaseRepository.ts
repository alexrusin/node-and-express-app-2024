import { Prisma, PrismaClient } from "@prisma/client";
import { IQueryParameters } from "./repository";

export default class BaseRepository {
  protected defaultLimit = 10;
  protected defaultOffset = 0;
  protected client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  getClient() {
    return this.client;
  }

  protected getPaginationQueryParameters(query: IQueryParameters) {
    const limit = query.limit || this.defaultLimit;
    let sortOrder: Prisma.SortOrder = "asc";
    let operator: string = "gt";
    let cursor = query?.nextCursor;

    if (query.prevCursor) {
      sortOrder = "desc";
      operator = "lt";
      cursor = query.prevCursor;
    }

    return { limit, sortOrder, operator, cursor };
  }

  protected getPaginationCursors(
    query: IQueryParameters,
    entities: Prisma.TaskGetPayload<{}>[] | Prisma.ProjectGetPayload<{}>[],
    limit: number,
    sortOrder: string,
  ) {
    const hasMoreResults = entities.length > limit;

    if (hasMoreResults) entities.pop();

    let nextCursorTimestamp: Date | null = null;
    let prevCursorTimestamp: Date | null = null;

    if (sortOrder === "asc" && hasMoreResults) {
      nextCursorTimestamp = entities[entities.length - 1].created_at;
    }

    if (sortOrder === "asc" && query.nextCursor) {
      prevCursorTimestamp = entities[0].created_at;
    }

    if (sortOrder === "desc" && hasMoreResults) {
      prevCursorTimestamp = entities[entities.length - 1].created_at;
    }

    if (sortOrder === "desc" && query.prevCursor) {
      nextCursorTimestamp = entities[0].created_at;
    }

    return { nextCursorTimestamp, prevCursorTimestamp };
  }
}

export type Constructor<T = {}> = new (...args: any[]) => T;
