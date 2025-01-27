import EntityNotFoundError from "@/errors/EntityNotFoundError";
import BaseRepository, { Constructor } from "./BaseRepository";
import { Prisma } from "@prisma/client";
import {
  ITask,
  ITaskQueryParameters,
  ITaskQueryResult,
  ITaskRepository,
} from "./repository";

type PrismaTask = Prisma.TaskGetPayload<{}>;

export function AddTaskRepository<TBase extends Constructor<BaseRepository>>(
  Base: TBase,
) {
  return class TaskRepositoryMixin extends Base implements ITaskRepository {
    mapTask(task: PrismaTask): ITask {
      return {
        id: task.id,
        user_id: task.user_id,
        project_id: task.project_id,
        name: task.name,
        description: task.description,
        due_date: task.due_date,
        completed_on: task.completed_on,
        created_at: task.created_at,
      };
    }

    async listTasks(
      query: ITaskQueryParameters,
      userId?: string,
    ): Promise<ITaskQueryResult> {
      const where = {
        user_id: userId,
        project_id: query.projectId,
      };
      const [tasks, count] = await this.client.$transaction([
        this.client.task.findMany({
          where,
          take: query.limit || this.defaultLimit,
          skip: query.offset || this.defaultOffset,
        }),
        this.client.task.count({ where }),
      ]);
      return {
        tasks: tasks.map((item) => this.mapTask(item)),
        totalCount: count,
      };
    }

    async getTask(id: string, userId?: string): Promise<ITask> {
      const task = await this.client.task.findUnique({
        where: {
          id,
          user_id: userId,
        },
      });
      if (!task) {
        throw new EntityNotFoundError({
          message: "Task not found",
          statusCode: 404,
          code: "ERR_NF",
        });
      }
      return this.mapTask(task);
    }

    async createTask(payload: any, userId?: string) {
      const task = await this.client.task.create({
        data: {
          user_id: userId as string,
          ...payload,
        },
      });
      return this.mapTask(task);
    }

    async updateTask(id: string, payload: Partial<ITask>, userId?: string) {
      const task = await this.client.task.update({
        where: {
          id,
          user_id: userId,
        },
        data: {
          ...payload,
        },
      });
      return this.mapTask(task);
    }
  };
}
