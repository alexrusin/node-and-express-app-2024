type TaskDTO = {
  id: string;
  user_id: string;
  project_id: string | null;
  name: string;
  description: string | null;
  due_date: Date | null;
  completed_on: Date | null;
  priority_level: "high" | "low" | null;
};
