import express, { Router } from "express";
import { listTasks, getTask } from "./controller";
import authenticateUser from "../../../middleware/authenticate-user";

const tasks: Router = express.Router();

tasks.use(authenticateUser);
tasks.get("/", listTasks);
tasks.get("/:id", getTask);

export default tasks;
