import supertest from "supertest";
import { createServer } from "../server";
import { CreateTaskUseCase } from "@/use-cases/CreateTaskUseCase";

jest.mock("@/use-cases/CreateTaskUseCase");

jest.mock("@/middleware/authenticate-user", () => ({
  __esModule: true,
  default: (req: any, res: any, next: any) => next(),
}));

describe("Health endpoint tests", () => {
  test("Health endpoint returns ok 200", async () => {
    await supertest(createServer())
      .get("/health")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });
});

describe("Create task integration tests", () => {
  let executeMock: jest.Mock = jest.fn().mockResolvedValue(null);

  beforeEach(() => {
    (CreateTaskUseCase as jest.Mock).mockImplementation(() => ({
      execute: executeMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("it creates a new task", async () => {
    executeMock = jest.fn().mockResolvedValue({ id: 1, name: "New Task" });
    const response = await supertest(createServer())
      .post("/v1/tasks")
      .send({ name: "New Task" })
      .expect(201);

    expect(response.body).toHaveProperty("task");
    expect(response.body.task.name).toBe("New Task");
  });

  test("it returns an error when trying to create a task", async () => {
    executeMock = jest.fn().mockRejectedValue(new Error("Error creating task"));
    const response = await supertest(createServer())
      .post("/v1/tasks")
      .send({ name: "New Task" })
      .expect(500);

    expect(response.body).toHaveProperty("error");
  });

  test("it validates a task's payload by requiring a task's name", async () => {
    const response = await supertest(createServer())
      .post("/v1/tasks")
      .send({ description: "Task description" })
      .expect(422);

    expect(response.body.error).toHaveProperty("message");
    expect(response.body.error.code).toBe("ERR_VALID");
  });
});
