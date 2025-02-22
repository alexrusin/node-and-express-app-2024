import { Request } from "express";
import { IMailer } from "@/services/mailer/interface";
import { repository } from "@/data/repositories";
import config from "@/config";
import logger from "@/logger";

export class CreateTaskUseCase {
  constructor(
    protected req: Request,
    protected mailer: IMailer,
  ) {}

  async execute() {
    const task = await repository.createTask(
      this.req.body,
      this.req.auth?.payload.sub,
    );

    this.mailer
      .send({
        to: config.adminEmail,
        subject: "New Task",
        text: `Task '${task.name}' was created and is ready for your review.`,
      })
      .catch((error) => logger.error(error));

    return task;
  }
}
