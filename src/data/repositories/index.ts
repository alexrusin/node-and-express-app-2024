import BaseRepository from "./BaseRepository";
import { AddTaskRepository } from "./AddTaskRepository";
import { AddProjectRepository } from "./AddProjectRepository";

export const repository = new (AddProjectRepository(
  AddTaskRepository(BaseRepository),
))();
