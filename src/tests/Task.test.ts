import { Task } from "@/data/entities/Task";

describe("Task entity", () => {
  const mockDate = new Date("2025-01-01T12:00:00Z");
  let task: Task;

  beforeEach(() => {
    task = new Task(
      "1",
      "user123",
      "project456",
      "Test Task",
      "Test Description",
      mockDate,
      null,
      new Date(),
    );
  });

  test("should initialize with correct values", () => {
    expect(task.id).toBe("1");
    expect(task.user_id).toBe("user123");
    expect(task.project_id).toBe("project456");
    expect(task.name).toBe("Test Task");
    expect(task.description).toBe("Test Description");
    expect(task.due_date).toEqual(mockDate);
    expect(task.completed_on).toBeNull();
  });

  test("should mark task as completed", () => {
    expect(task.completed_on).toBeNull();
    task.markAsCompleted();
    expect(task.completed_on).toBeInstanceOf(Date);
  });

  test("should throw error if task is already completed", () => {
    task.markAsCompleted();
    expect(() => task.markAsCompleted()).toThrow();
  });

  test("should return correct priority level", () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    task.due_date = tomorrow;
    expect(task.setPriorityLevel()).toBe("high");

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    task.due_date = nextWeek;
    expect(task.setPriorityLevel()).toBe("low");

    task.due_date = null;
    expect(task.setPriorityLevel()).toBeNull();
  });

  test("should exclude 'created_at' and include 'priority_level' when transforming to DTO", () => {
    const taskDto = task.asDto();
    expect(taskDto).not.toHaveProperty("created_at");
    expect(taskDto).toHaveProperty("priority_level");
  });
});
