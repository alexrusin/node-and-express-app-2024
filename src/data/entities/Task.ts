import { Exclude, Expose, instanceToPlain } from "class-transformer";
import { ITask } from "../repositories/repository";

export class Task implements ITask {
  id: string;
  user_id: string;
  project_id: string | null;
  name: string;
  description: string | null;
  due_date: Date | null;
  completed_on: Date | null;
  @Exclude({ toPlainOnly: true })
  created_at: Date;

  constructor(
    id: string,
    user_id: string,
    project_id: string | null,
    name: string,
    description: string | null,
    due_date: Date | null,
    completed_on: Date | null,
    created_at: Date,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.name = name;
    this.description = description;
    this.due_date = due_date;
    this.completed_on = completed_on;
    this.created_at = created_at;
  }

  markAsCompleted(): void {
    if (this.completed_on) {
      throw new Error("Task is already completed.");
    }
    this.completed_on = new Date();
  }

  setPriorityLevel(): "high" | "low" | null {
    if (!this.due_date) return null;

    const today = new Date();
    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(today.getDate() + 1);

    return this.due_date <= oneDayFromNow ? "high" : "low";
  }

  @Expose({ name: "priority_level" })
  get priorityLevel() {
    return this.setPriorityLevel();
  }

  asDto(): TaskDTO {
    return instanceToPlain(this) as TaskDTO;
  }
}
