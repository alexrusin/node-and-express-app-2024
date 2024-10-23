import express, { Router } from "express";
import { listTasks, getTask } from "./controller";

const tasks: Router = express.Router();

tasks.get("/", listTasks);
tasks.get("/:id", getTask);

export default tasks;
