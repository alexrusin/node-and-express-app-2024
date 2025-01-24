import EntityNotFoundError from "@/errors/EntityNotFoundError";
import BaseRepository, { Constructor } from "./BaseRepository";
import { Prisma } from "@prisma/client";
import {
  IProject,
  IProjectQueryParameters,
  IProjectRepository,
} from "./repository";

type PrismaProject = Prisma.ProjectGetPayload<{}>;

export function AddProjectRepository<TBase extends Constructor<BaseRepository>>(
  Base: TBase,
) {
  return class ProjectRepositoryMixin
    extends Base
    implements IProjectRepository
  {
    mapProject(project: PrismaProject): IProject {
      return {
        id: project.id,
        user_id: project.user_id,
        name: project.name,
        description: project.description,
        created_at: project.created_at,
      };
    }
    async listProjects(
      query: IProjectQueryParameters,
      userId?: string,
    ): Promise<IProject[]> {
      const projects = await this.client.project.findMany({
        where: {
          user_id: userId,
        },
        take: query.limit || this.defaultLimit,
        skip: query.offset || this.defaultOffset,
      });
      return projects.map((item) => this.mapProject(item));
    }

    async getProject(id: string, userId?: string): Promise<IProject> {
      const project = await this.client.project.findUnique({
        where: {
          id,
          user_id: userId,
        },
      });
      if (!project) {
        throw new EntityNotFoundError({
          message: "Project not found",
          statusCode: 404,
          code: "ERR_NF",
        });
      }
      return this.mapProject(project);
    }
  };
}
