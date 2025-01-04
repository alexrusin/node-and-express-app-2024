import express, { Router } from "express";
import { listTasks, getTask, createTask, updateTask } from "./controller";
import authenticateUser from "../../../middleware/authenticate-user";
import validateRequest from "../../../middleware/validate-request";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../../../data/request-schemas";

const tasks: Router = express.Router();

tasks.use(authenticateUser);
tasks.get("/", listTasks);
tasks.get("/:id", getTask);
tasks.post("/", validateRequest(createTaskSchema), createTask);
tasks.put("/:id", validateRequest(updateTaskSchema), updateTask);

export default tasks;
