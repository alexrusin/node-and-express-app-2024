import { Request, Response } from "express";
import { mailer } from "@/services/mailer";
import { CreateTaskUseCase } from "@/use-cases/CreateTaskUseCase";
import { createTask } from "@/routes/v1/tasks/controller";

jest.mock("@/use-cases/CreateTaskUseCase");
jest.mock("@/services/mailer", () => ({ mailer: {} }));

describe("createTask", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let executeMock: jest.Mock;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: { name: "New Task" },
      auth: { payload: { sub: "user123" } },
    } as Request;
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock };

    executeMock = jest.fn().mockResolvedValue({ id: 1, name: "New Task" });

    (CreateTaskUseCase as jest.Mock).mockImplementation(() => ({
      execute: executeMock,
    }));
  });

  test("should create a task and return 200 with task data", async () => {
    await createTask(req as Request, res as Response);

    expect(CreateTaskUseCase).toHaveBeenCalledWith(req, mailer);
    expect(executeMock).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      task: { id: 1, name: "New Task" },
    });
  });
});
