export interface ITask {
  id: string;
  user_id: string;
  project_id: string | null;
  name: string;
  description: string | null;
  due_date: Date | null;
  completed_on: Date | null;
  created_at: Date;
}

export interface IProject {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Date;
}

interface IQueryParameters {
  limit?: number;
  offset?: number;
}

export interface ITaskQueryParameters extends IQueryParameters {
  projectId?: string;
}

export interface IProjectQueryParameters extends IQueryParameters {}

export interface ITaskQueryResult {
  tasks: ITask[];
  totalCount: number;
}

export interface IProjectQueryResult {
  projects: IProject[];
  totalCount: number;
}

export interface ITaskRepository {
  listTasks(
    query: ITaskQueryParameters,
    userId?: string,
  ): Promise<ITaskQueryResult>;
  getTask(id: string, userId?: string): Promise<ITask>;
  createTask(payload: Partial<ITask>, userId?: string): Promise<ITask>;
  updateTask(
    id: string,
    payload: Partial<ITask>,
    userId?: string,
  ): Promise<ITask>;
}

export interface IProjectRepository {
  listProjects(
    query: IProjectQueryParameters,
    userId?: string,
  ): Promise<IProjectQueryResult>;
  getProject(id: string, userId?: string): Promise<IProject>;
}
