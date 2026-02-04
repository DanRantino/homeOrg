export type Task = {
  id: string;
  title: string;
  createdBy: string;
  assignedTo: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
};
