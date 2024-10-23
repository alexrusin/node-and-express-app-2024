import express, { Router } from "express";
import tasks from "./tasks";
import projects from "./projects";

const v1: Router = express.Router();

v1.use("/tasks", tasks);
v1.use("/projects", projects);

export default v1;
